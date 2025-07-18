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

const token = localStorage.getItem('token');

export const useCouponStore = create<CouponState>((set, get) => ({
  coupons: [],

  fetchCoupons: async () => {
    const res = await fetch('http://localhost:5000/api/coupons', {
      headers: { Authorization: `Bearer ${token}`},
    });
    const data = await res.json();
    set({ coupons: data.coupons });
  },

  addCoupon: async (coupon) => {
    await fetch('http://localhost:5000/api/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(coupon),
    });
    await get().fetchCoupons();
  },

  updateCoupon: async (id, updatedCoupon) => {
    await fetch(`http://localhost:5000/api/coupons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedCoupon),
    });
    await get().fetchCoupons();
  },

  deleteCoupon: async (id) => {
    await fetch(`http://localhost:5000/api/coupons/${id}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}`
      },
    });
    await get().fetchCoupons();
  },

  validateCoupon: async (code, orderAmount) => {
    const res = await fetch('http://localhost:5000/api/coupons/validate', {
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

  useCoupon: async (code) => {
    await fetch('http://localhost:5000/api/coupons/use', {
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
