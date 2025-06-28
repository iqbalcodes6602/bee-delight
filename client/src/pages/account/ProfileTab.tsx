import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface ProfileTabProps {
  profileData: ProfileData;
  onProfileDataChange: (data: ProfileData) => void;
  onUpdate: () => void;
}

export const ProfileTab = ({ profileData, onProfileDataChange, onUpdate }: ProfileTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-900">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => onProfileDataChange({...profileData, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => onProfileDataChange({...profileData, email: e.target.value})}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profileData.phone}
            onChange={(e) => onProfileDataChange({...profileData, phone: e.target.value})}
          />
        </div>
        <Button onClick={onUpdate} className="bg-amber-600 hover:bg-amber-700">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};