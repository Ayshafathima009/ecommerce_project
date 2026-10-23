import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  User,
  Language,
  ActivePage,
  PaymentMethod,
  OrderFulfillmentStatus,
  CustomerShippingAddress
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USER } from '../data/initialData';
import { TRANSLATIONS, Translations } from '../data/translations';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  currentUser: User | null;
  activePage: ActivePage;
  selectedProductId: string | null;
  language: Language;
  t: Translations;
  dir: 'ltr' | 'rtl';
  isCartOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  toasts: ToastMessage[];
  
  // Actions
  navigateTo: (page: ActivePage, productId?: string) => void;
  setLanguage: (lang: Language) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  
  // Cart Actions
  addToCart: (productId: string, quantity?: number) => boolean;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => boolean;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Order & Inventory Actions
  placeOrder: (customer: CustomerShippingAddress, paymentMethod: PaymentMethod) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderFulfillmentStatus) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  toggleProductStatus: (productId: string, status: 'available' | 'out_of_stock' | 'discontinued') => void;
  
  // Auth Actions
  login: (email: string, password: string, role?: 'customer' | 'admin' | 'distributor') => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  
  // UI Helpers
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state (persisted)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('merai_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('merai_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('merai_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('merai_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_USER;
  });

  // Navigation state
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('merai-car-display-daiichi');
  const [language, setLanguageState] = useState<Language>('en');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem('merai_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('merai_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('merai_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Sync current user to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('merai_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('merai_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Handle document direction for Arabic
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const navigateTo = (page: ActivePage, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Cart Management
  const addToCart = (productId: string, quantity = 1): boolean => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      addToast('Product not found.', 'error');
      return false;
    }

    if (product.stock <= 0 || product.status !== 'available') {
      addToast(`${product.name} is currently out of stock.`, 'warning');
      return false;
    }

    let success = true;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === productId);
      const currentQty = existing ? existing.quantity : 0;
      const targetQty = currentQty + quantity;

      if (targetQty > product.stock) {
        addToast(`Cannot add more than ${product.stock} units in stock.`, 'warning');
        success = false;
        return prevCart;
      }

      if (existing) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: targetQty, product }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            productId,
            product,
            quantity,
            unitPrice: product.price
          }
        ];
      }
    });

    if (success) {
      addToast(`${product.displayLabel || product.name} added to cart`, 'success');
      setIsCartOpen(true);
    }
    return success;
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number): boolean => {
    const product = products.find((p) => p.id === productId);
    if (!product) return false;

    if (quantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    if (quantity > product.stock) {
      addToast(`Only ${product.stock} units currently available.`, 'warning');
      return false;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity, product } : item
      )
    );
    return true;
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  // Safe Order Placement & Backend Inventory Update
  const placeOrder = async (
    customer: CustomerShippingAddress,
    paymentMethod: PaymentMethod
  ): Promise<Order> => {
    // 1. Verify stock availability for each item
    for (const item of cart) {
      const currentProd = products.find((p) => p.id === item.productId);
      if (!currentProd || currentProd.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${item.product.name}. Available: ${currentProd?.stock ?? 0}`
        );
      }
    }

    // 2. Decrement inventory safely
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((ci) => ci.productId === prod.id);
        if (cartItem) {
          const newStock = Math.max(0, prod.stock - cartItem.quantity);
          return {
            ...prod,
            stock: newStock,
            status: newStock === 0 ? 'out_of_stock' : prod.status
          };
        }
        return prod;
      })
    );

    // 3. Generate Unique Order ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `MS-2026-${randomSuffix}`;

    // Calculate delivery date (4 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    const newOrder: Order = {
      id: orderId,
      customer,
      items: cart.map((ci) => ({
        productId: ci.productId,
        productName: ci.product.name,
        displayLabel: ci.product.displayLabel,
        price: ci.unitPrice,
        quantity: ci.quantity,
        image: ci.product.images[0]
      })),
      subtotal: cartSubtotal,
      tax: Math.round(cartSubtotal * 0.18),
      shipping: 0,
      total: cartSubtotal,
      paymentMethod,
      paymentStatus: 'verified_demo',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryDate.toISOString().split('T')[0],
      trackingNumber: `SIEME-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      isDemo: true,
      notes: 'Automated order dispatch queued. Stock deducted in inventory.'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast(`Order ${orderId} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderFulfillmentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addToast(`Order ${orderId} updated to ${status}`, 'info');
  };

  const updateProductStock = (productId: string, newStock: number) => {
    const validStock = Math.max(0, newStock);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            stock: validStock,
            status: validStock > 0 ? 'available' : 'out_of_stock'
          };
        }
        return p;
      })
    );
    addToast(`Stock updated to ${validStock} units`, 'success');
  };

  const updateProductPrice = (productId: string, newPrice: number) => {
    const validPrice = Math.max(1, newPrice);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: validPrice } : p))
    );
    addToast(`Price updated to ₹${validPrice.toLocaleString('en-IN')}`, 'success');
  };

  const toggleProductStatus = (
    productId: string,
    status: 'available' | 'out_of_stock' | 'discontinued'
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status } : p))
    );
    addToast('Product status updated', 'info');
  };

  // Auth
  const login = (
    email: string,
    password: string,
    role: 'customer' | 'admin' | 'distributor' = 'customer'
  ): boolean => {
    if (!email || !password) {
      addToast('Please enter both email and password.', 'error');
      return false;
    }

    const displayName =
      role === 'admin'
        ? 'SIEME Admin Ops'
        : role === 'distributor'
        ? 'Authorized SIEME Dealer'
        : email.split('@')[0];

    const loggedInUser: User = {
      id: `usr-${Date.now()}`,
      name: displayName,
      email,
      role
    };

    setCurrentUser(loggedInUser);
    addToast(`Welcome back, ${loggedInUser.name}! (${role.toUpperCase()})`, 'success');
    return true;
  };

  const register = (name: string, email: string, phone: string, password: string): boolean => {
    if (!name || !email || !password) {
      addToast('Please fill all mandatory fields.', 'error');
      return false;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      addresses: [
        {
          fullName: name,
          phone,
          email,
          streetAddress: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'India'
        }
      ]
    };

    setCurrentUser(newUser);
    addToast(`Account created successfully! Welcome to MERAI SIEME.`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Signed out successfully.', 'info');
    navigateTo('home');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        currentUser,
        activePage,
        selectedProductId,
        language,
        t,
        dir,
        isCartOpen,
        isSearchOpen,
        searchQuery,
        toasts,
        navigateTo,
        setLanguage,
        setIsCartOpen,
        setIsSearchOpen,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        placeOrder,
        updateOrderStatus,
        updateProductStock,
        updateProductPrice,
        toggleProductStatus,
        login,
        register,
        logout,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
