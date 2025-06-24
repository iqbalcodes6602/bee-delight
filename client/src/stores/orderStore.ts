
import { create } from 'zustand';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getUserOrders: (userId: string) => Order[];
  getOrder: (id: string) => Order | undefined;
}

const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: '2',
    items: [
      { id: 1, name: 'Wildflower Raw Honey', price: 24.99, quantity: 2 },
      { id: 2, name: 'Acacia Honey', price: 32.50, quantity: 1 }
    ],
    total: 82.48,
    status: 'delivered',
    createdAt: '2024-06-10T10:30:00Z',
    shippingAddress: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001'
    }
  },
  {
    id: 'order-2',
    userId: '2',
    items: [
      { id: 3, name: 'Manuka Honey', price: 48.00, quantity: 1 }
    ],
    total: 48.00,
    status: 'shipped',
    createdAt: '2024-06-14T15:45:00Z',
    shippingAddress: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001'
    }
  }
];

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: mockOrders,
  addOrder: (order) => {
    const newOrder = {
      ...order,
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    set((state) => ({ orders: [...state.orders, newOrder] }));
    return newOrder.id;
  },
  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === id ? { ...order, status } : order
      )
    }));
  },
  getUserOrders: (userId) => {
    return get().orders.filter(order => order.userId === userId);
  },
  getOrder: (id) => {
    return get().orders.find(order => order.id === id);
  }
}));
