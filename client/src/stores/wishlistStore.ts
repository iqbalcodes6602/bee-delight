
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const isAlreadyInWishlist = get().items.some(i => i.id === item.id);
        if (!isAlreadyInWishlist) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter(item => item.id !== id) }));
      },
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage'
    }
  )
);
