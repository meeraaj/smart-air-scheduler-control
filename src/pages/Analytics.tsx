import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Thermometer, 
  Clock,
  Activity
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"

// Mock data for analytics
const powerConsumptionData = [
  { day: 'Mon', consumption: 12.5, cost: 3.75 },
  { day: 'Tue', consumption: 15.2, cost: 4.56 },
  { day: 'Wed', consumption: 8.9, cost: 2.67 },
  { day: 'Thu', consumption: 18.7, cost: 5.61 },
  { day: 'Fri', consumption: 22.1, cost: 6.63 },
  { day: 'Sat', consumption: 25.4, cost: 7.62 },
  { day: 'Sun', consumption: 20.8, cost: 6.24 }
]

const temperatureData = [
  { time: '00:00', indoor: 24, outdoor: 28, target: 22 },
  { time: '04:00', indoor: 23, outdoor: 26, target: 22 },
  { time: '08:00', indoor: 22, outdoor: 30, target: 22 },
  { time: '12:00', indoor: 22, outdoor: 35, target: 22 },
  { time: '16:00', indoor: 23, outdoor: 37, target: 22 },
  { time: '20:00', indoor: 22, outdoor: 32, target: 22 },
  { time: '23:59', indoor: 24, outdoor: 29, target: 22 }
]

const usagePatternData = [
  { mode: 'Cool', hours: 45, color: 'hsl(var(--cooling))' },
  { mode: 'Heat', hours: 12, color: 'hsl(var(--heating))' },
  { mode: 'Fan', hours: 8, color: 'hsl(var(--fan))' },
  { mode: 'Dry', hours: 5, color: 'hsl(var(--dry))' },
  { mode: 'Auto', hours: 15, color: 'hsl(var(--auto))' }
]

const monthlyUsageData = [
  { month: 'Jan', usage: 180, efficiency: 85 },
  { month: 'Feb', usage: 165, efficiency: 87 },
  { month: 'Mar', usage: 195, efficiency: 82 },
  { month: 'Apr', usage: 220, efficiency: 80 },
  { month: 'May', usage: 285, efficiency: 78 },
  { month: 'Jun', usage: 320, efficiency: 75 },
]

export default function Analytics() {
  const totalConsumption = powerConsumptionData.reduce((sum, day) => sum + day.consumption, 0)
  const totalCost = powerConsumptionData.reduce((sum, day) => sum + day.cost, 0)
  const avgEfficiency = monthlyUsageData.reduce((sum, month) => sum + month.efficiency, 0) / monthlyUsageData.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor your AC usage and optimize energy consumption</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Weekly Consumption</h3>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalConsumption.toFixed(1)} kWh</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↓ 12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Energy Cost</h3>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↓ $2.40</span> savings this week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Efficiency</h3>
            <Activity className="h-4 w-4 text-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-auto">{avgEfficiency.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↑ 3%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Runtime Today</h3>
            <Clock className="h-4 w-4 text-heating" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heating">6.5 hrs</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning">↑ 1.2 hrs</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Power Consumption Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Power Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={powerConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'consumption' ? `${value} kWh` : `$${value}`,
                    name === 'consumption' ? 'Consumption' : 'Cost'
                  ]}
                />
                <Bar dataKey="consumption" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Temperature Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature Trends (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis domain={[15, 40]} />
                <Tooltip formatter={(value) => [`${value}°C`]} />
                <Line 
                  type="monotone" 
                  dataKey="indoor" 
                  stroke="hsl(var(--cooling))" 
                  strokeWidth={3}
                  name="Indoor"
                />
                <Line 
                  type="monotone" 
                  dataKey="outdoor" 
                  stroke="hsl(var(--heating))" 
                  strokeWidth={2}
                  name="Outdoor"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Usage Pattern Pie Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Mode Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usagePatternData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="hours"
                >
                  {usagePatternData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} hours`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {usagePatternData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.mode}: {item.hours}h</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Efficiency Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Usage & Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyUsageData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                  name="Usage (kWh)"
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Efficiency %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Smart Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-success">💡 Energy Saving Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Set temperature 1-2°C higher in cooling mode to save 10-20% energy</li>
                <li>• Use timer feature to avoid overnight cooling when not needed</li>
                <li>• Regular filter cleaning improves efficiency by 15%</li>
                <li>• Consider upgrading to auto mode for optimal energy usage</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">📊 Usage Patterns</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Peak usage time</span>
                  <Badge variant="secondary">2:00 PM - 6:00 PM</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Most efficient day</span>
                  <Badge variant="secondary">Tuesday</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Preferred mode</span>
                  <Badge className="bg-cooling">Cool (52%)</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}