import { create } from 'zustand';
import axios from 'axios';

interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewState {
  reviews: Review[];
  fetchReviews: (productId: string) => Promise<void>;
  fetchAllReviews: () => Promise<void>;
  addReview: (review: { productId: string; rating: number; comment: string }) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  getProductRating: () => { averageRating: number; totalReviews: number };
}

const token = localStorage.getItem('token');

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],

  fetchReviews: async (productId: string) => {
    const response = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set({ reviews: response.data.reviews });
  },

  fetchAllReviews: async () => {
    const response = await axios.get(`http://localhost:5000/api/reviews`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set({ reviews: response.data.reviews });
  },

  addReview: async (review) => {
    const response = await axios.post(`http://localhost:5000/api/reviews`, review, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    set((state) => ({
      reviews: [...state.reviews, response.data.review]
    }));
  },

  deleteReview: async (id: string) => {
    await axios.delete(`http://localhost:5000/api/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set((state) => ({
      reviews: state.reviews.filter((r) => r.id !== id)
    }));
  },

  getProductRating: () => {
    const reviews = get().reviews;
    if (reviews.length === 0) return { averageRating: 0, totalReviews: 0 };
    const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0);
    return {
      averageRating: Number((totalRating / reviews.length).toFixed(1)),
      totalReviews: reviews.length
    };
  }
}));
