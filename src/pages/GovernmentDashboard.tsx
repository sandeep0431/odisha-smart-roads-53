import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer } from "@/components/MapContainer";
import { TrafficAnalytics } from "@/components/TrafficAnalytics";
import { AlertManagement } from "@/components/AlertManagement";
import { EmergencyCenter } from "@/components/EmergencyCenter";
import { SurveillanceSystem } from "@/components/SurveillanceSystem";
import { SmartInfrastructure } from "@/components/SmartInfrastructure";
import { CitizenServices } from "@/components/CitizenServices";
import { SignalControl } from "@/components/SignalControl";
import { ArrowLeft, Shield, BarChart3, Bell, MapPin, LogIn, Camera, Zap, Users, Phone, Moon, Sun, Settings, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GovernmentDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  const userRoles = [
    { id: "traffic_admin", name: "Traffic Administrator", credentials: { username: "traffic_admin", password: "odisha2024" } },
    { id: "emergency_chief", name: "Emergency Response Chief", credentials: { username: "emergency_chief", password: "emergency123" } },
    { id: "city_admin", name: "City Administrator", credentials: { username: "city_admin", password: "city2024" } },
    { id: "surveillance_head", name: "Surveillance Head", credentials: { username: "surveillance_head", password: "watch123" } },
    { id: "infra_manager", name: "Infrastructure Manager", credentials: { username: "infra_manager", password: "infra2024" } },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "Select your department role to continue",
        variant: "destructive",
      });
      return;
    }

    const role = userRoles.find(r => r.id === selectedRole);
    if (role && username === role.credentials.username && password === role.credentials.password) {
      setIsAuthenticated(true);
      setUserRole(selectedRole);
      setActiveSection(getDefaultSection(selectedRole));
      toast({
        title: "Login Successful",
        description: `Welcome to ${role.name} Dashboard`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials for selected role",
        variant: "destructive",
      });
    }
  };

  const getDefaultSection = (role: string) => {
    switch (role) {
      case "traffic_admin": return "traffic";
      case "emergency_chief": return "emergency";
      case "city_admin": return "dashboard";
      case "surveillance_head": return "surveillance";
      case "infra_manager": return "infrastructure";
      default: return "dashboard";
    }
  };

  const getRolePermissions = (role: string) => {
    const permissions = {
      traffic_admin: ["dashboard", "traffic", "signal_control", "analytics", "alerts"],
      emergency_chief: ["dashboard", "emergency", "surveillance", "alerts"],
      city_admin: ["dashboard", "traffic", "signal_control", "analytics", "alerts", "emergency", "surveillance", "infrastructure", "citizens"],
      surveillance_head: ["dashboard", "surveillance", "signal_control", "emergency"],
      infra_manager: ["dashboard", "infrastructure", "analytics"],
    };
    return permissions[role as keyof typeof permissions] || [];
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-gradient-cultural flex items-center justify-center ${isDarkMode ? 'dark' : ''}`}>
        <Card className="w-full max-w-md shadow-warm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Government Control Centre</CardTitle>
            <p className="text-muted-foreground">Secure access for government officials</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="role">Department Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Access Control Centre
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm space-y-2">
              <p className="font-medium">Demo Credentials:</p>
              {userRoles.map((role) => (
                <div key={role.id} className="text-xs">
                  <p className="font-medium">{role.name}:</p>
                  <p>User: {role.credentials.username} | Pass: {role.credentials.password}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentRole = userRoles.find(r => r.id === userRole);
  const permissions = getRolePermissions(userRole);

  return (
    <div className={`min-h-screen bg-gradient-cultural ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-warm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Control Centre</h1>
                <p className="text-sm opacity-90">Smart City Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Badge variant="secondary" className="bg-primary-foreground text-primary">
                {currentRole?.name}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft sticky top-6">
              <CardHeader>
                <CardTitle className="text-center flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Control Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {permissions.includes("dashboard") && (
                  <Button
                    variant={activeSection === "dashboard" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("dashboard")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Overview Dashboard
                  </Button>
                )}
                {permissions.includes("traffic") && (
                  <Button
                    variant={activeSection === "traffic" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("traffic")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Traffic Management
                  </Button>
                )}
                {permissions.includes("signal_control") && (
                  <Button
                    variant={activeSection === "signal_control" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("signal_control")}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Signal Control
                  </Button>
                )}
                {permissions.includes("emergency") && (
                  <Button
                    variant={activeSection === "emergency" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("emergency")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Response
                  </Button>
                )}
                {permissions.includes("surveillance") && (
                  <Button
                    variant={activeSection === "surveillance" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("surveillance")}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    City Surveillance
                  </Button>
                )}
                {permissions.includes("infrastructure") && (
                  <Button
                    variant={activeSection === "infrastructure" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("infrastructure")}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Smart Infrastructure
                  </Button>
                )}
                {permissions.includes("citizens") && (
                  <Button
                    variant={activeSection === "citizens" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("citizens")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Citizen Services
                  </Button>
                )}
                {permissions.includes("analytics") && (
                  <Button
                    variant={activeSection === "analytics" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("analytics")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics & Reports
                  </Button>
                )}
                {permissions.includes("alerts") && (
                  <Button
                    variant={activeSection === "alerts" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection("alerts")}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Alert Management
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "dashboard" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    City Overview Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrafficAnalytics />
                </CardContent>
              </Card>
            )}

            {activeSection === "traffic" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Traffic Management Hub - Click roads to update status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapContainer userType="government" />
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Traffic Control Functions:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Click on any road segment to update traffic status</li>
                      <li>Set signal timing and route diversions</li>
                      <li>Monitor real-time congestion patterns</li>
                      <li>Coordinate with emergency services</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "signal_control" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Traffic Signal Control Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SignalControl />
                </CardContent>
              </Card>
            )}

            {activeSection === "emergency" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Emergency Response Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EmergencyCenter />
                </CardContent>
              </Card>
            )}

            {activeSection === "surveillance" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    City Surveillance System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SurveillanceSystem />
                </CardContent>
              </Card>
            )}

            {activeSection === "infrastructure" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Smart Infrastructure Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SmartInfrastructure />
                </CardContent>
              </Card>
            )}

            {activeSection === "citizens" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Citizen Services Portal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CitizenServices />
                </CardContent>
              </Card>
            )}

            {activeSection === "analytics" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Advanced Analytics & Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrafficAnalytics />
                </CardContent>
              </Card>
            )}

            {activeSection === "alerts" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Alert Broadcasting System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertManagement />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;