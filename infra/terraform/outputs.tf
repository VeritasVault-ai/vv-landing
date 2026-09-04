# Per neuralliquid-org ADR 0001, product repos publish their expected DNS targets
# for the control plane's DNS module to consume rather than writing zone records
# themselves.

output "container_app_fqdn" {
  description = "Container App ingress FQDN. This is the CNAME target for www.veritasvault.net at cutover."
  value       = try(azurerm_container_app.web[0].ingress[0].fqdn, null)
}

output "custom_domain_verification_id" {
  description = "Value for the asuid.<host> TXT record that proves domain ownership before hostname binding."
  value       = try(azurerm_container_app.web[0].custom_domain_verification_id, null)
}

output "container_registry_login_server" {
  description = "ACR login server for CI image pushes."
  value       = azurerm_container_registry.main.login_server
}

output "key_vault_name" {
  description = "Key Vault holding runtime secrets. Values are set out of band, never by Terraform."
  value       = azurerm_key_vault.main.name
}

output "app_insights_connection_string" {
  description = "Application Insights connection string. Also needed as a Docker build arg for the client-side beacon."
  value       = azurerm_application_insights.main.connection_string
  sensitive   = true
}
