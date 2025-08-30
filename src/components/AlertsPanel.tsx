import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Volume2, Calendar, MapPin, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AlertsPanel = () => {
  const { toast } = useToast();

  const alerts = [
    {
      id: 1,
      type: "festival",
      title: "Rath Yatra Festival",
      titleOdia: "ରଥଯାତ୍ରା ପର୍ବ",
      message: "Special traffic arrangements in place for Rath Yatra. Avoid Bada Danda area from 6 AM to 8 PM.",
      messageOdia: "ରଥଯାତ୍ରା ପାଇଁ ବିଶେଷ ଯାତାୟାତ ବ୍ୟବସ୍ଥା। ସକାଳ ୬ଟାରୁ ସନ୍ଧ୍ୟା ୮ଟା ପର୍ଯ୍ୟନ୍ତ ବଡ଼ଦଣ୍ଡ ଅଞ୍ଚଳକୁ ଯିବାକୁ ଏଡ଼ାନ୍ତୁ।",
      time: "2 hours ago",
      priority: "high",
      location: "Puri, Bada Danda"
    },
    {
      id: 2,
      type: "diversion",
      title: "Road Diversion Alert",
      titleOdia: "ସଡ଼କ ଅନ୍ୟପଥ ସତର୍କତା",
      message: "Due to construction work, traffic diverted from Master Canteen to Station Square via IRC Village.",
      messageOdia: "ନିର୍ମାଣ କାର୍ଯ୍ୟ କାରଣରୁ ମାଷ୍ଟର କ୍ୟାଣ୍ଟିନରୁ ଷ୍ଟେସନ ସ୍କୋୟାର ପର୍ଯ୍ୟନ୍ତ ଯାତାୟାତ IRC ଗ୍ରାମ ଦେଇ ଯିବ।",
      time: "30 minutes ago",
      priority: "medium",
      location: "Master Canteen to Station Square"
    },
    {
      id: 3,
      type: "vip",
      title: "VIP Movement",
      titleOdia: "ଭିଆଇପି ଗତିବିଧି",
      message: "VIP movement expected on Rajpath from 3 PM to 5 PM. Traffic may be slower than usual.",
      messageOdia: "ଅପରାହ୍ନ ୩ଟାରୁ ୫ଟା ପର୍ଯ୍ୟନ୍ତ ରାଜପଥରେ ଭିଆଇପି ଗତିବିଧି। ଯାତାୟାତ ସାଧାରଣ ଠାରୁ ଧୀର ହୋଇପାରେ।",
      time: "1 hour ago",
      priority: "high",
      location: "Rajpath, Bhubaneswar"
    },
    {
      id: 4,
      type: "weather",
      title: "Heavy Rain Alert",
      titleOdia: "ପ୍ରବଳ ବର୍ଷା ସତର୍କତା",
      message: "Heavy rainfall expected. Drive carefully and avoid waterlogged areas near Rasulgarh.",
      messageOdia: "ପ୍ରବଳ ବର୍ଷା ହେବ। ସତର୍କତାର ସହ ଗାଡ଼ି ଚଲାନ୍ତୁ ଓ ରସୁଳଗଡ଼ ନିକଟରେ ଜଳବନ୍ଦି ଅଞ୍ଚଳକୁ ଏଡ଼ାନ୍ତୁ।",
      time: "45 minutes ago",
      priority: "medium",
      location: "Citywide"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "festival": return Calendar;
      case "diversion": return MapPin;
      case "vip": return AlertTriangle;
      case "weather": return Info;
      default: return Bell;
    }
  };

  const playVoiceAlert = (message: string, messageOdia: string) => {
    toast({
      title: "Voice Alert Playing",
      description: "Playing alert in Odia and English",
    });
    
    // In a real app, this would use Text-to-Speech
    console.log("Playing voice alert:", message, messageOdia);
  };

  return (
    <div className="space-y-6">
      {/* Voice Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Voice Alert Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Odia Voice Alerts</h4>
              <p className="text-sm text-muted-foreground">Receive alerts in Odia language</p>
            </div>
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Test Voice
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">English Voice Alerts</h4>
              <p className="text-sm text-muted-foreground">Receive alerts in English language</p>
            </div>
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Test Voice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Active Government Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => {
            const TypeIcon = getTypeIcon(alert.type);
            
            return (
              <Card key={alert.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TypeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge variant={getPriorityColor(alert.priority) as any}>
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {alert.titleOdia}
                      </p>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-sm text-muted-foreground italic">
                        {alert.messageOdia}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                        <span>{alert.time}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playVoiceAlert(alert.message, alert.messageOdia)}
                        className="mt-2"
                      >
                        <Volume2 className="h-3 w-3 mr-2" />
                        Play Voice Alert
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Alert Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Festival & Cultural Events
            </span>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Road Diversions
            </span>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              VIP Movements
            </span>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Weather & Emergency
            </span>
            <Badge variant="secondary">Active</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { AlertsPanel };