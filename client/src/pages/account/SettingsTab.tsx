import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-900">Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Email Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Order updates and shipping notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Weekly honey tips and recipes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Special offers and promotions</span>
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Change Password</h3>
          <div className="space-y-3">
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
            <Button className="bg-amber-600 hover:bg-amber-700">Update Password</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};