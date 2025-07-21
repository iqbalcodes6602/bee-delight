import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images?: Array<string>;
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
  trackingNumber?: string;
}

interface OrderState {
  orders: Order[];
  adminOrders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: (userId: string) => Promise<void>;
  fetchAdminOrders: () => Promise<void>;
  getOrder: (orderId: string) => Promise<Order | null>;
  createOrder: (
    items: OrderItem[],
    total: number,
    shippingAddress: any,
    couponCode?: string
  ) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      adminOrders: [],
      loading: false,
      error: null,

      // Fetch user orders
      fetchAdminOrders: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const response = await axios.get(`${API_BASE_URL}/api/admin/orders`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            set({ adminOrders: response.data.orders });
          }
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Failed to fetch orders' });
          useToast().toast({
            title: "Error",
            description: "Failed to load your orders",
            variant: "destructive"
          });
        } finally {
          set({ loading: false });
        }
      },

      // Fetch user orders
      fetchOrders: async (userId) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const response = await axios.get(`${API_BASE_URL}/api/orders`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            set({ orders: response.data.orders });
          }
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Failed to fetch orders' });
          useToast().toast({
            title: "Error",
            description: "Failed to load your orders",
            variant: "destructive"
          });
        } finally {
          set({ loading: false });
        }
      },

      // Get a specific order by ID
      getOrder: async (orderId) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return null;

          const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            return response.data.order;
          }
          return null;
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Failed to fetch order' });
          useToast().toast({
            title: "Error",
            description: "Failed to load order details",
            variant: "destructive"
          });
          return null;
        } finally {
          set({ loading: false });
        }
      },

      // Create a new order
      createOrder: async (items, total, shippingAddress, couponCode) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No authentication token found');

          const response = await axios.post(
            `${API_BASE_URL}/api/orders`,
            {
              items,
              total,
              shippingAddress,
              couponCode
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.data.success) {
            // Add the new order to local state
            const newOrder = {
              id: response.data.order.id,
              userId: response.data.order.userId,
              items,
              total: response.data.order.total,
              status: 'pending',
              createdAt: new Date().toISOString(),
              shippingAddress
            };

            set((state) => ({
              orders: [...state.orders, newOrder]
            }));

            useToast().toast({
              title: "Order placed!",
              description: `Your order #${response.data.order.id} has been placed.`,
            });

            return response.data.order.id;
          }
          throw new Error('Failed to create order');
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Failed to create order' });
          useToast().toast({
            title: "Error",
            description: error.response?.data?.message || 'Failed to place order',
            variant: "destructive"
          });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      // Update order status
      updateOrderStatus: async (orderId, status) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No authentication token found');

          const response = await axios.put(
            `${API_BASE_URL}/api/orders/${orderId}/status`,
            { status },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.data.success) {
            set((state) => ({
              orders: state.orders.map(order =>
                order.id === orderId ? { ...order, status } : order
              )
            }));
          }
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Failed to update order status' });
          useToast().toast({
            title: "Error",
            description: "Failed to update order status",
            variant: "destructive"
          });
          throw error;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);