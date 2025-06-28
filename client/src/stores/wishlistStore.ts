// stores/wishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
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

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      
      fetchWishlist: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('http://localhost:5000/api/wishlist', {
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
      
      addItem: async (product: any) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('http://localhost:5000/api/wishlist/items', {
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
      
      removeItem: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`http://localhost:5000/api/wishlist/items/${id}`, {
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
      
      clearWishlist: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('http://localhost:5000/api/wishlist', {
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
      
      isInWishlist: (id: string) => {
        return get().items.some(item => item.id === id);
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
);