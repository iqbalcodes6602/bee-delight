
import { create } from 'zustand';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  createdAt: string;
  published: boolean;
}

interface BlogState {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Health Benefits of Raw Honey',
    content: 'Raw honey has been used for centuries for its medicinal properties. Unlike processed honey, raw honey retains all of its natural enzymes, antioxidants, and nutrients that make it a powerful superfood. Studies have shown that raw honey can help boost immunity, improve digestion, and even aid in wound healing. The antibacterial and antifungal properties of raw honey make it an excellent natural remedy for various ailments.',
    excerpt: 'Discover the amazing health benefits of raw, unprocessed honey.',
    image: '🍯',
    author: 'Admin User',
    createdAt: '2024-06-01T10:00:00Z',
    published: true
  },
  {
    id: '2',
    title: 'How We Harvest Our Honey',
    content: 'Our honey harvesting process is designed to maintain the highest quality while respecting our bee colonies. We use traditional methods combined with modern sustainable practices to ensure that our bees remain healthy and productive. The process begins early in the morning when the bees are less active, and we carefully extract only the excess honey, leaving plenty for the bees themselves.',
    excerpt: 'Learn about our sustainable honey harvesting methods.',
    image: '🐝',
    author: 'Admin User',
    createdAt: '2024-05-28T14:30:00Z',
    published: true
  }
];

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: mockPosts,
  addPost: (post) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    set((state) => ({ posts: [...state.posts, newPost] }));
  },
  updatePost: (id, updatedPost) => {
    set((state) => ({
      posts: state.posts.map(post =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    }));
  },
  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter(post => post.id !== id)
    }));
  },
  getPost: (id) => {
    return get().posts.find(post => post.id === id);
  },
  getPublishedPosts: () => {
    const posts = get().posts;
    return posts;
  }
}));
