import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string;
  rating: number;
  reviews: number;
  description: string;
  badge?: string | null;
  category: string;
  stock: number;
}

interface ProductState {
  products: Product[];
  fetchProducts: (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => Promise<void>;
  addProduct: (product: Omit<Product, "id" | "rating" | "reviews">) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Promise<Product | undefined>;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,

  fetchProducts: async (params = {}) => {
    try {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams();
      if (params.category && params.category !== "all") query.append("category", params.category);
      if (params.search) query.append("search", params.search);
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.sortOrder) query.append("sortOrder", params.sortOrder);

      const res = await fetch(`${API_BASE}/products?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set({ products: data.products });
      } else {
        console.error("Failed to fetch products", data);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    }
  },

  addProduct: async (product) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => ({
          products: [...state.products, data.product],
        }));
      } else {
        console.error("Failed to add product", data);
      }
    } catch (err) {
      console.error("Error adding product", err);
    }
  },

  updateProduct: async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      } else {
        console.error("Failed to update product", data);
      }
    } catch (err) {
      console.error("Error updating product", err);
    }
  },

  deleteProduct: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      } else {
        console.error("Failed to delete product", data);
      }
    } catch (err) {
      console.error("Error deleting product", err);
    }
  },

  getProduct: async (id: string) => {
    set({ loading: true, error: null, currentProduct: null });
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/products/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        set({ currentProduct: data.product });
        return data.product; // Return the product directly
      } else {
        throw new Error(data.message || "Failed to fetch product");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch product";
      set({ error: errorMessage });
      throw error; // Re-throw the error for component handling
    } finally {
      set({ loading: false });
    }
  }
}));
