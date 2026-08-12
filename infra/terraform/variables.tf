variable "subscription_id" {
  type        = string
  description = "Azure subscription hosting NeuralLiquid production workloads."
  default     = "bb4e3882-2079-4bab-8974-611bc0b8bb58"
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

variable "custom_domains" {
  type        = list(string)
  description = <<-EOT
    Hostnames to bind once DNS points at this Container App. Left EMPTY on the
    first apply on purpose: binding a hostname requires the DNS record to already
    resolve here, and during migration these still point at Vercel. Populate only
    at cutover. See docs/azure-migration.md.
  EOT
  default     = []
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
}

variable "image_tag" {
  type        = string
  description = "Container image tag to run. CI sets this to the commit SHA."
  default     = "latest"
}

variable "github_oidc_principal_object_id" {
  type        = string
  description = "Object ID of the existing nl-org-github-actions service principal, granted AcrPush."
  default     = "369def47-8d91-4710-8c37-e521bc4a360a"
}

variable "runtime_secret_names" {
  type        = list(string)
  description = <<-EOT
    Server-side secrets the app reads at runtime. Terraform creates each as an
    EMPTY Key Vault secret and wires the Container App to reference it; the VALUES
    are set out of band (never in state, never in git). Recovered from Vercel with
    `vercel env pull` — see docs/azure-migration.md for the full 36-var inventory.

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
