import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Package, Heart, MapPin, Settings, LogOut, Plus, Eye, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/stores/authStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567"
  });
  const [addresses, setAddresses] = useState([
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
  const [orderDetails, setOrderDetails] = useState<string | null>(null);

  const { user } = useAuthStore();
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const { toast } = useToast();

  const orders = [
    {
      id: "#HH-001234",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: "$67.98",
      items: ["Premium Wildflower Honey (12oz)", "Lavender Infused Honey (8oz)"],
      trackingNumber: "1Z999AA1234567890",
      deliveryAddress: "123 Honey Lane, Sweet Valley, CA 90210"
    },
    {
      id: "#HH-001235",
      date: "Nov 28, 2024",
      status: "Processing",
      total: "$42.99",
      items: ["Raw Clover Honey (16oz)"],
      trackingNumber: "1Z999AA1234567891",
      deliveryAddress: "123 Honey Lane, Sweet Valley, CA 90210"
    }
  ];

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated!",
      description: "Your profile information has been successfully updated.",
    });
  };

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

  const addWishlistToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
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
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <Button onClick={handleProfileUpdate} className="bg-amber-600 hover:bg-amber-700">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        );

      case "orders":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {order.items.join(", ")}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Order Status</h4>
                            <p className="text-sm text-gray-600">{order.status}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Items</h4>
                            <ul className="text-sm text-gray-600">
                              {order.items.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Total</h4>
                            <p className="text-sm text-gray-600">{order.total}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Tracking Number</h4>
                            <p className="text-sm text-gray-600">{order.trackingNumber}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Delivery Address</h4>
                            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "wishlist":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="text-center bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded mb-3">
                        <div className="text-4xl">{item.image}</div>
                      </div>
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-amber-600 font-bold mb-3">${item.price}</p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-amber-600 hover:bg-amber-700"
                          onClick={() => addWishlistToCart(item)}
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "addresses":
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

      case "settings":
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {user?.name || "Guest"}! Manage your account settings and orders.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                          activeTab === item.id
                            ? "bg-amber-100 text-amber-900 border-r-2 border-amber-500"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;
