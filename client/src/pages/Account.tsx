import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUserStore } from "@/stores/userStore";
import { useSearchParams } from "react-router-dom";
import { AccountSidebar } from "./sections/AccountSidebar";
import { ProfileTab } from "./sections/ProfileTab";
import { OrdersTab } from "./sections/OrdersTab";
import { WishlistTab } from "./sections/WishlistTab";
import { AddressesTab } from "./sections/AddressesTab";
import { SettingsTab } from "./sections/SettingsTab";

const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get a specific query parameter
  const defaultTab = searchParams.get('tab') || "profile";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { profile, fetchProfile, loading } = useUserStore();
  
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading && !profile) {
    return <div className="min-h-screen bg-amber-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {profile?.name || "Guest"}! Manage your account settings and orders.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              userName={profile?.name}
            />
          </div>

          <div className="lg:col-span-3">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "orders" && <OrdersTab />}
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