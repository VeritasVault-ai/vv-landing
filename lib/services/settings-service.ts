import { apiClient } from "../api-client"
import { MOCK_SETTINGS } from "../mock-data"

interface Setting {
  key: string
  value: any
}

class SettingsService {
  async getAll(): Promise<Setting[]> {
    try {
      return await apiClient.getCached<Setting[]>("/settings")
    } catch (error) {
      console.error("Error fetching settings:", error)
      return MOCK_SETTINGS
    }
  }

  async get(key: string): Promise<Setting | null> {
    try {
      return await apiClient.getCached<Setting>(`/settings/${key}`)
    } catch (error) {
      console.error(`Error fetching setting with key ${key}:`, error)
      const defaultSetting = MOCK_SETTINGS.find((s) => s.key === key)
      return defaultSetting || null
    }
  }

  async update(key: string, value: any): Promise<Setting> {
    try {
      // Implementation would depend on your API
      return { key, value }
    } catch (error) {
      console.error(`Error updating setting with key ${key}:`, error)
      throw error
    }
  }
}

export const settingsService = new SettingsService()
