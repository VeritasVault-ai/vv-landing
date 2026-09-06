# State lives in the org's shared backend, per neuralliquid-org's Terraform
# backend standard (ADR 0002). The key is namespaced per product so this repo
# never shares state with the control plane.
terraform {
  backend "azurerm" {
    subscription_id      = "5a95ddee-dd63-441a-8306-c8b0803dcdd4"
    resource_group_name  = "nl-org-tfstate-rg"
    storage_account_name = "nlorgtfstatesa"
    container_name       = "tfstate"
    key                  = "veritasvault-web/terraform.tfstate"
    use_azuread_auth     = true
  }
}
