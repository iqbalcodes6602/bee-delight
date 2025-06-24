
import { create } from 'zustand';

interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  deleteReview: (id: string) => void;
  getProductReviews: (productId: number) => Review[];
  getProductRating: (productId: number) => { averageRating: number; totalReviews: number };
}

const mockReviews: Review[] = [
  {
    id: '1',
    productId: 1,
    userId: '2',
    userName: 'John Doe',
    rating: 5,
    comment: 'Amazing quality honey! Pure and delicious.',
    createdAt: '2024-06-10T10:30:00Z'
  },
  {
    id: '2',
    productId: 1,
    userId: '3',
    userName: 'Sarah Smith',
    rating: 4,
    comment: 'Great honey, love the wildflower taste.',
    createdAt: '2024-06-12T14:20:00Z'
  },
  {
    id: '3',
    productId: 2,
    userId: '2',
    userName: 'John Doe',
    rating: 5,
    comment: 'The acacia honey is incredibly smooth and light.',
    createdAt: '2024-06-11T09:15:00Z'
  }
];

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: mockReviews,
  addReview: (review) => {
    const newReview = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    set((state) => ({ reviews: [...state.reviews, newReview] }));
  },
  deleteReview: (id) => {
    set((state) => ({
      reviews: state.reviews.filter(review => review.id !== id)
    }));
  },
  getProductReviews: (productId) => {
    return get().reviews.filter(review => review.productId === productId);
  },
  getProductRating: (productId) => {
    const productReviews = get().reviews.filter(review => review.productId === productId);
    if (productReviews.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      averageRating: totalRating / productReviews.length,
      totalReviews: productReviews.length
    };
  }
}));
