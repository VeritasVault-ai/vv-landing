# veritasvault-web runtime: Azure Container Apps.
#
# Why Container Apps and not Static Web Apps: this app ships middleware.ts and 45
# API routes, both of which need a long-running Node server. SWA cannot run Next
# middleware properly. Full reasoning in docs/azure-runtime.md.
#
# Ownership boundary (neuralliquid-org ADR 0001): this product repo owns its
# runtime resources. Public DNS, hostname binding, and certificate activation are
# separate gated work. This module publishes the values that work needs to consume.

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

# ---- network ---------------------------------------------------------------

resource "azurerm_virtual_network" "main" {
  name                = "${var.name_prefix}-vnet"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  address_space       = var.virtual_network_address_space
  tags                = var.tags
}

resource "azurerm_subnet" "container_apps" {
  name                 = "container-apps-infrastructure"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = var.infrastructure_subnet_address_prefixes
  service_endpoints    = ["Microsoft.KeyVault"]

  delegation {
    name = "Microsoft.App.environments"

    service_delegation {
      name    = "Microsoft.App/environments"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
}

# ---- observability ----------------------------------------------------------

resource "azurerm_log_analytics_workspace" "main" {
  name                = "${var.name_prefix}-law"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = var.tags
}

resource "azurerm_application_insights" "main" {
  name                = "${var.name_prefix}-appi"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  workspace_id        = azurerm_log_analytics_workspace.main.id
  application_type    = "web"
  tags                = var.tags
}

# ---- registry ---------------------------------------------------------------

resource "azurerm_container_registry" "main" {
  name                = var.container_registry_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  # Keep admin_enabled false: the Container App pulls with its managed identity
  # and CI pushes with OIDC, so there is no admin credential to leak.
  admin_enabled = false
  tags          = var.tags
}

# Lets GitHub Actions push images without a registry password.
resource "azurerm_role_assignment" "ci_acr_push" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPush"
  principal_id         = var.github_oidc_principal_object_id
  principal_type       = "ServicePrincipal"
}

# Lets the Container App pull them.
resource "azurerm_role_assignment" "app_acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.app.principal_id
}

resource "azurerm_user_assigned_identity" "app" {
  name                = "${var.name_prefix}-id"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tags                = var.tags
}

resource "azurerm_user_assigned_identity" "sync" {
  name                = "${var.name_prefix}-sync-id"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tags                = var.tags
}

resource "azurerm_role_assignment" "sync_acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.sync.principal_id
}

# ---- secrets ----------------------------------------------------------------

resource "azurerm_key_vault" "main" {
  name                = "${var.name_prefix}-kv"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"

  rbac_authorization_enabled = true
  purge_protection_enabled   = true
  # The public endpoint remains enabled for the service-endpoint path, but the
  # firewall denies traffic that does not originate from the delegated subnet.
  public_network_access_enabled = true

  network_acls {
    default_action             = "Deny"
    bypass                     = "AzureServices"
    virtual_network_subnet_ids = [azurerm_subnet.container_apps.id]
  }

  tags = var.tags
}

data "azurerm_client_config" "current" {}

locals {
  runtime_secret_urls = {
    for name in var.runtime_secret_names :
    name => "${azurerm_key_vault.main.vault_uri}secrets/${name}"
  }
  active_runtime_secret_urls = var.runtime_secret_references_enabled ? local.runtime_secret_urls : {}
}

resource "azurerm_role_assignment" "app_kv_read" {
  scope                = azurerm_key_vault.main.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_user_assigned_identity.app.principal_id
}

resource "azurerm_role_assignment" "sync_kv_read" {
  count = var.runtime_secret_references_enabled ? 1 : 0

  scope                = "${azurerm_key_vault.main.id}/secrets/cron-secret"
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_user_assigned_identity.sync.principal_id
}

# ---- container app ----------------------------------------------------------

resource "azurerm_container_app_environment" "main" {
  name                       = "${var.name_prefix}-cae"
  resource_group_name        = azurerm_resource_group.main.name
  location                   = azurerm_resource_group.main.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  infrastructure_subnet_id   = azurerm_subnet.container_apps.id
  tags                       = var.tags

  workload_profile {
    name                  = "Consumption"
    workload_profile_type = "Consumption"
    minimum_count         = 0
    maximum_count         = 0
  }
}

