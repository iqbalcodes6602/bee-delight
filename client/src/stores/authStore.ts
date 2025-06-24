
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (res.ok && data.success) {
            const user = {
              id: data.user._id,
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
            };

            localStorage.setItem("token", data.token);

            set({ user, isAuthenticated: true });
            return true;
          } else {
            console.error("Login failed:", data);
            return false;
          }
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },
      register: async (email: string, password: string, name: string) => {
        try {
          const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await res.json();

          if (res.ok && data.success) {
            const user = {
              id: data.user._id,
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
            };

            localStorage.setItem("token", data.token);

            set({ user, isAuthenticated: true });
            return true;
          } else {
            console.error("Registration error:", data);
            return false;
          }
        } catch (error) {
          console.error("Registration failed:", error);
          return false;
        }
      },
      logout: async () => {
        try {
          const token = localStorage.getItem("token");

          if (token) {
            await fetch(`${API_BASE}/auth/logout`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          }
        } catch (error) {
          console.warn("Logout API failed:", error);
        } finally {
          localStorage.removeItem("token");
          set({ user: null, isAuthenticated: false });
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
