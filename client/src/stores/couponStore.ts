
import { create } from 'zustand';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxUses: number;
  currentUses: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

interface CouponState {
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'currentUses'>) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  getCoupon: (code: string) => Coupon | undefined;
  validateCoupon: (code: string, orderAmount: number) => { valid: boolean; discount: number; message: string };
  useCoupon: (code: string) => void;
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'HONEY20',
    description: '20% off on all honey products',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 50,
    maxUses: 100,
    currentUses: 25,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z',
    isActive: true
  },
  {
    id: '2',
    code: 'SAVE10',
    description: '$10 off on orders above $75',
    discountType: 'fixed',
    discountValue: 10,
    minOrderAmount: 75,
    maxUses: 50,
    currentUses: 12,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z',
    isActive: true
  }
];

export const useCouponStore = create<CouponState>((set, get) => ({
  coupons: mockCoupons,
  addCoupon: (coupon) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
      currentUses: 0
    };
    set((state) => ({ coupons: [...state.coupons, newCoupon] }));
  },
  updateCoupon: (id, updatedCoupon) => {
    set((state) => ({
      coupons: state.coupons.map(coupon =>
        coupon.id === id ? { ...coupon, ...updatedCoupon } : coupon
      )
    }));
  },
  deleteCoupon: (id) => {
    set((state) => ({
      coupons: state.coupons.filter(coupon => coupon.id !== id)
    }));
  },
  getCoupon: (code) => {
    return get().coupons.find(coupon => coupon.code.toLowerCase() === code.toLowerCase());
  },
  validateCoupon: (code, orderAmount) => {
    const coupon = get().getCoupon(code);
    
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid coupon code' };
    }
    
    if (!coupon.isActive) {
      return { valid: false, discount: 0, message: 'Coupon is not active' };
    }
    
    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validTo = new Date(coupon.validTo);
    
    if (now < validFrom || now > validTo) {
      return { valid: false, discount: 0, message: 'Coupon has expired or not yet valid' };
    }
    
    if (coupon.currentUses >= coupon.maxUses) {
      return { valid: false, discount: 0, message: 'Coupon usage limit exceeded' };
    }
    
    if (orderAmount < coupon.minOrderAmount) {
      return { valid: false, discount: 0, message: `Minimum order amount is $${coupon.minOrderAmount}` };
    }
    
    const discount = coupon.discountType === 'percentage' 
      ? (orderAmount * coupon.discountValue) / 100
      : coupon.discountValue;
    
    return { valid: true, discount, message: 'Coupon applied successfully!' };
  },
  useCoupon: (code) => {
    const coupon = get().getCoupon(code);
    if (coupon) {
      set((state) => ({
        coupons: state.coupons.map(c =>
          c.id === coupon.id ? { ...c, currentUses: c.currentUses + 1 } : c
        )
      }));
    }
  }
}));
