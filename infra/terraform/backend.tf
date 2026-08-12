# State lives in the org's shared backend, per neuralliquid-org's Terraform
# backend standard (ADR 0002). The key is namespaced per product so this repo
# never shares state with the control plane.
terraform {
  backend "azurerm" {
    subscription_id      = "bb4e3882-2079-4bab-8974-611bc0b8bb58"
    resource_group_name  = "nl-org-tfstate-rg"
    storage_account_name = "nlorgtfstate"
    container_name       = "tfstate"
    key                  = "veritasvault-web/terraform.tfstate"
    use_azuread_auth     = true
  }
}
