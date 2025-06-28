import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
}

interface UserAddress {
  _id: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

interface UserState {
  profile: UserProfile | null;
  addresses: UserAddress[];
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: { name: string; email: string; phone: string }) => Promise<void>;
  fetchAddresses: () => Promise<void>;
  addAddress: (data: { type: string; address: string; city: string; state: string; zip: string }) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      addresses: [],
      loading: false,
      error: null,

      // Fetch user profile
      fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (res.data.success) {
            set({ profile: res.data.profile });
          }
        } catch (err: Error) {
          set({ error: err.response?.data?.message || 'Failed to fetch profile' });
          console.error('fetchProfile error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Update user profile
      updateProfile: async (data) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.put('http://localhost:5000/api/users/profile', data, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (res.data.success) {
            set({ profile: res.data.profile });
            useToast().toast({
              title: "Profile updated!",
              description: "Your profile information has been successfully updated.",
            });
          }
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to update profile' });
          useToast().toast({
            title: "Error",
            description: "Failed to update profile",
            variant: "destructive"
          });
          console.error('updateProfile error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Fetch user addresses
      fetchAddresses: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.get('http://localhost:5000/api/users/addresses', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (res.data.success) {
            set({ addresses: res.data.addresses });
          }
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to fetch addresses' });
          console.error('fetchAddresses error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Add new address
      addAddress: async (data) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.post('http://localhost:5000/api/users/addresses', data, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (res.data.success) {
            await get().fetchAddresses(); // Refresh addresses
            useToast().toast({
              title: "Address added!",
              description: "New address has been added to your account.",
            });
          }
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to add address' });
          useToast().toast({
            title: "Error",
            description: "Failed to add address",
            variant: "destructive"
          });
          console.error('addAddress error', err);
        } finally {
          set({ loading: false });
        }
      },

      // Delete address
      deleteAddress: async (addressId) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.delete(`http://localhost:5000/api/users/addresses/${addressId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (res.data.success) {
            await get().fetchAddresses(); // Refresh addresses
            useToast().toast({
              title: "Address removed",
              description: "Address has been removed from your account.",
            });
          }
        } catch (err: any) {
          set({ error: err.response?.data?.message || 'Failed to delete address' });
          useToast().toast({
            title: "Error",
            description: "Failed to delete address",
            variant: "destructive"
          });
          console.error('deleteAddress error', err);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        profile: state.profile,
        addresses: state.addresses 
      }),
    }
  )
);