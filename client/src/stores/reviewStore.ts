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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],

  // Fetch reviews for a specific product
  fetchReviews: async (productId: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/reviews/product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set({ reviews: response.data.reviews });
  },

  // Fetch all reviews
  fetchAllReviews: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/reviews`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set({ reviews: response.data.reviews });
  },

  // Add a new review
  addReview: async (review) => {
    const response = await axios.post(`${API_BASE_URL}/api/reviews`, review, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    set((state) => ({
      reviews: [...state.reviews, response.data.review]
    }));
  },

  // Delete a review
  deleteReview: async (id: string) => {
    await axios.delete(`${API_BASE_URL}/api/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set((state) => ({
      reviews: state.reviews.filter((r) => r.id !== id)
    }));
  },

  // Calculate average rating and total reviews for the product
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
