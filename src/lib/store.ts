'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItemStore {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

interface CartStore {
  items: CartItemStore[];
  isOpen: boolean;
  addItem: (item: Omit<CartItemStore, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.productId === item.productId);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'hm-cart-storage',
    }
  )
);

// Wishlist Store
interface WishlistStore {
  items: string[]; // product IDs
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        if (!get().items.includes(productId)) {
          set({ items: [...get().items, productId] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },

      toggleItem: (productId) => {
        const items = get().items;
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },

      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'hm-wishlist-storage',
    }
  )
);

// Age Verification Store
interface AgeVerificationStore {
  isVerified: boolean;
  setVerified: (verified: boolean) => void;
}

export const useAgeVerificationStore = create<AgeVerificationStore>()(
  persist(
    (set) => ({
      isVerified: false,
      setVerified: (verified) => set({ isVerified: verified }),
    }),
    {
      name: 'hm-age-verification',
    }
  )
);

// Cookie Consent Store
interface CookieConsentStore {
  hasConsented: boolean | null;
  setConsent: (consent: boolean) => void;
}

export const useCookieConsentStore = create<CookieConsentStore>()(
  persist(
    (set) => ({
      hasConsented: null,
      setConsent: (consent) => set({ hasConsented: consent }),
    }),
    {
      name: 'hm-cookie-consent',
    }
  )
);

// Auth Store
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          // Get stored users from localStorage
          const usersJson = localStorage.getItem('hm-users');
          const users: User[] = usersJson ? JSON.parse(usersJson) : [];

          // Find user by email
          const user = users.find(u => u.email === email);
          
          // Get stored passwords (in real app, this would be hashed server-side)
          const passwordsJson = localStorage.getItem('hm-passwords');
          const passwords: Record<string, string> = passwordsJson ? JSON.parse(passwordsJson) : {};

          if (!user || passwords[user.id] !== password) {
            return { success: false, error: 'Invalid email or password' };
          }

          set({ user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          console.error('Login error:', error);
          return { success: false, error: 'Login failed. Please try again.' };
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          // Get existing users
          const usersJson = localStorage.getItem('hm-users');
          const users: User[] = usersJson ? JSON.parse(usersJson) : [];

          // Check if email already exists
          if (users.some(u => u.email === email)) {
            return { success: false, error: 'Email already registered' };
          }

          // Create new user
          const newUser: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            createdAt: new Date().toISOString(),
          };

          // Save user
          users.push(newUser);
          localStorage.setItem('hm-users', JSON.stringify(users));

          // Save password separately (in real app, this would be hashed on server)
          const passwordsJson = localStorage.getItem('hm-passwords');
          const passwords: Record<string, string> = passwordsJson ? JSON.parse(passwordsJson) : {};
          passwords[newUser.id] = password;
          localStorage.setItem('hm-passwords', JSON.stringify(passwords));

          return { success: true };
        } catch (error) {
          console.error('Registration error:', error);
          return { success: false, error: 'Registration failed. Please try again.' };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (updates: Partial<User>) => {
        try {
          const currentUser = get().user;
          if (!currentUser) {
            return { success: false, error: 'Not authenticated' };
          }

          const updatedUser = { ...currentUser, ...updates };

          // Update in localStorage
          const usersJson = localStorage.getItem('hm-users');
          const users: User[] = usersJson ? JSON.parse(usersJson) : [];
          const userIndex = users.findIndex(u => u.id === currentUser.id);
          
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('hm-users', JSON.stringify(users));
          }

          set({ user: updatedUser });
          return { success: true };
        } catch (error) {
          console.error('Profile update error:', error);
          return { success: false, error: 'Update failed. Please try again.' };
        }
      },
    }),
    {
      name: 'hm-auth-storage',
    }
  )
);
