import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapContainer } from "@/components/MapContainer";
import { IncidentReportForm } from "@/components/IncidentReportForm";
import { GamificationPanel } from "@/components/GamificationPanel";
import { AlertsPanel } from "@/components/AlertsPanel";
import { ArrowLeft, MapPin, Award, AlertTriangle, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const CitizenDashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("map");

  return (
    <div className="min-h-screen bg-gradient-cultural">
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
              <h1 className="text-2xl font-bold">Citizen Dashboard</h1>
            </div>
            <Badge variant="secondary" className="bg-primary-foreground text-primary">
              Bhubaneswar
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft sticky top-6">
              <CardHeader>
                <CardTitle className="text-center">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeSection === "map" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("map")}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Live Traffic Map
                </Button>
                <Button
                  variant={activeSection === "report" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("report")}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
                <Button
                  variant={activeSection === "rewards" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("rewards")}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Green Points
                </Button>
                <Button
                  variant={activeSection === "alerts" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("alerts")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Govt Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "map" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Live Traffic Map - Bhubaneswar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapContainer userType="citizen" />
                  <div className="mt-4 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-traffic-green rounded"></div>
                      <span>Low Traffic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-traffic-yellow rounded"></div>
                      <span>Medium Traffic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-traffic-red rounded"></div>
                      <span>Heavy Traffic</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "report" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Report Traffic Incident
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <IncidentReportForm />
                </CardContent>
              </Card>
            )}

            {activeSection === "rewards" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Green Points Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GamificationPanel />
                </CardContent>
              </Card>
            )}

            {activeSection === "alerts" && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Government Alerts & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertsPanel />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;