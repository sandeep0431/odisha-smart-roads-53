import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, AlertTriangle, Award, Car, Bell, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import AnimatedBackground from "@/components/AnimatedBackground";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-500">
      <ThemeToggle />
      
      {/* Hero Section - Green & Saffron Gradient Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <AnimatedBackground />
        
        {/* Enhanced gradient backgrounds with green-saffron theme */}
        <div className="absolute inset-0 bg-gradient-hero opacity-85 animate-gradient-shift bg-[length:200%_200%]"></div>
        <div className="absolute inset-0 bg-gradient-hero-alt opacity-30 animate-gradient-shift bg-[length:300%_300%]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/20"></div>
        
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Main Title with enhanced styling */}
            <h1 className="text-7xl md:text-9xl font-black mb-8 text-primary-foreground drop-shadow-2xl opacity-0 animate-fade-in tracking-wider">
              SAHAJ YATRA
            </h1>
            
            {/* Odia subtitle with fade-in delay */}
            <p className="text-3xl md:text-4xl mb-6 text-primary-foreground/95 font-bold opacity-0 animate-fade-in-delayed">
              ସହଜ ଯାତ୍ରା
            </p>
            
            {/* Description with enhanced styling */}
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/85 max-w-3xl mx-auto leading-relaxed font-medium opacity-0 animate-fade-in-delayed">
              "ପ୍ରତିଦିନର ଯାତ୍ରା, ଏବେ ସହଜ ଓ ସୁଗମ"<br />
              <span className="text-primary-foreground/90 text-lg md:text-xl">Making Odisha's Roads Stress-Free</span>
            </p>
            
            {/* Redesigned button section to match uploaded image */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in-delayed">
              <Link to="/citizen" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-xl px-12 py-8 bg-background text-foreground hover:bg-background/90 shadow-warm hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:animate-pulse-glow font-semibold rounded-xl border-2 border-background/20"
                >
                  <Navigation className="mr-3 h-6 w-6" />
                  Citizen Portal
                </Button>
              </Link>
              <Link to="/government" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto text-xl px-12 py-8 bg-transparent text-primary-foreground border-2 border-primary-foreground/80 hover:bg-primary-foreground hover:text-primary shadow-warm hover:shadow-glow transition-all duration-500 transform hover:scale-105 font-semibold rounded-xl backdrop-blur-sm"
                >
                  <Car className="mr-3 h-6 w-6" />
                  Government Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with animations */}
      <section className="py-24 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-foreground bg-gradient-to-r from-nature-green to-primary bg-clip-text text-transparent">
              Smart Traffic Management Features
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience seamless traffic management with real-time updates and cultural integration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-warm transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20 group">
              <CardContent className="p-8 text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Live Traffic Updates</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Real-time road conditions with color-coded traffic status throughout Odisha
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft hover:shadow-warm transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20 group">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-16 w-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Incident Reporting</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Report accidents, traffic jams, and road diversions with photo uploads
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft hover:shadow-warm transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20 group">
              <CardContent className="p-8 text-center">
                <Award className="h-16 w-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Green Points Rewards</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Earn points for good traffic behavior and redeem for petrol, tolls, and parking
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft hover:shadow-warm transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20 group">
              <CardContent className="p-8 text-center">
                <Car className="h-16 w-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Smart Parking</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Find available parking spots and get government-verified parking information
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft hover:shadow-warm transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20 group">
              <CardContent className="p-8 text-center">
                <Bell className="h-16 w-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Odia Voice Alerts</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Festival notifications, VIP movements, and diversions in Odia and English
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft hover:shadow-warm transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20 group">
              <CardContent className="p-8 text-center">
                <Navigation className="h-16 w-16 text-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Cultural Integration</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Special management for Rath Yatra, festivals, and cultural events in Odisha
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced with dark mode support */}
      <footer className="bg-primary/90 backdrop-blur-sm text-primary-foreground py-16 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
            SAHAJ YATRA
          </h3>
          <p className="text-xl mb-6 font-medium">Smart Traffic Management for Modern Odisha</p>
          <p className="text-primary-foreground/90 text-lg">
            Government of Odisha | Department of Transport
          </p>
          <div className="mt-8 pt-6 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/70 text-sm">
              © 2024 SAHAJ YATRA. Making roads safer and journeys smoother.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;