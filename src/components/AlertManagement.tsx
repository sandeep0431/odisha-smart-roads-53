import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bell, Calendar, MapPin, AlertTriangle, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AlertManagement = () => {
  const [alertType, setAlertType] = useState("");
  const [title, setTitle] = useState("");
  const [titleOdia, setTitleOdia] = useState("");
  const [message, setMessage] = useState("");
  const [messageOdia, setMessageOdia] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [voiceAlert, setVoiceAlert] = useState(false);
  const { toast } = useToast();

  const recentAlerts = [
    {
      id: 1,
      type: "festival",
      title: "Rath Yatra Traffic Alert",
      location: "Puri, Bada Danda",
      time: "2 hours ago",
      status: "active",
      priority: "high",
      recipients: 15420
    },
    {
      id: 2,
      type: "diversion",
      title: "Construction Diversion",
      location: "Master Canteen",
      time: "45 minutes ago",
      status: "active",
      priority: "medium",
      recipients: 8930
    },
    {
      id: 3,
      type: "vip",
      title: "VIP Movement Alert",
      location: "Rajpath",
      time: "1 hour ago",
      status: "completed",
      priority: "high",
      recipients: 12560
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const estimatedRecipients = Math.floor(Math.random() * 20000) + 5000;
    
    toast({
      title: "Alert Sent Successfully!",
      description: `Alert broadcast to ${estimatedRecipients.toLocaleString()} citizens in the area.`,
    });
    
    // Reset form
    setAlertType("");
    setTitle("");
    setTitleOdia("");
    setMessage("");
    setMessageOdia("");
    setLocation("");
    setPriority("");
    setVoiceAlert(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "festival": return Calendar;
      case "diversion": return MapPin;
      case "vip": return AlertTriangle;
      case "emergency": return Bell;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Create New Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alert-type">Alert Type</Label>
                <Select value={alertType} onValueChange={setAlertType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="festival">Festival/Cultural Event</SelectItem>
                    <SelectItem value="diversion">Road Diversion</SelectItem>
                    <SelectItem value="vip">VIP Movement</SelectItem>
                    <SelectItem value="weather">Weather Alert</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="maintenance">Road Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={priority} onValueChange={setPriority} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Affected Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location or area (e.g., Master Canteen, Rajpath)"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Alert Title (English)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter alert title in English"
                  required
                />
              </div>

              <div>
                <Label htmlFor="title-odia">Alert Title (Odia)</Label>
                <Input
                  id="title-odia"
                  value={titleOdia}
                  onChange={(e) => setTitleOdia(e.target.value)}
                  placeholder="ଓଡ଼ିଆରେ ସତର୍କତା ଶୀର୍ଷକ ଲେଖନ୍ତୁ"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="message">Alert Message (English)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter detailed alert message in English"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="message-odia">Alert Message (Odia)</Label>
                <Textarea
                  id="message-odia"
                  value={messageOdia}
                  onChange={(e) => setMessageOdia(e.target.value)}
                  placeholder="ଓଡ଼ିଆରେ ବିସ୍ତୃତ ସତର୍କତା ସନ୍ଦେଶ ଲେଖନ୍ତୁ"
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="voice-alert"
                checked={voiceAlert}
                onChange={(e) => setVoiceAlert(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="voice-alert">Include Voice Alert (Text-to-Speech)</Label>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Alert Preview:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Type:</strong> {alertType || "Not selected"}</p>
                <p><strong>Priority:</strong> {priority || "Not selected"}</p>
                <p><strong>Location:</strong> {location || "Not specified"}</p>
                <p><strong>Title:</strong> {title || "Not entered"}</p>
                <p><strong>Voice Alert:</strong> {voiceAlert ? "Enabled" : "Disabled"}</p>
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Alert to Citizens
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => {
              const TypeIcon = getTypeIcon(alert.type);
              
              return (
                <Card key={alert.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{alert.time}</span>
                            <span>•</span>
                            <span>{alert.recipients.toLocaleString()} recipients</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(alert.priority) as any}>
                          {alert.priority}
                        </Badge>
                        <Badge variant={alert.status === "active" ? "default" : "secondary"}>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alert Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Alerts Today</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">89%</div>
              <div className="text-sm text-muted-foreground">Delivery Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">2.3k</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">45sec</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { AlertManagement };