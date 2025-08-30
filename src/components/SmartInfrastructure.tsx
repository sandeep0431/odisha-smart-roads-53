import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Zap, Lightbulb, Droplets, Trash2, Wind, Thermometer, Gauge, Settings } from "lucide-react";

const SmartInfrastructure = () => {
  const streetLights = [
    { zone: "Central Business District", total: 150, active: 148, energy: 89, dimming: "Auto" },
    { zone: "Residential Areas", total: 280, active: 275, energy: 76, dimming: "Scheduled" },
    { zone: "Industrial Zone", total: 95, active: 92, energy: 92, dimming: "Manual" },
    { zone: "Tourist Areas", total: 120, active: 118, energy: 85, dimming: "Motion" }
  ];

  const waterManagement = [
    { location: "Zone A Distribution", flow: 850, pressure: 4.2, quality: "Good", alerts: 0 },
    { location: "Zone B Distribution", flow: 720, pressure: 3.8, quality: "Excellent", alerts: 0 },
    { location: "Zone C Distribution", flow: 420, pressure: 2.9, quality: "Fair", alerts: 1 },
    { location: "Main Treatment Plant", flow: 2500, pressure: 6.5, quality: "Excellent", alerts: 0 }
  ];

  const wasteManagement = [
    { location: "Master Canteen Area", bins: 25, filled: 18, collection: "Today 9 AM", status: "Scheduled" },
    { location: "Jaydev Vihar", bins: 32, filled: 28, collection: "Tomorrow 8 AM", status: "Urgent" },
    { location: "Station Square", bins: 18, filled: 12, collection: "Today 2 PM", status: "Normal" },
    { location: "Khandagiri Road", bins: 22, filled: 15, collection: "Today 11 AM", status: "Completed" }
  ];

  const airQuality = [
    { location: "Master Canteen", pm25: 45, pm10: 62, aqi: 78, status: "Moderate" },
    { location: "Jaydev Vihar", pm25: 38, pm10: 55, aqi: 65, status: "Good" },
    { location: "Industrial Area", pm25: 78, pm10: 95, aqi: 125, status: "Unhealthy" },
    { location: "Residential Zone", pm25: 42, pm10: 58, aqi: 72, status: "Moderate" }
  ];

  const getQualityColor = (status: string) => {
    switch (status) {
      case "Good": case "Excellent": return "outline";
      case "Moderate": case "Fair": return "secondary";
      case "Unhealthy": case "Poor": return "destructive";
      default: return "secondary";
    }
  };

  const getWasteStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "outline";
      case "Normal": case "Scheduled": return "secondary";
      case "Urgent": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Infrastructure Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Street Lighting</span>
            </div>
            <div className="text-2xl font-bold">645</div>
            <div className="text-xs text-muted-foreground">633 active (98%)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Water Distribution</span>
            </div>
            <div className="text-2xl font-bold">1,990L</div>
            <div className="text-xs text-muted-foreground">Current flow rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Waste Collection</span>
            </div>
            <div className="text-2xl font-bold">97</div>
            <div className="text-xs text-muted-foreground">Smart bins monitored</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Air Quality</span>
            </div>
            <div className="text-2xl font-bold">78</div>
            <div className="text-xs text-muted-foreground">Average AQI</div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Street Lighting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Smart Street Lighting Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {streetLights.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{zone.zone}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Active: {zone.active}/{zone.total}</span>
                    <span>Energy: {zone.energy}%</span>
                    <span>Mode: {zone.dimming}</span>
                  </div>
                  <Progress 
                    value={(zone.active / zone.total) * 100} 
                    className="h-2 mt-2"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{zone.energy}% Efficiency</p>
                    <p className="text-xs text-muted-foreground">{zone.dimming} Control</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Water Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Water Distribution Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {waterManagement.map((system, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{system.location}</h4>
                  <Badge variant={getQualityColor(system.quality) as any}>
                    {system.quality}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Flow Rate:</span>
                    <span className="font-medium">{system.flow} L/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pressure:</span>
                    <span className="font-medium">{system.pressure} bar</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality:</span>
                    <span className="font-medium">{system.quality}</span>
                  </div>
                  {system.alerts > 0 && (
                    <Badge variant="destructive" className="w-full justify-center">
                      {system.alerts} Alert{system.alerts > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Waste Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Smart Waste Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wasteManagement.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{area.location}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Bins: {area.bins}</span>
                    <span>Filled: {area.filled}/{area.bins}</span>
                    <span>Next Collection: {area.collection}</span>
                  </div>
                  <Progress 
                    value={(area.filled / area.bins) * 100} 
                    className="h-2 mt-2"
                  />
                </div>
                <div className="text-right">
                  <Badge variant={getWasteStatusColor(area.status) as any} className="mb-2">
                    {area.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((area.filled / area.bins) * 100)}% Full
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Air Quality Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5" />
            Air Quality Monitoring Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {airQuality.map((station, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{station.location}</h4>
                  <Badge variant={getQualityColor(station.status) as any}>
                    {station.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>PM2.5:</span>
                    <span className="font-medium">{station.pm25} μg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PM10:</span>
                    <span className="font-medium">{station.pm10} μg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AQI:</span>
                    <span className="font-medium">{station.aqi}</span>
                  </div>
                  <Progress 
                    value={Math.min((station.aqi / 200) * 100, 100)} 
                    className="h-2 mt-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <Zap className="h-6 w-6" />
              <span>Energy Management</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Thermometer className="h-6 w-6" />
              <span>Climate Control</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Gauge className="h-6 w-6" />
              <span>Performance Monitor</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SmartInfrastructure };