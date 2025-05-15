"use client"
import { Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import styles from "../configuration-panel.module.css"

export const SecurityConfigSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Configure security and authentication settings</CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.formGroup}>
          <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
          <Input id="session-timeout" type="number" defaultValue="60" />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="password-policy">Password Policy</Label>
          <Select defaultValue="strong">
            <SelectTrigger id="password-policy">
              <SelectValue placeholder="Select password policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (8+ characters)</SelectItem>
              <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
              <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
              <SelectItem value="very-strong">Very Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <div>
              <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
              <p className={styles.fieldDescription}>Require 2FA for all admin accounts</p>
            </div>
            <Switch id="two-factor" defaultChecked />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <div>
              <Label htmlFor="ip-restriction">Enable IP Restrictions</Label>
              <p className={styles.fieldDescription}>Restrict admin access to specific IP addresses</p>
            </div>
            <Switch id="ip-restriction" />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
          <Input id="allowed-ips" placeholder="e.g. 192.168.1.1, 10.0.0.0/24" />
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