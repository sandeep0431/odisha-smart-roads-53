import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Phone, Truck, MapPin, Clock, AlertTriangle, Users, Zap, Activity } from "lucide-react";

const EmergencyCenter = () => {
  const activeIncidents = [
    { 
      id: "INC001", 
      type: "Accident", 
      location: "NH-16 near Rasulgarh", 
      priority: "High", 
      time: "14:32", 
      status: "Active",
      units: ["Police Unit 12", "Ambulance AMB-05"],
      eta: "8 mins"
    },
    { 
      id: "INC002", 
      type: "Fire", 
      location: "Market Building, Unit-1", 
      priority: "Critical", 
      time: "14:28", 
      status: "Dispatched",
      units: ["Fire Station 3", "Rescue Team B"],
      eta: "4 mins"
    },
    { 
      id: "INC003", 
      type: "Medical", 
      location: "Jaydev Vihar Square", 
      priority: "Medium", 
      time: "14:25", 
      status: "Resolved",
      units: ["Ambulance AMB-02"],
      eta: "Completed"
    }
  ];

  const resources = [
    { type: "Police Units", available: 15, total: 20, deployed: 5 },
    { type: "Fire Trucks", available: 8, total: 12, deployed: 4 },
    { type: "Ambulances", available: 12, total: 18, deployed: 6 },
    { type: "Rescue Teams", available: 6, total: 8, deployed: 2 }
  ];

  const emergencyContacts = [
    { service: "Police Control Room", number: "100", status: "Active" },
    { service: "Fire Emergency", number: "101", status: "Active" },
    { service: "Medical Emergency", number: "108", status: "Active" },
    { service: "Disaster Management", number: "1077", status: "Active" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "destructive";
      case "Dispatched": return "default";
      case "Resolved": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Active Incidents</span>
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">2 Critical, 1 High</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Units Deployed</span>
            </div>
            <div className="text-2xl font-bold">17</div>
            <div className="text-xs text-muted-foreground">out of 58 available</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Avg Response</span>
            </div>
            <div className="text-2xl font-bold">6.2 min</div>
            <div className="text-xs text-muted-foreground">Below 8 min target</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">System Status</span>
            </div>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <div className="text-xs text-muted-foreground">All systems operational</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Emergency Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeIncidents.map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{incident.id} - {incident.type}</h4>
                    <Badge variant={getPriorityColor(incident.priority) as any}>
                      {incident.priority}
                    </Badge>
                    <Badge variant={getStatusColor(incident.status) as any}>
                      {incident.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {incident.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {incident.time}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Units: </span>
                    {incident.units.join(", ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">ETA: {incident.eta}</div>
                  <Button size="sm" className="mt-2">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Emergency Resource Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{resource.type}</span>
                  <span className="text-sm text-muted-foreground">
                    {resource.available}/{resource.total} available
                  </span>
                </div>
                <Progress 
                  value={(resource.available / resource.total) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  {resource.deployed} currently deployed
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Communication Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{contact.service}</h4>
                  <p className="text-lg font-bold text-primary">{contact.number}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {contact.status}
                  </Badge>
                  <Button size="sm">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Declare Emergency</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Zap className="h-6 w-6" />
              <span>Activate Protocol</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              <span>Coordinate Agencies</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { EmergencyCenter };