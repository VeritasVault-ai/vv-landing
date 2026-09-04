variable "subscription_id" {
  type        = string
  description = "Azure subscription hosting NeuralLiquid production workloads."
  default     = "5a95ddee-dd63-441a-8306-c8b0803dcdd4"
}

variable "location" {
  type        = string
  description = "Azure region. Matches the existing NeuralLiquid production estate."
  default     = "West Europe"
}

variable "resource_group_name" {
  type        = string
  description = "Resource group for veritasvault-web runtime resources."
  default     = "nl-prod-veritasvault-rg"
}

variable "name_prefix" {
  type        = string
  description = "Resource name prefix following the nl-<env>-<product> convention."
  default     = "nl-prod-veritasvault"
}

variable "container_registry_name" {
  type        = string
  description = "ACR name. Must be globally unique and alphanumeric only."
  default     = "nlprodveritasvaultacr"

  validation {
    condition     = can(regex("^[a-z0-9]{5,50}$", var.container_registry_name))
    error_message = "container_registry_name must be 5-50 lowercase alphanumeric characters."
  }
}

variable "min_replicas" {
  type        = number
  description = "Minimum replicas. 1 avoids cold starts on a public marketing site."
  default     = 1

  validation {
    condition     = var.min_replicas >= 1
    error_message = "min_replicas must be at least 1 so the public site never cold-starts."
  }
}

variable "max_replicas" {
  type        = number
  description = "Maximum replicas under HTTP scale-out."
  default     = 3

  validation {
    condition     = var.max_replicas >= var.min_replicas
    error_message = "max_replicas must be greater than or equal to min_replicas."
  }
}

variable "virtual_network_address_space" {
  type        = list(string)
  description = "Address space for the Container Apps virtual network."
  default     = ["10.42.0.0/16"]
}

variable "infrastructure_subnet_address_prefixes" {
  type        = list(string)
  description = "Dedicated Container Apps infrastructure subnet prefixes."
  default     = ["10.42.0.0/23"]
}

variable "image_tag" {
  type        = string
  description = "Container image tag to run. CI sets this to the commit SHA."
  default     = "latest"
}

variable "application_enabled" {
  type        = bool
  description = "Creates the web Container App only after its image has been published and reviewed."
  default     = false
}

variable "public_app_url" {
  type        = string
  description = "Canonical public HTTPS URL used by NextAuth when constructing OAuth callbacks."
  default     = "https://www.veritasvault.net"

  validation {
    condition     = can(regex("^https://(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?::(?:[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$", var.public_app_url))
    error_message = "public_app_url must be an HTTPS origin without a path."
  }
}

variable "sync_image_digest" {
  type        = string
  description = "Immutable sha256 digest of the application image used by the scheduled sync job."
  default     = null
  nullable    = true

  validation {
    condition     = var.sync_image_digest == null || can(regex("^sha256:[0-9a-f]{64}$", var.sync_image_digest))
    error_message = "sync_image_digest must be an immutable sha256 digest."
  }
}

variable "sync_job_enabled" {
  type        = bool
  description = "Enables the hourly schedule. False keeps the job manual-only until the production gate is approved."
  default     = false
}

variable "sync_schedule_cron" {
  type        = string
  description = "Five-field UTC cron expression used only when sync_job_enabled is true."
  default     = "0 * * * *"

  validation {
    condition     = length(split(" ", trimspace(var.sync_schedule_cron))) == 5
    error_message = "sync_schedule_cron must contain exactly five space-separated fields."
  }
}

variable "github_oidc_principal_object_id" {
  type        = string
  description = "Object ID of the existing nl-org-github-actions service principal, granted AcrPush."
  default     = "369def47-8d91-4710-8c37-e521bc4a360a"
}

variable "runtime_secret_names" {
  type        = list(string)
  description = <<-EOT
    Names of pre-provisioned server-side Key Vault secrets referenced by the app.
    Terraform never creates or reads their values. Secret provisioning and
    rotation are separate approved operations; see docs/azure-runtime.md.

    NEXT_PUBLIC_* vars are deliberately absent: Next inlines those at build time,
    so they are Docker build args, not runtime secrets.
  EOT
  default = [
    "supabase-url",
    "supabase-service-role-key",
    "jwt-secret",
    "token-secret",
    "cron-secret",
    "github-id",
    "github-secret",
    "github-client-id",
    "google-client-id",
    "google-client-secret",
    "openai-api-key",
    "groq-api-key",
    "deepinfra-api-key",
    "sendgrid-api-key",
    "coingecko-api-key",
    "fal-key",
    "goldsky-api-url",
    "neuralliquid-goldsky-api-key",
    "analytics-api-endpoint",
    "analytics-api-key",
    "email-from",
  ]
}

variable "runtime_secret_references_enabled" {
  type        = bool
  description = "Adds runtime Key Vault references and the manual sync job only after all named secrets are provisioned."
  default     = false
}

variable "tags" {
  type        = map(string)
  description = "Tags applied to every resource, per the org tagging standard."
  default = {
    environment = "prod"
    project     = "veritasvault"
    managed-by  = "terraform"
    repo        = "neuralliquid/veritasvault-web"
  }
}
