export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  stock: number;
  images: string[];
  categoryId: string;
  category?: Category;
  featured: boolean;
  active: boolean;
  weight?: string;
  dimensions?: string;
  ingredients?: string;
  usage?: string;
  benefits?: string;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  products?: Product[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  userId: string;
  user?: { name: string; image?: string };
  productId: string;
  approved: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
  shippingName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingProvince: string;
  shippingPostalCode: string;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  published: boolean;
  tags?: string[];
  createdAt: string;
}

export interface NewsletterSubscription {
  email: string;
}
