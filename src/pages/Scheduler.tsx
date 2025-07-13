import { useState } from "react"
import { Calendar, Clock, Plus, Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScheduleEvent {
  id: string
  title: string
  date: string
  time: string
  action: 'on' | 'off'
  mode?: 'cool' | 'heat' | 'dry' | 'fan' | 'auto'
  temperature?: number
  recurring: 'none' | 'daily' | 'weekly'
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Morning Cooling',
    date: '2024-07-15',
    time: '07:00',
    action: 'on',
    mode: 'cool',
    temperature: 22,
    recurring: 'daily'
  },
  {
    id: '2',
    title: 'Night Off',
    date: '2024-07-15',
    time: '23:00',
    action: 'off',
    recurring: 'daily'
  },
  {
    id: '3',
    title: 'Weekend Heating',
    date: '2024-07-20',
    time: '09:00',
    action: 'on',
    mode: 'heat',
    temperature: 24,
    recurring: 'weekly'
  }
]

const getModeColor = (mode?: string) => {
  switch (mode) {
    case 'cool': return 'bg-cooling'
    case 'heat': return 'bg-heating'
    case 'dry': return 'bg-dry'
    case 'fan': return 'bg-fan'
    case 'auto': return 'bg-auto'
    default: return 'bg-muted'
  }
}

const getActionColor = (action: string) => {
  return action === 'on' ? 'bg-success' : 'bg-destructive'
}

export default function Scheduler() {
  const [events, setEvents] = useState<ScheduleEvent[]>(mockEvents)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )

  const [newEvent, setNewEvent] = useState<Partial<ScheduleEvent>>({
    title: '',
    date: selectedDate,
    time: '09:00',
    action: 'on',
    mode: 'cool',
    temperature: 22,
    recurring: 'none'
  })

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event: ScheduleEvent = {
        id: Date.now().toString(),
        title: newEvent.title!,
        date: newEvent.date!,
        time: newEvent.time!,
        action: newEvent.action!,
        mode: newEvent.mode,
        temperature: newEvent.temperature,
        recurring: newEvent.recurring!
      }
      setEvents([...events, event])
      setNewEvent({
        title: '',
        date: selectedDate,
        time: '09:00',
        action: 'on',
        mode: 'cool',
        temperature: 22,
        recurring: 'none'
      })
      setShowAddForm(false)
    }
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const upcomingEvents = events
    .filter(event => new Date(event.date + 'T' + event.time) >= new Date())
    .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AC Scheduler</h1>
          <p className="text-muted-foreground">Manage your AC automation schedule</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-primary shadow-cool"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Create New Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="e.g., Morning Cooling"
                />
              </div>
              <div>
                <Label htmlFor="recurring">Recurring</Label>
                <Select 
                  value={newEvent.recurring} 
                  onValueChange={(value) => setNewEvent({...newEvent, recurring: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">One-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="action">Action</Label>
                <Select 
                  value={newEvent.action} 
                  onValueChange={(value) => setNewEvent({...newEvent, action: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on">Turn ON</SelectItem>
                    <SelectItem value="off">Turn OFF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {newEvent.action === 'on' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mode">Mode</Label>
                  <Select 
                    value={newEvent.mode} 
                    onValueChange={(value) => setNewEvent({...newEvent, mode: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cool">Cool</SelectItem>
                      <SelectItem value="heat">Heat</SelectItem>
                      <SelectItem value="dry">Dry</SelectItem>
                      <SelectItem value="fan">Fan</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="16"
                    max="30"
                    value={newEvent.temperature}
                    onChange={(e) => setNewEvent({...newEvent, temperature: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={addEvent} className="bg-gradient-primary">
                Create Schedule
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No upcoming events scheduled
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {event.time}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getActionColor(event.action)}>
                          {event.action.toUpperCase()}
                        </Badge>
                        {event.mode && (
                          <Badge variant="secondary" className={getModeColor(event.mode)}>
                            {event.mode}
                          </Badge>
                        )}
                        {event.temperature && (
                          <Badge variant="outline">
                            {event.temperature}°C
                          </Badge>
                        )}
                        {event.recurring !== 'none' && (
                          <Badge variant="outline">
                            {event.recurring}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEvent(event.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar View Placeholder */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Full calendar integration coming soon</p>
            <p className="text-sm">View and manage all your AC schedules in calendar format</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}