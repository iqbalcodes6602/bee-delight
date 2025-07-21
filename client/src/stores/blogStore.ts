import { create } from "zustand";
import axios from "axios";

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
  fetchPublishedPosts: () => Promise<void>;
  fetchAdminPosts: () => Promise<void>;
  createPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'author'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],

  // Fetch all published blog posts
  fetchPublishedPosts: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/blog/posts`);
    set({ posts: data.posts });
  },

  // Fetch all blog posts for admin
  fetchAdminPosts: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/api/blog/posts/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ posts: data.posts });
  },

  // Create a new blog post
  createPost: async (post) => {
    const { data } = await axios.post(`${API_BASE_URL}/api/blog/posts`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({ posts: [...state.posts, data.post] }));
  },

  // Update an existing blog post
  updatePost: async (id, updatedPost) => {
    const { data } = await axios.put(`${API_BASE_URL}/api/blog/posts/${id}`, updatedPost, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? data.post : post
      ),
    }));
  },

  // Delete a blog post
  deletePost: async (id) => {
    await axios.delete(`${API_BASE_URL}/api/blog/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
  },

  // Get a single blog post by ID
  getPost: (id) => {
    return get().posts.find((post) => post.id === id);
  },

  // Get all published blog posts
  getPublishedPosts: () => {
    return get().posts;
  },
}));
