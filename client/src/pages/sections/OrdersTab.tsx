import { useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useOrderStore } from "@/stores/orderStore";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";

export const OrdersTab = () => {
  const { orders, loading, fetchOrders } = useOrderStore();
  const { user } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.id) {
      fetchOrders(user.id).catch((error) => {
        toast({
          title: "Error",
          description: "Failed to load orders",
          variant: "destructive",
        });
      });
    }
  }, [user?.id, fetchOrders, toast]);

  if (loading && orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-amber-900">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading your orders...</div>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-amber-900">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't placed any orders yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                  <h3 className="font-semibold">#{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "delivered" 
                      ? "bg-green-100 text-green-800" 
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {order.items.map(item => item.name).join(", ")}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <OrderDetailsDialog order={order} />
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};