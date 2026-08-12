# veritasvault-web runtime: Azure Container Apps.
#
# Why Container Apps and not Static Web Apps: this app ships middleware.ts and 45
# API routes, both of which need a long-running Node server. SWA cannot run Next
# middleware properly. Full reasoning in docs/azure-migration.md.
#
# Ownership boundary (neuralliquid-org ADR 0001): this product repo owns its
# runtime resources, hostname bindings and certificates. The veritasvault.net DNS
# RECORDS are owned by neuralliquid-org/infra/terraform/dns. This module publishes
# the expected target as an output for that module to consume.

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
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

# ---- secrets ----------------------------------------------------------------

resource "azurerm_key_vault" "main" {
  name                = "${var.name_prefix}-kv"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"

  rbac_authorization_enabled = true
  purge_protection_enabled   = true
  # Not 'Enabled'. The absorbed vv-iac Bicep left Key Vault publicly reachable;
  # this estate does not repeat that. CI reaches the vault through the firewall
  # bypass below rather than by opening it to the internet.
  public_network_access_enabled = false

  network_acls {
    default_action = "Deny"
    bypass         = "AzureServices"
  }

  tags = var.tags
}

data "azurerm_client_config" "current" {}

# Empty shells only. Values are set out of band so no secret ever enters state
# or git. `ignore_changes = [value]` is what makes that safe across applies.
resource "azurerm_key_vault_secret" "runtime" {
  for_each = toset(var.runtime_secret_names)

  name         = each.key
  value        = "PLACEHOLDER-SET-OUT-OF-BAND"
  key_vault_id = azurerm_key_vault.main.id

  lifecycle {
    ignore_changes = [value]
  }
}

resource "azurerm_role_assignment" "app_kv_read" {
  scope                = azurerm_key_vault.main.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_user_assigned_identity.app.principal_id
}

# ---- container app ----------------------------------------------------------

resource "azurerm_container_app_environment" "main" {
  name                       = "${var.name_prefix}-cae"
  resource_group_name        = azurerm_resource_group.main.name
  location                   = azurerm_resource_group.main.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  tags                       = var.tags
}

resource "azurerm_container_app" "web" {
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
    for_each = azurerm_key_vault_secret.runtime

    content {
      name                = secret.key
      key_vault_secret_id = secret.value.versionless_id
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
        name  = "APPLICATIONINSIGHTS_CONNECTION_STRING"
        value = azurerm_application_insights.main.connection_string
      }

      # Maps each secret to the env var name the app actually reads. The app uses
      # SCREAMING_SNAKE_CASE; Key Vault secret names must be kebab-case, hence the
      # translation.
      dynamic "env" {
        for_each = azurerm_key_vault_secret.runtime

        content {
          name        = upper(replace(env.key, "-", "_"))
          secret_name = env.key
        }
      }

      liveness_probe {
        transport = "HTTP"
        port      = 3000
        path      = "/"
      }

      readiness_probe {
        transport = "HTTP"
        port      = 3000
        path      = "/"
      }
    }
  }

  lifecycle {
    # CI updates the running image; Terraform must not revert it on the next plan.
    ignore_changes = [template[0].container[0].image]
  }
}

# ---- custom hostnames -------------------------------------------------------
# Empty until cutover. Binding requires DNS to already resolve here, and during
# migration veritasvault.net still points at Vercel.

resource "azurerm_container_app_custom_domain" "main" {
  for_each = toset(var.custom_domains)

  name                     = each.key
  container_app_id         = azurerm_container_app.web.id
  certificate_binding_type = "SniEnabled"

  lifecycle {
    # The managed certificate is issued out of band after the binding exists;
    # letting Terraform manage its id would force replacement on every renewal.
    ignore_changes = [certificate_binding_type, container_app_environment_certificate_id]
  }
}

# ---- scheduled sync ---------------------------------------------------------
# Replaces Vercel Cron, which drove app/api/cron/sync. The schedule below is a
# PLACEHOLDER — the real one exists only in the Vercel dashboard and must be read
# off it before cutover, or this silently runs at the wrong cadence.

resource "azurerm_container_app_job" "sync" {
  name                         = "${var.name_prefix}-sync"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  container_app_environment_id = azurerm_container_app_environment.main.id
  replica_timeout_in_seconds   = 600
  tags                         = var.tags

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.app.id]
  }

  secret {
    name                = "cron-secret"
    key_vault_secret_id = azurerm_key_vault_secret.runtime["cron-secret"].versionless_id
    identity            = azurerm_user_assigned_identity.app.id
  }

  schedule_trigger_config {
    cron_expression = "0 * * * *" # PLACEHOLDER - confirm against Vercel Cron
  }

  template {
    container {
      name   = "sync"
      image  = "mcr.microsoft.com/azure-cli:latest"
      cpu    = 0.25
      memory = "0.5Gi"

      command = ["/bin/sh", "-c"]
      args = [
        "curl -fsS -X GET \"https://${azurerm_container_app.web.ingress[0].fqdn}/api/cron/sync?token=$CRON_SECRET\""
      ]

      env {
        name        = "CRON_SECRET"
        secret_name = "cron-secret"
      }
    }
  }
}
