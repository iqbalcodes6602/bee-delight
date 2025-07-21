import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface CartItem {
  id: string;  // note: backend uses string ObjectId
  name: string;
  price: number;
  images: Array<string>;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity: number, size?: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      // fetch entire cart from backend
      fetchCart: async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (res.data.success) {
            const cart = res.data.cart;
            set({
              items: cart.items,
              total: cart.total
            });
          }
        } catch (err) {
          console.error("fetchCart error", err);
        }
      },

      // add item
      addItem: async (product, quantity, size) => {
        try {
          await axios.post(
            `${API_BASE_URL}/api/cart/items`,
            { productId: product.id, quantity, size },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );
          // after adding, re-fetch
          await get().fetchCart();
        } catch (err) {
          console.error("addItem error", err);
        }
      },

      // update quantity
      updateQuantity: async (id, quantity) => {
        try {
          await axios.put(
            `${API_BASE_URL}api/cart/items/${id}`,
            { quantity },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );
          await get().fetchCart();
        } catch (err) {
          console.error("updateQuantity error", err);
        }
      },

      // remove
      removeItem: async (id) => {
        try {
          await axios.delete(
            `${API_BASE_URL}/api/cart/items/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );
          await get().fetchCart();
        } catch (err) {
          console.error("removeItem error", err);
        }
      },

      // calculate total
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      // clear
      clearCart: async () => {
        try {
          await axios.delete(
            `${API_BASE_URL}/api/cart`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );
          await get().fetchCart();
        } catch (err) {
          console.error("clearCart error", err);
        }
      },
    }),
    {
      name: 'cart-storage-sync'
    }
  )
);
