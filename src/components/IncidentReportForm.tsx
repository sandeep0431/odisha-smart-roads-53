import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Camera, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IncidentReportForm = () => {
  const [incidentType, setIncidentType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission
    toast({
      title: "Incident Reported Successfully!",
      description: `${incidentType} reported at ${location}. You earned 10 Green Points!`,
    });
    
    // Reset form
    setIncidentType("");
    setLocation("");
    setDescription("");
    setPhoto(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="incident-type">Incident Type</Label>
        <Select value={incidentType} onValueChange={setIncidentType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select incident type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accident">Traffic Accident</SelectItem>
            <SelectItem value="jam">Traffic Jam</SelectItem>
            <SelectItem value="signal">Broken Traffic Signal</SelectItem>
            <SelectItem value="crowd">Heavy Crowd</SelectItem>
            <SelectItem value="diversion">Road Diversion</SelectItem>
            <SelectItem value="pothole">Road Damage/Pothole</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <div className="flex gap-2">
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location or landmark"
            required
          />
          <Button type="button" variant="outline" size="icon">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the incident in detail..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="photo">Photo Evidence (Optional)</Label>
        <div className="mt-2">
          <label htmlFor="photo" className="cursor-pointer">
            <Card className="border-dashed border-2 p-6 text-center hover:bg-muted/50 transition-colors">
              <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {photo ? photo.name : "Click to upload photo"}
              </p>
            </Card>
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Reward Information:</h4>
        <p className="text-sm text-muted-foreground">
          • Report incidents: +10 Green Points<br />
          • Upload photo evidence: +5 bonus points<br />
          • Verified report: +15 additional points
        </p>
      </div>

      <Button type="submit" className="w-full">
        <Send className="h-4 w-4 mr-2" />
        Submit Report
      </Button>
    </form>
  );
};

export { IncidentReportForm };