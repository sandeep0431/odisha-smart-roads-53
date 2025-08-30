import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Fuel, Car, Phone, Award, Trophy, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GamificationPanel = () => {
  const { toast } = useToast();
  
  const currentPoints = 1250;
  const nextLevelPoints = 1500;
  const progress = (currentPoints / nextLevelPoints) * 100;

  const rewards = [
    {
      id: 1,
      title: "₹50 Petrol Voucher",
      points: 500,
      icon: Fuel,
      available: true,
      description: "Redeem at any petrol pump"
    },
    {
      id: 2,
      title: "Toll Discount (20%)",
      points: 300,
      icon: Car,
      available: true,
      description: "Valid for all Fastag tolls"
    },
    {
      id: 3,
      title: "BSNL ₹100 Recharge",
      points: 400,
      icon: Phone,
      available: true,
      description: "Mobile/DTH recharge"
    },
    {
      id: 4,
      title: "Free Parking (1 Day)",
      points: 200,
      icon: Car,
      available: true,
      description: "Government parking lots"
    },
    {
      id: 5,
      title: "₹100 Petrol Voucher",
      points: 800,
      icon: Fuel,
      available: false,
      description: "Premium reward"
    },
    {
      id: 6,
      title: "VIP Parking Pass",
      points: 1000,
      icon: Award,
      available: false,
      description: "Reserved spots access"
    }
  ];

  const achievements = [
    { title: "First Report", description: "Submitted your first incident report", earned: true },
    { title: "Good Citizen", description: "Reported 10 incidents", earned: true },
    { title: "Traffic Helper", description: "Helped with 5 diversions", earned: true },
    { title: "Route Master", description: "Used optimal routes 20 times", earned: false },
    { title: "Community Leader", description: "Earned 2000 Green Points", earned: false }
  ];

  const handleRedeem = (reward: any) => {
    if (currentPoints >= reward.points) {
      toast({
        title: "Reward Redeemed!",
        description: `${reward.title} has been added to your account. Check your email for details.`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - currentPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <Card className="bg-gradient-hero text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{currentPoints} Points</h3>
              <p className="opacity-90">Your Green Points Balance</p>
            </div>
            <Trophy className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to next level</span>
              <span>{currentPoints}/{nextLevelPoints}</span>
            </div>
            <Progress value={progress} className="bg-primary-foreground/20" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className={`w-3 h-3 rounded-full ${achievement.earned ? 'bg-primary' : 'bg-muted'}`} />
                <div className="flex-1">
                  <h4 className={`font-medium ${!achievement.earned && 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Badge variant="secondary">
                    <Award className="h-3 w-3 mr-1" />
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Store */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Rewards Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {rewards.map((reward) => {
              const Icon = reward.icon;
              const canRedeem = currentPoints >= reward.points;
              
              return (
                <Card key={reward.id} className={`${!reward.available && 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{reward.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant={canRedeem ? "default" : "secondary"}>
                            {reward.points} points
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => handleRedeem(reward)}
                            disabled={!reward.available || !canRedeem}
                          >
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card>
        <CardHeader>
          <CardTitle>How to Earn Green Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Report traffic incidents</span>
            <Badge>+10 points</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Upload photo evidence</span>
            <Badge>+5 points</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Follow suggested diversions</span>
            <Badge>+15 points</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Use government parking</span>
            <Badge>+8 points</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Verified accurate reports</span>
            <Badge>+20 points</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { GamificationPanel };