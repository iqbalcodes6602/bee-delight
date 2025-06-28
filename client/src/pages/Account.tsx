import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";
import { AccountSidebar } from "./account/AccountSidebar";
import { ProfileTab } from "./account/ProfileTab";
import { OrdersTab } from "./account/OrdersTab";
import { WishlistTab } from "./account/WishlistTab";
import { AddressesTab } from "./account/AddressesTab";
import { SettingsTab } from "./account/SettingsTab";

const Account = () => {
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
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567"
  });
  
  const { user } = useAuthStore();
  const { toast } = useToast();

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated!",
      description: "Your profile information has been successfully updated.",
    });
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
          <div className="lg:col-span-1">
            <AccountSidebar
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              userName={user?.name}
            />
          </div>

          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <ProfileTab
                profileData={profileData}
                onProfileDataChange={setProfileData}
                onUpdate={handleProfileUpdate}
              />
            )}
            
            {activeTab === "orders" && <OrdersTab orders={orders} />}
            {activeTab === "wishlist" && <WishlistTab />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;