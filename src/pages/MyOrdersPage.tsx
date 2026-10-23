import React from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Truck, Calendar, MapPin, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { orders, navigateTo, t } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8 bg-[#FAF9F6]">
      
      {/* Title */}
      <div className="border-b border-[#E5E2DC] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            {t.navMyOrders}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track your Driver.MERAI automotive displays and accessories from dispatch to delivery.
          </p>
        </div>
        <button
          onClick={() => navigateTo('products')}
          className="text-xs text-[#B8860B] hover:text-[#996515] font-bold self-start sm:self-auto"
        >
          Explore Catalogue →
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white border border-[#E5E2DC] flex items-center justify-center mx-auto text-stone-400 shadow-sm">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">{t.noOrdersYet}</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Upgrade your car infotainment today with our active Driver.MERAI 10.1" 2K Android Display.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="btn-gold-primary px-6 py-3 rounded-xl text-xs font-bold shadow"
          >
            {t.continueShopping}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            let statusColor = 'text-[#996515] bg-amber-50 border-[#D4AF37]';
            if (order.status === 'delivered') statusColor = 'text-emerald-800 bg-emerald-100 border-emerald-300';
            if (order.status === 'shipped') statusColor = 'text-blue-800 bg-blue-100 border-blue-300';
            if (order.status === 'cancelled') statusColor = 'text-rose-800 bg-rose-100 border-rose-300';

            return (
              <div
                key={order.id}
                className="rounded-2xl pearl-card overflow-hidden shadow-md"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:p-5 bg-white border-b border-[#E5E2DC] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-stone-400 block">Order Placed</span>
                      <strong className="text-stone-900">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </strong>
                    </div>

                    <div>
                      <span className="text-stone-400 block">Total Amount</span>
                      <strong className="text-stone-900 font-mono-tabular font-bold">
                        ₹{order.total.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div>
                      <span className="text-stone-400 block">Ship To</span>
                      <strong className="text-stone-900">{order.customer.fullName}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-stone-500 font-mono font-medium">ID: {order.id}</span>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase border ${statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items & Shipping Details */}
                <div className="p-5 sm:p-6 space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-b border-[#E5E2DC] last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 rounded-xl object-cover bg-white border border-[#E5E2DC] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-stone-900">
                            {item.displayLabel || item.productName}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">{item.productName}</p>
                          <div className="text-xs text-stone-500 mt-1">
                            Qty: <strong className="text-stone-900">{item.quantity}</strong> · ₹{item.price.toLocaleString('en-IN')} each
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <button
                          onClick={() => navigateTo('order-confirmation', order.id)}
                          className="px-4 py-2 rounded-xl btn-pearl-secondary text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          <span>View Invoice</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#B8860B]" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600 bg-white p-3.5 rounded-xl border border-[#E5E2DC]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>
                        Estimated Delivery: <strong className="text-stone-900">{order.estimatedDelivery}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-stone-700">
                      <span>Tracking: {order.trackingNumber}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
