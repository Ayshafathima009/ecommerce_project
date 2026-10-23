export type Language = 'en' | 'hi' | 'ta' | 'ml' | 'ar';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  displayLabel?: string;
  slug: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: 'available' | 'out_of_stock' | 'discontinued';
  category: 'car_display' | 'audio' | 'wearable' | 'robotics';
  ram?: string;
  storage?: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  images: string[];
  rating: number;
  reviewCount: number;
  aliases: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  displayLabel?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = 'cod' | 'upi' | 'card' | 'netbanking';
export type PaymentStatus = 'pending' | 'verified_demo' | 'completed' | 'failed';
export type OrderFulfillmentStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customer: CustomerShippingAddress;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderFulfillmentStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  isDemo: boolean;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin' | 'distributor';
  addresses?: CustomerShippingAddress[];
  token?: string;
}

export type ActivePage = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'account' 
  | 'my-orders' 
  | 'admin' 
  | 'distributor' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms'
  | 'not-found';
