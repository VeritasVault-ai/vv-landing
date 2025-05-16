"use client"
import { Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import styles from "../configuration-panel.module.css"

export const IntegrationsConfigSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Third-Party Integrations</CardTitle>
        <CardDescription>Configure external service integrations</CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.formGroup}>
          <Label htmlFor="coingecko-api-key">CoinGecko API Key</Label>
          <Input id="coingecko-api-key" type="password" defaultValue="••••••••••••••••" />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="defillama-api-key">DeFiLlama API Key</Label>
          <Input id="defillama-api-key" type="password" defaultValue="••••••••••••••••" />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="goldsky-api-key">Goldsky API Key</Label>
          <Input id="goldsky-api-key" type="password" defaultValue="••••••••••••••••" />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="azure-event-grid-key">Azure Event Grid Key</Label>
          <Input id="azure-event-grid-key" type="password" defaultValue="••••••••••••••••" />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <div>
              <Label htmlFor="enable-webhooks">Enable Webhooks</Label>
              <p className={styles.fieldDescription}>Allow external services to send data via webhooks</p>
            </div>
            <Switch id="enable-webhooks" defaultChecked />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className={styles.cardFooter}>
        <Button variant="outline" className={styles.actionButton}>
          <RefreshCw className={styles.buttonIcon} />
          <span>Verify Keys</span>
        </Button>
        <Button className={styles.actionButton}>
          <Save className={styles.buttonIcon} />
          <span>Save Changes</span>
        </Button>
      </CardFooter>
    </Card>
  )
}