import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  FileText,
  Calendar,
  CreditCard,
  MapPin,
  ArrowRight
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { selectedProductId, orders, navigateTo, t } = useStore();

  const order = orders.find((o) => o.id === selectedProductId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 bg-[#FAF9F6]">
        <h2 className="text-xl font-bold text-stone-900">No order details found.</h2>
        <button
          onClick={() => navigateTo('home')}
          className="btn-gold-primary px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8 bg-[#FAF9F6]">
      
      {/* Success Hero Card */}
      <div className="p-8 rounded-2xl pearl-card border border-emerald-500/40 text-center space-y-4 shadow-md">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-700">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-mono">
            {t.orderConfirmed}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display mt-1">
            Thank you for ordering with MERAI SIEME
          </h1>
          <p className="text-xs text-stone-600 max-w-lg mx-auto mt-2">
            {t.thankYouMessage}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D4AF37] text-sm font-mono text-stone-900 shadow-sm">
          <span className="text-stone-500 font-sans">{t.orderNumber}:</span>
          <strong className="text-[#B8860B]">{order.id}</strong>
        </div>

        {order.isDemo && (
          <div className="text-[11px] text-[#996515] bg-[#FAF9F6] border border-[#D4AF37]/50 max-w-md mx-auto py-1 px-3 rounded-lg font-medium">
            Demo Order Verified: Stock has been decremented in real-time inventory.
          </div>
        )}
      </div>

      {/* Order Tracking & Details Card */}
      <div className="p-6 sm:p-8 rounded-2xl pearl-card space-y-6 shadow-md">
        
        {/* Timeline strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-[#E5E2DC] pb-6 text-xs">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#B8860B] shrink-0" />
            <div>
              <span className="text-stone-500 block">Order Date</span>
              <strong className="text-stone-900">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-stone-500 block">Estimated Delivery</span>
              <strong className="text-emerald-800">
                {order.estimatedDelivery || 'Within 3-5 business days'}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Package className="w-4 h-4 text-[#B8860B] shrink-0" />
            <div>
              <span className="text-stone-500 block">Tracking Number</span>
              <strong className="text-stone-900 font-mono">{order.trackingNumber}</strong>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            Purchased Hardware ({order.items.length})
          </h3>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-[#E5E2DC] flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-14 h-14 rounded-lg object-cover bg-[#FAF9F6] border border-[#E5E2DC] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {item.displayLabel || item.productName}
                    </h4>
                    <p className="text-xs text-stone-500">{item.productName}</p>
                    <span className="text-[11px] text-stone-500">
                      Quantity: <strong className="text-stone-900">{item.quantity}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-stone-900 font-mono-tabular">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    ₹{item.price.toLocaleString('en-IN')} each
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5E2DC] text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Delivery Address</span>
            </div>
            <p className="font-bold text-stone-800">{order.customer.fullName}</p>
            <p className="text-stone-600">{order.customer.streetAddress}</p>
            <p className="text-stone-600">
              {order.customer.city}, {order.customer.state} — {order.customer.postalCode}
            </p>
            <p className="text-stone-600">Phone: {order.customer.phone}</p>
            <p className="text-stone-600">Email: {order.customer.email}</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-2 shadow-sm">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold mb-2">
              <CreditCard className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Payment Details</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Method:</span>
              <strong className="text-stone-900 uppercase">{order.paymentMethod}</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Payment Status:</span>
              <span className="text-emerald-700 font-bold uppercase">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="text-stone-900 font-mono-tabular">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>GST (18% Included):</span>
              <span className="text-stone-900 font-mono-tabular">₹{order.tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-[#E5E2DC]">
              <span>Total Paid:</span>
              <span className="text-[#B8860B] font-mono-tabular text-base font-black">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E2DC]">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-pearl-secondary text-xs font-semibold shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#B8860B]" />
            <span>{t.downloadInvoice}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('my-orders')}
              className="px-4 py-2.5 rounded-xl btn-pearl-secondary text-xs font-semibold"
            >
              {t.navMyOrders}
            </button>
            <button
              onClick={() => navigateTo('products')}
              className="btn-gold-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <span>{t.continueShopping}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
