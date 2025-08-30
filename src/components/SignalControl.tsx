import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Lightbulb, 
  Clock, 
  Users, 
  MapPin, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  AlertTriangle,
  Bot,
  Hand,
  Eye,
  Timer,
  Plus,
  Minus,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";

const SignalControl = () => {
  const [aiMode, setAiMode] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [selectedIntersection, setSelectedIntersection] = useState<string | null>(null);

  // Real-time signal data
  const [signals, setSignals] = useState([
    {
      id: "MC001",
      location: "Master Canteen Square",
      currentPhase: "green",
      timeRemaining: 45,
      crowdDensity: 85,
      trafficVolume: 3200,
      status: "active",
      aiRecommendation: "extend_green",
      manualOverride: false,
      phases: {
        red: { duration: 60, remaining: 0 },
        yellow: { duration: 5, remaining: 0 },
        green: { duration: 50, remaining: 45 }
      }
    },
    {
      id: "RS001",
      location: "Rajpath - Sishu Bhawan",
      currentPhase: "red",
      timeRemaining: 25,
      crowdDensity: 72,
      trafficVolume: 2800,
      status: "active",
      aiRecommendation: "maintain",
      manualOverride: false,
      phases: {
        red: { duration: 55, remaining: 25 },
        yellow: { duration: 5, remaining: 0 },
        green: { duration: 45, remaining: 0 }
      }
    },
    {
      id: "SS001",
      location: "Station Square",
      currentPhase: "yellow",
      timeRemaining: 3,
      crowdDensity: 68,
      trafficVolume: 2500,
      status: "active",
      aiRecommendation: "adjust_timing",
      manualOverride: false,
      phases: {
        red: { duration: 50, remaining: 0 },
        yellow: { duration: 5, remaining: 3 },
        green: { duration: 40, remaining: 0 }
      }
    },
    {
      id: "RG001",
      location: "Rasulgarh Square",
      currentPhase: "green",
      timeRemaining: 32,
      crowdDensity: 58,
      trafficVolume: 1900,
      status: "active",
      aiRecommendation: "reduce_green",
      manualOverride: false,
      phases: {
        red: { duration: 45, remaining: 0 },
        yellow: { duration: 4, remaining: 0 },
        green: { duration: 35, remaining: 32 }
      }
    },
    {
      id: "JV001",
      location: "Jaydev Vihar",
      currentPhase: "red",
      timeRemaining: 18,
      crowdDensity: 45,
      trafficVolume: 1500,
      status: "active",
      aiRecommendation: "maintain",
      manualOverride: false,
      phases: {
        red: { duration: 40, remaining: 18 },
        yellow: { duration: 4, remaining: 0 },
        green: { duration: 30, remaining: 0 }
      }
    }
  ]);

  // AI Performance metrics
  const aiStats = {
    avgWaitTimeReduction: 23,
    trafficFlowImprovement: 18,
    fuelSavings: 15,
    emissionReduction: 12,
    interventionsToday: 47,
    successRate: 94
  };

  // Emergency scenarios
  const emergencyScenarios = [
    { type: "ambulance", location: "Master Canteen Square", eta: "2 min" },
    { type: "fire_truck", location: "Station Square", eta: "5 min" }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => prev.map(signal => ({
        ...signal,
        timeRemaining: signal.timeRemaining > 0 ? signal.timeRemaining - 1 : 
          signal.currentPhase === 'red' ? signal.phases.yellow.duration :
          signal.currentPhase === 'yellow' ? signal.phases.green.duration :
          signal.phases.red.duration,
        currentPhase: signal.timeRemaining <= 1 ? 
          (signal.currentPhase === 'red' ? 'green' :
           signal.currentPhase === 'green' ? 'yellow' : 'red') : signal.currentPhase
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCrowdDensityColor = (density: number) => {
    if (density > 80) return 'text-red-600';
    if (density > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'extend_green': return { text: 'Extend Green', variant: 'default' as const };
      case 'reduce_green': return { text: 'Reduce Green', variant: 'secondary' as const };
      case 'adjust_timing': return { text: 'Adjust Timing', variant: 'outline' as const };
      default: return { text: 'Maintain', variant: 'secondary' as const };
    }
  };

  const adjustSignalTiming = (signalId: string, phase: string, adjustment: number) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId 
        ? {
            ...signal,
            phases: {
              ...signal.phases,
              [phase]: {
                ...signal.phases[phase as keyof typeof signal.phases],
                duration: Math.max(5, signal.phases[phase as keyof typeof signal.phases].duration + adjustment)
              }
            },
            manualOverride: true
          }
        : signal
    ));
  };

  const toggleManualOverride = (signalId: string) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId 
        ? { ...signal, manualOverride: !signal.manualOverride }
        : signal
    ));
  };

  return (
    <div className="space-y-6">
      {/* Control Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Signal Control Center</h2>
          </div>
          <Badge variant={aiMode ? "default" : "secondary"} className="flex items-center gap-1">
            {aiMode ? <Bot className="h-3 w-3" /> : <Hand className="h-3 w-3" />}
            {aiMode ? "AI Mode" : "Manual Mode"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">AI Control</span>
            <Switch 
              checked={aiMode} 
              onCheckedChange={setAiMode}
            />
          </div>
          <Button 
            variant={emergencyMode ? "destructive" : "outline"}
            onClick={() => setEmergencyMode(!emergencyMode)}
            className="flex items-center gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            Emergency Mode
          </Button>
        </div>
      </div>

      {/* AI Performance Dashboard */}
      {aiMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Performance Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">-{aiStats.avgWaitTimeReduction}%</div>
                <div className="text-xs text-muted-foreground">Avg Wait Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">+{aiStats.trafficFlowImprovement}%</div>
                <div className="text-xs text-muted-foreground">Traffic Flow</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">-{aiStats.fuelSavings}%</div>
                <div className="text-xs text-muted-foreground">Fuel Consumption</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">-{aiStats.emissionReduction}%</div>
                <div className="text-xs text-muted-foreground">Emissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{aiStats.interventionsToday}</div>
                <div className="text-xs text-muted-foreground">Interventions Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{aiStats.successRate}%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Alerts */}
      {emergencyScenarios.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Emergency Vehicle Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {emergencyScenarios.map((emergency, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-red-950/30 rounded border border-red-200 dark:border-red-500/30">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="font-medium">{emergency.type.replace('_', ' ').toUpperCase()}</span>
                    <span className="text-muted-foreground">{emergency.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">ETA: {emergency.eta}</span>
                    <Button size="sm" variant="destructive">
                      Priority Green
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Signal Status Grid */}
      <div className="grid gap-6">
        {signals.map((signal) => (
          <Card key={signal.id} className={`${signal.manualOverride ? 'border-orange-200 bg-orange-50 dark:bg-orange-500/10 dark:border-orange-400/30' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {signal.location}
                  <Badge variant="outline">{signal.id}</Badge>
                  {signal.manualOverride && (
                    <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-400/40">
                      Manual Override
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleManualOverride(signal.id)}
                  >
                    {signal.manualOverride ? <Bot className="h-4 w-4" /> : <Hand className="h-4 w-4" />}
                    {signal.manualOverride ? "Auto" : "Manual"}
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedIntersection === signal.id ? "default" : "outline"}
                    onClick={() => setSelectedIntersection(selectedIntersection === signal.id ? null : signal.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {/* Current Signal Status */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Current Signal
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${getPhaseColor(signal.currentPhase)} flex items-center justify-center`}>
                      <div className="w-4 h-4 rounded-full bg-white/80"></div>
                    </div>
                    <div>
                      <div className="font-medium capitalize">{signal.currentPhase}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {signal.timeRemaining}s remaining
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traffic Data */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Live Data
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Crowd Density</span>
                      <span className={`text-sm font-medium ${getCrowdDensityColor(signal.crowdDensity)}`}>
                        {signal.crowdDensity}%
                      </span>
                    </div>
                    <Progress value={signal.crowdDensity} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Traffic Volume</span>
                      <span className="text-sm font-medium">{signal.trafficVolume.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    AI Analysis
                  </h4>
                  <div className="space-y-2">
                    <Badge {...getRecommendationBadge(signal.aiRecommendation)}>
                      {getRecommendationBadge(signal.aiRecommendation).text}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Based on crowd density and traffic patterns
                    </div>
                  </div>
                </div>

                {/* Phase Timings */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Phase Timings
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(signal.phases).map(([phase, data]) => (
                      <div key={phase} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getPhaseColor(phase)}`}></div>
                          <span className="text-sm capitalize">{phase}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {signal.manualOverride && (
                            <>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() => adjustSignalTiming(signal.id, phase, -5)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          <span className="text-sm font-medium w-8 text-center">
                            {data.duration}s
                          </span>
                          {signal.manualOverride && (
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6"
                              onClick={() => adjustSignalTiming(signal.id, phase, 5)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Controls */}
              {selectedIntersection === signal.id && (
                <>
                  <Separator className="my-4" />
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Quick Actions</h5>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Play className="h-4 w-4 mr-2" />
                          Force Green
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Pause className="h-4 w-4 mr-2" />
                          Hold Current
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Optimize Cycle
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Schedule</h5>
                      <div className="text-sm text-muted-foreground">
                        No scheduled overrides
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Performance</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Efficiency</span>
                          <span className="text-green-600">+12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Wait Time</span>
                          <span className="text-green-600">-8s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Zone Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pedestrian Priority
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Rush Hour Mode
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Emergency Clear
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Optimize All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SignalControl };