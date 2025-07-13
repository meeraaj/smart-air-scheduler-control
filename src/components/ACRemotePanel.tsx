import { useState } from "react"
import { 
  Power, 
  Plus, 
  Minus, 
  Wind, 
  Snowflake, 
  Sun, 
  Droplets,
  RotateCcw,
  Timer,
  ArrowUpDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

interface ACState {
  isOn: boolean
  temperature: number
  mode: 'cool' | 'heat' | 'dry' | 'fan' | 'auto'
  fanSpeed: 'low' | 'medium' | 'high' | 'auto'
  swing: boolean
  timer: number // minutes
}

const MODES = [
  { key: 'cool', label: 'Cool', icon: Snowflake, color: 'bg-cooling' },
  { key: 'heat', label: 'Heat', icon: Sun, color: 'bg-heating' },
  { key: 'dry', label: 'Dry', icon: Droplets, color: 'bg-dry' },
  { key: 'fan', label: 'Fan', icon: Wind, color: 'bg-fan' },
  { key: 'auto', label: 'Auto', icon: RotateCcw, color: 'bg-auto' },
] as const

const FAN_SPEEDS = ['low', 'medium', 'high', 'auto'] as const

export function ACRemotePanel() {
  const [acState, setACState] = useState<ACState>({
    isOn: false,
    temperature: 22,
    mode: 'cool',
    fanSpeed: 'auto',
    swing: false,
    timer: 0,
  })

  const updateState = (updates: Partial<ACState>) => {
    setACState(prev => ({ ...prev, ...updates }))
  }

  const adjustTemperature = (delta: number) => {
    setACState(prev => ({
      ...prev,
      temperature: Math.max(16, Math.min(30, prev.temperature + delta))
    }))
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 20) return 'text-temp-cold'
    if (temp <= 25) return 'text-primary'
    return 'text-temp-hot'
  }

  const getModeColor = (mode: string) => {
    const modeConfig = MODES.find(m => m.key === mode)
    return modeConfig?.color || 'bg-primary'
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Main Control Panel */}
      <Card className="shadow-card border-2">
        <CardHeader className="text-center bg-gradient-primary text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-3">
            <Wind className="h-8 w-8" />
            Smart AC Remote Controller
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Power Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => updateState({ isOn: !acState.isOn })}
              variant={acState.isOn ? "default" : "outline"}
              size="lg"
              className={`w-24 h-24 rounded-full shadow-glow transition-all ${
                acState.isOn 
                  ? "bg-gradient-primary hover:shadow-glow" 
                  : "border-2 border-muted hover:bg-muted"
              }`}
            >
              <Power className="h-8 w-8" />
            </Button>
          </div>

          {acState.isOn && (
            <div className="space-y-8 animate-fade-in">
              {/* Temperature Control */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Temperature</h3>
                <div className="flex items-center justify-center gap-6">
                  <Button
                    onClick={() => adjustTemperature(-1)}
                    variant="outline"
                    size="lg"
                    className="w-16 h-16 rounded-full"
                  >
                    <Minus className="h-6 w-6" />
                  </Button>
                  
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getTemperatureColor(acState.temperature)} transition-colors`}>
                      {acState.temperature}°
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      Target Temperature
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => adjustTemperature(1)}
                    variant="outline"
                    size="lg"
                    className="w-16 h-16 rounded-full"
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Mode Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Mode</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {MODES.map((mode) => {
                    const Icon = mode.icon
                    const isActive = acState.mode === mode.key
                    return (
                      <Button
                        key={mode.key}
                        onClick={() => updateState({ mode: mode.key })}
                        variant={isActive ? "default" : "outline"}
                        className={`h-20 flex-col gap-2 transition-all ${
                          isActive 
                            ? `${mode.color} text-white shadow-cool` 
                            : "hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{mode.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Fan Speed & Swing */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Fan Speed */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Fan Speed</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {FAN_SPEEDS.map((speed) => (
                      <Button
                        key={speed}
                        onClick={() => updateState({ fanSpeed: speed })}
                        variant={acState.fanSpeed === speed ? "default" : "outline"}
                        className={`capitalize ${
                          acState.fanSpeed === speed ? "bg-primary" : ""
                        }`}
                      >
                        {speed}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Swing Control */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Air Swing</h3>
                  <Button
                    onClick={() => updateState({ swing: !acState.swing })}
                    variant={acState.swing ? "default" : "outline"}
                    className={`w-full h-12 ${
                      acState.swing ? "bg-primary" : ""
                    }`}
                  >
                    <ArrowUpDown className="h-5 w-5 mr-2" />
                    {acState.swing ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>

              {/* Timer Control */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Timer (Minutes)</h3>
                <div className="space-y-4">
                  <Slider
                    value={[acState.timer]}
                    onValueChange={([value]) => updateState({ timer: value })}
                    max={480}
                    step={15}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">0 min</span>
                    <Badge variant={acState.timer > 0 ? "default" : "secondary"}>
                      <Timer className="h-4 w-4 mr-1" />
                      {acState.timer > 0 ? `${acState.timer} min` : "No Timer"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">8 hrs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Status Display */}
      {acState.isOn && (
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className={`text-2xl font-bold ${getTemperatureColor(acState.temperature)}`}>
                  {acState.temperature}°C
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mode</p>
                <p className="text-lg font-semibold capitalize">{acState.mode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fan Speed</p>
                <p className="text-lg font-semibold capitalize">{acState.fanSpeed}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Swing</p>
                <p className="text-lg font-semibold">{acState.swing ? "ON" : "OFF"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}