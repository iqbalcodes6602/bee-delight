import { create } from 'zustand';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxUses: number | null;
  currentUses: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

interface CouponState {
  coupons: Coupon[];
  fetchCoupons: () => Promise<void>;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'currentUses'>) => Promise<void>;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;
  validateCoupon: (code: string, orderAmount: number) => Promise<{ valid: boolean; discount: number; message: string }>;
  useCoupon: (code: string) => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');

export const useCouponStore = create<CouponState>((set, get) => ({
  coupons: [],

  // Fetch all coupons
  fetchCoupons: async () => {
    const res = await fetch(`${API_BASE_URL}/api/coupons`, {
      headers: { Authorization: `Bearer ${token}`},
    });
    const data = await res.json();
    set({ coupons: data.coupons });
  },

  // Add a new coupon
  addCoupon: async (coupon) => {
    await fetch(`${API_BASE_URL}/api/coupons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(coupon),
    });
    await get().fetchCoupons();
  },

  // Update an existing coupon
  updateCoupon: async (id, updatedCoupon) => {
    await fetch(`${API_BASE_URL}/api/coupons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedCoupon),
    });
    await get().fetchCoupons();
  },

  // Delete a coupon
  deleteCoupon: async (id) => {
    await fetch(`${API_BASE_URL}/api/coupons/${id}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}`
      },
    });
    await get().fetchCoupons();
  },

  // Validate a coupon code against an order amount
  validateCoupon: async (code, orderAmount) => {
    const res = await fetch(`${API_BASE_URL}/api/coupons/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code, orderAmount }),
    });
    const data = await res.json();
    return { valid: data.valid, discount: data.discount, message: data.message };
  },

  // Use a coupon code
  useCoupon: async (code) => {
    await fetch(`${API_BASE_URL}/api/coupons/use`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ code }),
    });
    await get().fetchCoupons();
  },
}));
