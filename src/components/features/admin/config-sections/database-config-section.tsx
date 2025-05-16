"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Save } from "lucide-react"
import styles from "../configuration-panel.module.css"

export const DatabaseConfigSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Configuration</CardTitle>
        <CardDescription>Configure database connection and settings</CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.formGroup}>
          <Label htmlFor="db-connection-string">Connection String</Label>
          <Input
            id="db-connection-string"
            type="password"
            defaultValue=""
            placeholder="postgresql://username:password@hostname:port/database"
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="db-pool-size">Connection Pool Size</Label>
          <Input id="db-pool-size" type="number" defaultValue="10" />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="db-timeout">Connection Timeout (seconds)</Label>
          <Input id="db-timeout" type="number" defaultValue="30" />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <div>
              <Label htmlFor="db-ssl">Use SSL Connection</Label>
              <p className={styles.fieldDescription}>Encrypt database connection using SSL</p>
            </div>
            <Switch id="db-ssl" defaultChecked />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className={styles.cardFooter}>
        <Button variant="outline" className={styles.actionButton}>
          <RefreshCw className={styles.buttonIcon} />
          <span>Test Connection</span>
        </Button>
        <Button className={styles.actionButton}>
          <Save className={styles.buttonIcon} />
          <span>Save Changes</span>
        </Button>
      </CardFooter>
    </Card>
  )
}