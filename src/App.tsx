/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { DistributorDashboardPage } from './pages/DistributorDashboardPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'account':
        return <AccountPage />;
      case 'my-orders':
        return <MyOrdersPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'distributor':
        return <DistributorDashboardPage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Global Top Bar Navigation */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer />

      {/* AI Assist Search Modal */}
      <SearchModal />

      {/* Global Notification Toasts */}
      <Toast />

      {/* Official MERAI SIEME Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
