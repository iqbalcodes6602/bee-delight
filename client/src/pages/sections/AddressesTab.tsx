import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/userStore";

export const AddressesTab = () => {
  const { addresses, addAddress, deleteAddress, fetchAddresses } = useUserStore();
  const [newAddress, setNewAddress] = useState({
    type: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

    useEffect(() => {
        fetchAddresses();
    }, []);

  const handleAddAddress = () => {
    addAddress(newAddress);
    setNewAddress({ type: "", address: "", city: "", state: "", zip: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-900">Saved Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address._id} className="border rounded-lg p-4">
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
                  onClick={() => deleteAddress(address._id)}
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
                    id="type"
                    placeholder="e.g. Home, Work, etc."
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="addressLine">Address</Label>
                  <Input 
                    id="address"
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