resource "azurerm_container_app" "web" {
  count = var.application_enabled ? 1 : 0

  name                         = "${var.name_prefix}-web"
  resource_group_name          = azurerm_resource_group.main.name
  container_app_environment_id = azurerm_container_app_environment.main.id
  revision_mode                = "Single"
  tags                         = var.tags

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.app.id]
  }

  registry {
    server   = azurerm_container_registry.main.login_server
    identity = azurerm_user_assigned_identity.app.id
  }

  # Each Key Vault secret surfaces as a Container App secret resolved by the
  # managed identity at revision start. Values are never read by Terraform.
  dynamic "secret" {
    for_each = local.active_runtime_secret_urls

    content {
      name                = secret.key
      key_vault_secret_id = secret.value
      identity            = azurerm_user_assigned_identity.app.id
    }
  }

  ingress {
    external_enabled = true
    target_port      = 3000
    transport        = "auto"

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    min_replicas = var.min_replicas
    max_replicas = var.max_replicas

    container {
      name   = "web"
      image  = "${azurerm_container_registry.main.login_server}/veritasvault-web:${var.image_tag}"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name  = "PORT"
        value = "3000"
      }

      env {
        name  = "NEXTAUTH_URL"
        value = var.public_app_url
      }

      env {
        name  = "APPLICATIONINSIGHTS_CONNECTION_STRING"
        value = azurerm_application_insights.main.connection_string
      }

      # Maps each secret to the env var name the app actually reads. The app uses
      # SCREAMING_SNAKE_CASE; Key Vault secret names must be kebab-case, hence the
      # translation.
      dynamic "env" {
        for_each = local.active_runtime_secret_urls

        content {
          name        = upper(replace(env.key, "-", "_"))
          secret_name = env.key
        }
      }

      liveness_probe {
        transport = "HTTP"
        port      = 3000
        path      = "/api/health"
      }

      readiness_probe {
        transport = "HTTP"
        port      = 3000
        path      = "/api/health"
      }
    }
  }

  lifecycle {
    # CI updates the running image; Terraform must not revert it on the next plan.
    ignore_changes = [template[0].container[0].image]
  }

  depends_on = [azurerm_role_assignment.app_kv_read]
}

# ---- scheduled sync ---------------------------------------------------------
# Calls the app-owned synchronization route. It is manual-only by default; the
# approved hourly schedule is enabled only by an explicit production input.

resource "azurerm_container_app_job" "sync" {
  count = var.application_enabled && var.runtime_secret_references_enabled ? 1 : 0

  name                         = "${var.name_prefix}-sync"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  container_app_environment_id = azurerm_container_app_environment.main.id
  replica_timeout_in_seconds   = 600
  replica_retry_limit          = 2
  tags                         = var.tags

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.sync.id]
  }

  registry {
    server   = azurerm_container_registry.main.login_server
    identity = azurerm_user_assigned_identity.sync.id
  }

  secret {
    name                = "cron-secret"
    key_vault_secret_id = local.runtime_secret_urls["cron-secret"]
    identity            = azurerm_user_assigned_identity.sync.id
  }

  dynamic "schedule_trigger_config" {
    for_each = var.sync_job_enabled ? [1] : []

    content {
      cron_expression          = var.sync_schedule_cron
      parallelism              = 1
      replica_completion_count = 1
    }
  }

  dynamic "manual_trigger_config" {
    for_each = var.sync_job_enabled ? [] : [1]

    content {
      parallelism              = 1
      replica_completion_count = 1
    }
  }

  template {
    container {
      name = "sync"
      image = format(
        "%s/veritasvault-web@%s",
        azurerm_container_registry.main.login_server,
        coalesce(var.sync_image_digest, "sha256:0000000000000000000000000000000000000000000000000000000000000000"),
      )
      cpu    = 0.25
      memory = "0.5Gi"

      command = ["node"]
      args    = ["scripts/run-scheduled-sync.mjs"]

      env {
        name  = "SYNC_BASE_URL"
        value = "https://${azurerm_container_app.web[0].ingress[0].fqdn}"
      }

      env {
        name        = "CRON_SECRET"
        secret_name = "cron-secret"
      }
    }
  }

  depends_on = [
    azurerm_role_assignment.sync_acr_pull,
    azurerm_role_assignment.sync_kv_read[0],
  ]

  lifecycle {
    precondition {
      condition     = var.sync_image_digest != null
      error_message = "sync_image_digest is required when runtime_secret_references_enabled is true."
    }
  }
}
