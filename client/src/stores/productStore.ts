
import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  badge?: string | null;
  category: string;
  stock: number;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProduct: (id: number) => Product | undefined;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wildflower Raw Honey",
    price: 24.99,
    originalPrice: 29.99,
    image: 'p1.webp',
    rating: 4.8,
    reviews: 127,
    description: "Pure, unfiltered wildflower honey from local beekeepers",
    badge: "Bestseller",
    category: "Raw Honey",
    stock: 45
  },
  {
    id: 2,
    name: "Acacia Honey",
    price: 32.50,
    image: 'p2.webp',
    rating: 4.9,
    reviews: 89,
    description: "Light, delicate acacia honey with floral notes",
    badge: "Premium",
    category: "Premium Honey",
    stock: 23
  },
  {
    id: 3,
    name: "Manuka Honey",
    price: 48.00,
    image: 'p3.png',
    rating: 4.7,
    reviews: 156,
    description: "Authentic Manuka honey with natural antibacterial properties",
    badge: "Premium",
    category: "Premium Honey",
    stock: 12
  }
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: mockProducts,
  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...get().products.map(p => p.id), 0) + 1
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  updateProduct: (id, updatedProduct) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    }));
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    }));
  },
  getProduct: (id) => {
    return get().products.find(product => product.id === id);
  }
}));
