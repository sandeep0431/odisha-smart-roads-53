import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MessageSquare, Star, Clock, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react";

const CitizenServices = () => {
  const serviceRequests = [
    {
      id: "SR001",
      citizen: "Rajesh Kumar",
      type: "Road Repair",
      description: "Pothole on Jaydev Vihar Road causing traffic issues",
      status: "In Progress",
      priority: "High",
      assignedTo: "PWD Team A",
      created: "2024-01-15",
      eta: "3 days"
    },
    {
      id: "SR002",
      citizen: "Priya Dash",
      type: "Street Light",
      description: "Street light not working near Master Canteen",
      status: "Completed",
      priority: "Medium",
      assignedTo: "Electrical Team B",
      created: "2024-01-14",
      eta: "Completed"
    },
    {
      id: "SR003",
      citizen: "Amit Patel",
      type: "Water Supply",
      description: "No water supply for 2 days in Saheed Nagar",
      status: "Assigned",
      priority: "High",
      assignedTo: "Water Department",
      created: "2024-01-13",
      eta: "1 day"
    }
  ];

  const complaints = [
    {
      id: "CMP001",
      category: "Traffic Management",
      subject: "Signal timing issue at Rajpath",
      status: "Under Review",
      severity: "Medium",
      feedback: 4.2,
      responses: 12
    },
    {
      id: "CMP002",
      category: "Public Safety",
      subject: "Poor lighting in residential area",
      status: "Resolved",
      severity: "Low",
      feedback: 4.8,
      responses: 8
    },
    {
      id: "CMP003",
      category: "Infrastructure",
      subject: "Drainage problem during monsoon",
      status: "In Progress",
      severity: "High",
      feedback: 3.9,
      responses: 15
    }
  ];

  const mobileFeedback = [
    {
      feature: "Traffic Updates",
      rating: 4.6,
      reviews: 2847,
      improvement: "+0.3"
    },
    {
      feature: "Incident Reporting",
      rating: 4.3,
      reviews: 1923,
      improvement: "+0.1"
    },
    {
      feature: "Navigation",
      rating: 4.7,
      reviews: 3456,
      improvement: "+0.2"
    },
    {
      feature: "Parking Info",
      rating: 4.1,
      reviews: 1567,
      improvement: "-0.1"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": case "Resolved": return "outline";
      case "In Progress": case "Under Review": return "default";
      case "Assigned": return "secondary";
      case "New": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Service Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Active Citizens</span>
            </div>
            <div className="text-2xl font-bold">8,547</div>
            <div className="text-xs text-muted-foreground">Registered users</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Service Requests</span>
            </div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs text-muted-foreground">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Satisfaction</span>
            </div>
            <div className="text-2xl font-bold">4.5</div>
            <div className="text-xs text-muted-foreground">Average rating</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Avg Resolution</span>
            </div>
            <div className="text-2xl font-bold">2.3</div>
            <div className="text-xs text-muted-foreground">Days</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Request Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Active Service Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{request.id} - {request.type}</h4>
                    <Badge variant={getPriorityColor(request.priority) as any}>
                      {request.priority}
                    </Badge>
                    <Badge variant={getStatusColor(request.status) as any}>
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {request.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Citizen: {request.citizen}</span>
                    <span>Assigned: {request.assignedTo}</span>
                    <span>Created: {request.created}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium mb-2">ETA: {request.eta}</div>
                  <Button size="sm">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complaint Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Citizen Complaints & Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complaints.map((complaint, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{complaint.id}</h4>
                    <Badge variant="outline">{complaint.category}</Badge>
                    <Badge variant={getStatusColor(complaint.status) as any}>
                      {complaint.status}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{complaint.subject}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {complaint.feedback}/5.0
                    </span>
                    <span>{complaint.responses} responses</span>
                    <span>Severity: {complaint.severity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Button size="sm" variant="outline" className="mb-2">
                    <Mail className="h-3 w-3 mr-1" />
                    Respond
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {complaint.responses} citizen responses
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile App Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Mobile App Performance & Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {mobileFeedback.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{item.feature}</h4>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{item.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.reviews} reviews
                    </div>
                  </div>
                </div>
                <Progress 
                  value={(item.rating / 5) * 100} 
                  className="h-2 mb-2"
                />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Performance Trend</span>
                  <span className={`font-medium ${
                    item.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.improvement} this month
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Service Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Service Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Broadcast Public Notice</h4>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traffic">Traffic Advisory</SelectItem>
                  <SelectItem value="service">Service Update</SelectItem>
                  <SelectItem value="emergency">Emergency Notice</SelectItem>
                  <SelectItem value="event">Public Event</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Notice title" />
              <Textarea placeholder="Notice content" className="min-h-20" />
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Public Notice
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Service Request Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Open Requests</span>
                  <Badge variant="destructive">23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>In Progress</span>
                  <Badge variant="default">45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Completed Today</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.5/5.0</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                View All Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { CitizenServices };