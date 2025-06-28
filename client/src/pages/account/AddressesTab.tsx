import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: number;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export const AddressesTab = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      address: "123 Honey Lane",
      city: "Sweet Valley",
      state: "CA",
      zip: "90210",
      isDefault: true
    }
  ]);
  const [newAddress, setNewAddress] = useState({
    type: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });
  const { toast } = useToast();

  const handleAddAddress = () => {
    if (newAddress.type && newAddress.address && newAddress.city && newAddress.state && newAddress.zip) {
      const address = {
        id: Date.now(),
        ...newAddress,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, address]);
      setNewAddress({ type: "", address: "", city: "", state: "", zip: "" });
      toast({
        title: "Address added!",
        description: "New address has been added to your account.",
      });
    }
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Address removed",
      description: "Address has been removed from your account.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-900">Saved Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{address.type} {address.isDefault && "(Default)"}</h3>
                  <p className="text-gray-600">
                    {address.address}<br />
                    {address.city}, {address.state} {address.zip}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeAddress(address.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="addressType">Address Type</Label>
                  <Input 
                    id="addressType"
                    placeholder="e.g. Home, Work, etc."
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="addressLine">Address</Label>
                  <Input 
                    id="addressLine"
                    placeholder="Street address"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input 
                    id="zip"
                    placeholder="ZIP Code"
                    value={newAddress.zip}
                    onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddAddress} className="w-full bg-amber-600 hover:bg-amber-700">
                  Add Address
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};