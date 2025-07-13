import { useState } from "react"
import { Settings as SettingsIcon, Wifi, Bell, Thermometer, Zap, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function Settings() {
  const [settings, setSettings] = useState({
    // Device Settings
    deviceName: "Living Room AC",
    temperatureUnit: "celsius",
    autoMode: true,
    ecoMode: false,
    
    // Notifications
    pushNotifications: true,
    emailAlerts: false,
    maintenanceReminders: true,
    energyReports: true,
    
    // Connectivity
    wifiConnected: true,
    autoConnect: true,
    
    // Security
    childLock: false,
    remoteAccess: true,
    
    // Energy
    powerSaver: false,
    scheduledMaintenance: true,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your Smart AC preferences and system settings</p>
      </div>

      {/* Device Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Device Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deviceName">Device Name</Label>
              <Input
                id="deviceName"
                value={settings.deviceName}
                onChange={(e) => updateSetting('deviceName', e.target.value)}
                placeholder="Enter device name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tempUnit">Temperature Unit</Label>
              <Select 
                value={settings.temperatureUnit} 
                onValueChange={(value) => updateSetting('temperatureUnit', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically adjust temperature based on room conditions
                </p>
              </div>
              <Switch 
                checked={settings.autoMode}
                onCheckedChange={(checked) => updateSetting('autoMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Eco Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Optimize for energy efficiency
                </p>
              </div>
              <Switch 
                checked={settings.ecoMode}
                onCheckedChange={(checked) => updateSetting('ecoMode', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications on your device
              </p>
            </div>
            <Switch 
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get important alerts via email
              </p>
            </div>
            <Switch 
              checked={settings.emailAlerts}
              onCheckedChange={(checked) => updateSetting('emailAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Reminders for filter cleaning and servicing
              </p>
            </div>
            <Switch 
              checked={settings.maintenanceReminders}
              onCheckedChange={(checked) => updateSetting('maintenanceReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Energy Reports</Label>
              <p className="text-sm text-muted-foreground">
                Weekly energy consumption reports
              </p>
            </div>
            <Switch 
              checked={settings.energyReports}
              onCheckedChange={(checked) => updateSetting('energyReports', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Connectivity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Connectivity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>WiFi Status</Label>
              <p className="text-sm text-muted-foreground">
                {settings.wifiConnected ? "Connected to Home Network" : "Disconnected"}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              settings.wifiConnected 
                ? "bg-success text-white" 
                : "bg-destructive text-white"
            }`}>
              {settings.wifiConnected ? "Connected" : "Disconnected"}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Connect</Label>
              <p className="text-sm text-muted-foreground">
                Automatically connect to known networks
              </p>
            </div>
            <Switch 
              checked={settings.autoConnect}
              onCheckedChange={(checked) => updateSetting('autoConnect', checked)}
            />
          </div>

          <Button variant="outline" className="w-full">
            Configure WiFi Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security & Access */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Child Lock</Label>
              <p className="text-sm text-muted-foreground">
                Prevent unauthorized access to controls
              </p>
            </div>
            <Switch 
              checked={settings.childLock}
              onCheckedChange={(checked) => updateSetting('childLock', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Remote Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow control from outside your home network
              </p>
            </div>
            <Switch 
              checked={settings.remoteAccess}
              onCheckedChange={(checked) => updateSetting('remoteAccess', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Energy & Maintenance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Energy & Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Power Saver Mode</Label>
              <p className="text-sm text-muted-foreground">
                Reduce power consumption during low usage
              </p>
            </div>
            <Switch 
              checked={settings.powerSaver}
              onCheckedChange={(checked) => updateSetting('powerSaver', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Scheduled Maintenance</Label>
              <p className="text-sm text-muted-foreground">
                Automatic system optimization and cleaning cycles
              </p>
            </div>
            <Switch 
              checked={settings.scheduledMaintenance}
              onCheckedChange={(checked) => updateSetting('scheduledMaintenance', checked)}
            />
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline">
              Run Diagnostic Test
            </Button>
            <Button variant="outline">
              Reset to Factory Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Reset Changes
        </Button>
        <Button className="bg-gradient-primary shadow-cool">
          Save Settings
        </Button>
      </div>
    </div>
  )
}