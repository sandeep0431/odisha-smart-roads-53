import { Triangle, Circle, Hexagon, Car, Zap, MapPin, Leaf, Star } from "lucide-react";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-radial rounded-full opacity-20 animate-gentle-float blur-xl" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-accent rounded-full opacity-15 animate-bounce-slow blur-lg" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-hero-alt rounded-full opacity-10 animate-float blur-2xl" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/3 animate-float">
        <Triangle className="w-8 h-8 text-nature-green opacity-30 animate-spin-slow" />
      </div>
      <div className="absolute top-1/2 right-1/4 animate-gentle-float delay-1000">
        <Circle className="w-6 h-6 text-primary opacity-25" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 animate-bounce-slow delay-2000">
        <Hexagon className="w-10 h-10 text-accent opacity-20 animate-spin-slow" />
      </div>
      
      {/* Cultural motifs - lotus petals */}
      <div className="absolute top-1/3 right-1/3 animate-drift">
        <Star className="w-5 h-5 text-nature-green-light opacity-30" />
      </div>
      <div className="absolute top-2/3 left-1/2 animate-drift delay-3000">
        <Leaf className="w-7 h-7 text-nature-green opacity-25 animate-gentle-float" />
      </div>
      
      {/* Traffic-themed elements */}
      <div className="absolute top-1/6 right-1/5 animate-drift delay-4000">
        <Car className="w-6 h-6 text-primary opacity-20" />
      </div>
      <div className="absolute bottom-1/4 right-1/3 animate-bounce-slow delay-1500">
        <Zap className="w-5 h-5 text-accent opacity-30" />
      </div>
      <div className="absolute top-3/4 left-1/6 animate-gentle-float delay-2500">
        <MapPin className="w-8 h-8 text-nature-green-dark opacity-25" />
      </div>
      
      {/* Particle system - small dots */}
      <div className="absolute top-1/5 left-1/4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r from-nature-green to-primary rounded-full opacity-40 animate-drift`}
            style={{
              left: `${Math.random() * 100}px`,
              top: `${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Wave patterns */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-nature-green/10 to-transparent animate-wave" />
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-wave delay-3000" />
      
      {/* Subtle background overlay with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-30" />
      <div className="absolute inset-0 bg-gradient-cultural opacity-20" />
    </div>
  );
};

export default AnimatedBackground;