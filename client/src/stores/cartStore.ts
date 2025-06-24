
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const existingItemIndex = get().items.findIndex(i => i.id === item.id && i.size === item.size);
        
        if (existingItemIndex >= 0) {
          const newItems = [...get().items];
          newItems[existingItemIndex].quantity += 1;
          const newTotal = get().total + item.price;
          
          set({ items: newItems, total: newTotal });
        } else {
          const newItem = { ...item, quantity: 1 };
          set((state) => ({
            items: [...state.items, newItem],
            total: state.total + item.price
          }));
        }
      },
      removeItem: (id) => {
        const item = get().items.find(i => i.id === id);
        if (item) {
          set((state) => ({
            items: state.items.filter(i => i.id !== id),
            total: state.total - (item.price * item.quantity)
          }));
        }
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        const item = get().items.find(i => i.id === id);
        if (item) {
          const difference = quantity - item.quantity;
          set((state) => ({
            items: state.items.map(i =>
              i.id === id ? { ...i, quantity } : i
            ),
            total: state.total + (item.price * difference)
          }));
        }
      },
      clearCart: () => set({ items: [], total: 0 }),
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0)
    }),
    {
      name: 'cart-storage'
    }
  )
);
