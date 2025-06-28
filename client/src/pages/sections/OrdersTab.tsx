import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: string[];
  trackingNumber: string;
  deliveryAddress: string;
}

interface OrdersTabProps {
  orders: Order[];
}

export const OrdersTab = ({ orders, setSearchParams }: OrdersTabProps) => {
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
                <OrderDetailsDialog order={order} />
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};