import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OrderDetailsDialogProps {
  order: {
    id: string;
    status: string;
    items: string[];
    total: string;
    trackingNumber: string;
    deliveryAddress: string;
  };
}

export const OrderDetailsDialog = ({ order }: OrderDetailsDialogProps) => {
  return (
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
  );
};