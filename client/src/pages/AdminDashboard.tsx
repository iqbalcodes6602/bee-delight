
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminBlogs from "@/components/admin/AdminBlogs";
import AdminCoupons from "@/components/admin/AdminCoupons";
import AdminStats from "@/components/admin/AdminStats";
import AdminReviews from "@/components/admin/AdminReviews";
import { useAuthStore } from "@/stores/authStore";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuthStore();

  // Handle authentication check without early return to avoid hook order issues
  const isAuthorized = isAuthenticated && user?.role === 'admin';

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Admin Dashboard</h1>
          <p className="text-amber-700">Manage your honey store</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="blogs">Blog</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AdminStats />
          </TabsContent>
          
          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="reviews">
            <AdminReviews />
          </TabsContent>
          
          <TabsContent value="blogs">
            <AdminBlogs />
          </TabsContent>
          
          <TabsContent value="coupons">
            <AdminCoupons />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
