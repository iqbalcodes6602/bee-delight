import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderDetailsDialogProps {
  order: {
    id: string;
    status: string;
    items: OrderItem[];
    total: number;
    trackingNumber?: string;
    deliveryAddress: string;
    createdAt: string;
  };
}

export const OrderDetailsDialog = ({ order }: OrderDetailsDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Order Details - #{order.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">Order Status</h4>
          <p className="text-sm text-gray-600 capitalize">{order.status}</p>
        </div>
        
        <div>
          <h4 className="font-semibold">Order Date</h4>
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold">Items</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <div>
                  <span>• {item.name}</span>
                  <span className="text-xs text-gray-500 block">Qty: {item.quantity}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t pt-2">
          <div className="flex justify-between font-medium">
            <span>Subtotal:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        {order.trackingNumber && (
          <div>
            <h4 className="font-semibold">Tracking Number</h4>
            <p className="text-sm text-gray-600">{order.trackingNumber}</p>
          </div>
        )}
        
        <div>
          <h4 className="font-semibold">Delivery Address</h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {order.deliveryAddress}
          </p>
        </div>
      </div>
    </DialogContent>
  );
};