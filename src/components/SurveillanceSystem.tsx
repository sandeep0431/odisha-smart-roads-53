import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Eye, AlertTriangle, MapPin, Clock, Monitor, Wifi, Play } from "lucide-react";

const SurveillanceSystem = () => {
  const cameraFeeds = [
    { 
      id: "CAM001", 
      location: "Master Canteen Square", 
      status: "Active", 
      quality: "HD", 
      lastUpdate: "Live",
      alerts: 1,
      zone: "Central"
    },
    { 
      id: "CAM002", 
      location: "Rajpath Main Road", 
      status: "Active", 
      quality: "4K", 
      lastUpdate: "Live",
      alerts: 0,
      zone: "Central"
    },
    { 
      id: "CAM003", 
      location: "Station Square", 
      status: "Maintenance", 
      quality: "-", 
      lastUpdate: "2h ago",
      alerts: 0,
      zone: "Railway"
    },
    { 
      id: "CAM004", 
      location: "Jaydev Vihar Junction", 
      status: "Active", 
      quality: "HD", 
      lastUpdate: "Live",
      alerts: 2,
      zone: "Residential"
    },
    { 
      id: "CAM005", 
      location: "Khandagiri Road", 
      status: "Active", 
      quality: "HD", 
      lastUpdate: "Live",
      alerts: 0,
      zone: "Tourist"
    },
    { 
      id: "CAM006", 
      location: "Rasulgarh Square", 
      status: "Offline", 
      quality: "-", 
      lastUpdate: "4h ago",
      alerts: 0,
      zone: "Industrial"
    }
  ];

  const detectedIncidents = [
    {
      id: "DET001",
      camera: "CAM001",
      type: "Traffic Violation",
      description: "Vehicle running red light",
      time: "14:45",
      confidence: 95,
      action: "Auto-flagged"
    },
    {
      id: "DET002",
      camera: "CAM004",
      type: "Crowd Gathering",
      description: "Large crowd detected at junction",
      time: "14:42",
      confidence: 88,
      action: "Manual review"
    },
    {
      id: "DET003",
      camera: "CAM002",
      type: "Accident",
      description: "Vehicle collision detected",
      time: "14:38",
      confidence: 92,
      action: "Emergency dispatched"
    }
  ];

  const zones = [
    { name: "Central", cameras: 8, active: 7, alerts: 3 },
    { name: "Railway", cameras: 5, active: 4, alerts: 0 },
    { name: "Residential", cameras: 12, active: 11, alerts: 4 },
    { name: "Tourist", cameras: 6, active: 6, alerts: 1 },
    { name: "Industrial", cameras: 4, active: 3, alerts: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "outline";
      case "Maintenance": return "secondary";
      case "Offline": return "destructive";
      default: return "secondary";
    }
  };

  const getIncidentColor = (type: string) => {
    switch (type) {
      case "Accident": return "destructive";
      case "Traffic Violation": return "default";
      case "Crowd Gathering": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Surveillance Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Cameras</span>
            </div>
            <div className="text-2xl font-bold">35</div>
            <div className="text-xs text-muted-foreground">31 active, 4 offline</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Live Monitoring</span>
            </div>
            <div className="text-2xl font-bold">89%</div>
            <div className="text-xs text-muted-foreground">Coverage active</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Active Alerts</span>
            </div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground">3 high priority</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">AI Detection</span>
            </div>
            <div className="text-2xl font-bold">92%</div>
            <div className="text-xs text-muted-foreground">Accuracy rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Zone-wise Camera Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {zones.map((zone, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{zone.name} Zone</h4>
                  {zone.alerts > 0 && (
                    <Badge variant="destructive">{zone.alerts} alerts</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Cameras</span>
                    <span>{zone.active}/{zone.cameras}</span>
                  </div>
                  <Progress 
                    value={(zone.active / zone.cameras) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {Math.round((zone.active / zone.cameras) * 100)}% operational
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Camera Feeds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Live Camera Feeds Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {cameraFeeds.map((camera, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-black aspect-video flex items-center justify-center relative">
                  {camera.status === "Active" ? (
                    <div className="text-white text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Live Feed</p>
                      <p className="text-xs opacity-75">{camera.quality}</p>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Monitor className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">{camera.status}</p>
                    </div>
                  )}
                  {camera.alerts > 0 && (
                    <Badge className="absolute top-2 right-2" variant="destructive">
                      {camera.alerts} alert{camera.alerts > 1 ? 's' : ''}
                    </Badge>
                  )}
                  {camera.status === "Active" && (
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs">LIVE</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{camera.id}</h4>
                      <p className="text-xs text-muted-foreground">{camera.location}</p>
                    </div>
                    <Badge variant={getStatusColor(camera.status) as any} className="text-xs">
                      {camera.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {camera.lastUpdate}
                    </span>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Detection & Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            AI-Detected Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detectedIncidents.map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{incident.id}</h4>
                    <Badge variant={getIncidentColor(incident.type) as any}>
                      {incident.type}
                    </Badge>
                    <Badge variant="outline">
                      {incident.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {incident.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Camera className="h-3 w-3" />
                      {incident.camera}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {incident.time}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium mb-2">{incident.action}</div>
                  <Button size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Surveillance System Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <Monitor className="h-6 w-6" />
              <span>View All Feeds</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Alert Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Wifi className="h-6 w-6" />
              <span>Network Status</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Eye className="h-6 w-6" />
              <span>AI Configuration</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SurveillanceSystem };