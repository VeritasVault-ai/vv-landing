"use client"
import { Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import styles from "../configuration-panel.module.css"

export const ApiConfigSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>Configure API settings and rate limits</CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.formGroup}>
          <Label htmlFor="api-rate-limit">API Rate Limit (requests per minute)</Label>
          <Input id="api-rate-limit" type="number" defaultValue="60" />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="api-timeout">API Timeout (seconds)</Label>
          <Input id="api-timeout" type="number" defaultValue="30" />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <div>
              <Label htmlFor="api-cache">Enable API Caching</Label>
              <p className={styles.fieldDescription}>Cache API responses to improve performance</p>
            </div>
            <Switch id="api-cache" defaultChecked />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
          <Input id="cache-duration" type="number" defaultValue="15" />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <div>
              <Label htmlFor="api-logging">Enable API Logging</Label>
              <p className={styles.fieldDescription}>Log all API requests and responses</p>
            </div>
            <Switch id="api-logging" defaultChecked />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className={styles.cardFooter}>
        <Button variant="outline" className={styles.actionButton}>
          <RefreshCw className={styles.buttonIcon} />
          <span>Reset to Defaults</span>
        </Button>
        <Button className={styles.actionButton}>
          <Save className={styles.buttonIcon} />
          <span>Save Changes</span>
        </Button>
      </CardFooter>
    </Card>
  )
}