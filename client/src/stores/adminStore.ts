import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: any[];
  popularProducts: any[];
  monthlyRevenue: any[];
}

interface AdminState {
  users: AdminUser[];
  orders: Order[];
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  updateUser: (id: string, data: { role: 'admin' | 'user'; isActive: boolean }) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchStats: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      users: [],
      orders: [],
      stats: null,
      loading: false,
      error: null,

      // Fetch all users
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.get(`${API_BASE_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) set({ users: res.data.users });
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to fetch users' });
          console.error('fetchUsers error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Update user details
      updateUser: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          await axios.put(`${API_BASE_URL}/api/admin/users/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          useToast().toast({
            title: 'User updated!',
            description: 'User details have been updated successfully.',
          });
          await get().fetchUsers();
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to update user' });
          useToast().toast({
            title: 'Error',
            description: 'Failed to update user',
            variant: 'destructive',
          });
          console.error('updateUser error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Delete a user
      deleteUser: async (id) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          await axios.delete(`${API_BASE_URL}/api/admin/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          useToast().toast({
            title: 'User deleted!',
            description: 'User has been removed successfully.',
          });
          await get().fetchUsers();
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to delete user' });
          useToast().toast({
            title: 'Error',
            description: 'Failed to delete user',
            variant: 'destructive',
          });
          console.error('deleteUser error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Fetch all orders
      fetchOrders: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.get(`${API_BASE_URL}/api/admin/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) set({ orders: res.data.orders });
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to fetch orders' });
          console.error('fetchOrders error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Fetch admin stats
      fetchStats: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) set({ stats: res.data.stats });
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to fetch stats' });
          console.error('fetchStats error', err);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        users: state.users,
        orders: state.orders,
        stats: state.stats,
      }),
    }
  )
);
