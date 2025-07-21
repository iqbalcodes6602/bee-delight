// stores/wishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  images: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isInWishlist: (id: string) => boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      
      // Fetch wishlist items from backend
      fetchWishlist: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            set({ items: data.items });
          } else {
            throw new Error('Failed to fetch wishlist');
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
          set({ loading: false });
        }
      },
      
      // Add item to wishlist
      addItem: async (product: any) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/api/wishlist/items`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({productId: product.id})
          });
          const data = await response.json();
          if (!data.success) {
            throw new Error(data.message || 'Failed to add item');
          }
          await get().fetchWishlist(); // Refresh the wishlist
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
          set({ loading: false });
        }
      },

      // Remove item from wishlist
      removeItem: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/api/wishlist/items/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (!data.success) {
            throw new Error(data.message || 'Failed to remove item');
          }
          set(state => ({
            items: state.items.filter(item => item.id !== id)
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
          set({ loading: false });
        }
      },
      
      // Clear wishlist
      clearWishlist: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (!data.success) {
            throw new Error(data.message || 'Failed to clear wishlist');
          }
          set({ items: [] });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
          set({ loading: false });
        }
      },
      
      // Check if item is in wishlist
      isInWishlist: (id: string) => {
        return get().items.some(item => item.id === id);
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
);