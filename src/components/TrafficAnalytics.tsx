import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, MapPin, Clock, Users } from "lucide-react";

const TrafficAnalytics = () => {
  const hotspots = [
    { location: "Master Canteen Square", congestion: 85, change: +12, status: "critical" },
    { location: "Rajpath - Sishu Bhawan", congestion: 72, change: -8, status: "high" },
    { location: "Station Square", congestion: 68, change: +5, status: "high" },
    { location: "Rasulgarh Square", congestion: 58, change: -15, status: "medium" },
    { location: "Jaydev Vihar", congestion: 45, change: +3, status: "low" }
  ];

  const dailyStats = [
    { time: "6:00 AM", volume: 1200, avgSpeed: 35 },
    { time: "8:00 AM", volume: 3500, avgSpeed: 18 },
    { time: "10:00 AM", volume: 2800, avgSpeed: 25 },
    { time: "12:00 PM", volume: 3200, avgSpeed: 22 },
    { time: "2:00 PM", volume: 2900, avgSpeed: 24 },
    { time: "4:00 PM", volume: 3800, avgSpeed: 16 },
    { time: "6:00 PM", volume: 4200, avgSpeed: 14 },
    { time: "8:00 PM", volume: 2100, avgSpeed: 28 }
  ];

  const weeklyData = [
    { day: "Monday", incidents: 25, avgCongestion: 68 },
    { day: "Tuesday", incidents: 18, avgCongestion: 62 },
    { day: "Wednesday", incidents: 22, avgCongestion: 65 },
    { day: "Thursday", incidents: 28, avgCongestion: 71 },
    { day: "Friday", incidents: 32, avgCongestion: 75 },
    { day: "Saturday", incidents: 15, avgCongestion: 45 },
    { day: "Sunday", incidents: 12, avgCongestion: 38 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Citizens</span>
            </div>
            <div className="text-2xl font-bold">12,847</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5.2% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Avg Traffic Volume</span>
            </div>
            <div className="text-2xl font-bold">2,845</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -2.1% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Avg Speed</span>
            </div>
            <div className="text-2xl font-bold">24 km/h</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +1.8 km/h improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Incidents Today</span>
            </div>
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -22% from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Congestion Hotspots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Traffic Congestion Hotspots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hotspots.map((spot, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{spot.location}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-muted rounded-full h-2 max-w-32">
                      <div
                        className={`h-2 rounded-full ${
                          spot.congestion > 80 ? 'bg-traffic-red' :
                          spot.congestion > 60 ? 'bg-traffic-yellow' : 'bg-traffic-green'
                        }`}
                        style={{ width: `${spot.congestion}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{spot.congestion}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(spot.status) as any}>
                    {spot.status}
                  </Badge>
                  <div className={`text-sm ${spot.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {spot.change > 0 ? '+' : ''}{spot.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Traffic Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Daily Traffic Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {dailyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="font-medium">{stat.time}</div>
                <div className="flex items-center gap-4 text-sm">
                  <span>Volume: {stat.volume.toLocaleString()}</span>
                  <span>Avg Speed: {stat.avgSpeed} km/h</span>
                  <div className={`px-2 py-1 rounded text-xs ${
                    stat.avgSpeed > 25 ? 'bg-traffic-green text-white' :
                    stat.avgSpeed > 18 ? 'bg-traffic-yellow text-black' : 'bg-traffic-red text-white'
                  }`}>
                    {stat.avgSpeed > 25 ? 'Good' : stat.avgSpeed > 18 ? 'Moderate' : 'Congested'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="font-medium">{day.day}</div>
                <div className="flex items-center gap-4 text-sm">
                  <span>Incidents: {day.incidents}</span>
                  <span>Avg Congestion: {day.avgCongestion}%</span>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        day.avgCongestion > 70 ? 'bg-traffic-red' :
                        day.avgCongestion > 50 ? 'bg-traffic-yellow' : 'bg-traffic-green'
                      }`}
                      style={{ width: `${(day.avgCongestion / 100) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parking Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Government Parking Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Parking Occupancy</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Master Canteen Parking</span>
                  <span>85% (170/200)</span>
                </div>
                <div className="flex justify-between">
                  <span>Secretariat Parking</span>
                  <span>62% (124/200)</span>
                </div>
                <div className="flex justify-between">
                  <span>Station Square Parking</span>
                  <span>78% (156/200)</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Revenue Today</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Collections</span>
                  <span className="font-bold">₹24,580</span>
                </div>
                <div className="flex justify-between">
                  <span>Green Points Redeemed</span>
                  <span>₹3,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Revenue</span>
                  <span className="font-bold text-primary">₹21,380</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { TrafficAnalytics };