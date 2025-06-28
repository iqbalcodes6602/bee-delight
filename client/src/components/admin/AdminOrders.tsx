
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useOrderStore } from "@/stores/orderStore";
import { useToast } from "@/hooks/use-toast";
import { Eye, Package } from "lucide-react";

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrderStore();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleStatusChange = (order, newStatus: string) => {
    updateOrderStatus(order.id, newStatus as any);
    order.status = newStatus; // Update local state for immediate feedback
    toast({ title: `Order status updated to ${newStatus}` });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Orders</h3>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p className="text-sm text-gray-500">{order.shippingAddress.email}</p>
                  </div>
                </TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                          <DialogDescription>View and manage order information</DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            {/* Customer Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Customer Information</h4>
                              <p><strong>Name:</strong> {selectedOrder.shippingAddress.name}</p>
                              <p><strong>Email:</strong> {selectedOrder.shippingAddress.email}</p>
                              <p><strong>Address:</strong> {selectedOrder.shippingAddress.address}</p>
                              <p><strong>City:</strong> {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.zipCode}</p>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold mb-2">Order Items</h4>
                              <div className="space-y-2">
                                {selectedOrder.items.map((item: any, index: number) => (
                                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 p-2 bg-amber-50 rounded font-bold text-lg">
                                Total: ${selectedOrder.total.toFixed(2)}
                              </div>
                            </div>

                            {/* Status Update */}
                            <div>
                              <h4 className="font-semibold mb-2">Update Status</h4>
                              <div className="flex space-x-2">
                                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                  <Button
                                    key={status}
                                    size="sm"
                                    variant={selectedOrder.status === status ? "default" : "outline"}
                                    onClick={() => handleStatusChange(selectedOrder, status)}
                                  >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;
