import React from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    navigateTo,
    t
  } = useStore();

  const tax = Math.round(cartSubtotal * 0.18);
  const total = cartSubtotal;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center bg-[#FAF9F6]">
        <div className="w-20 h-20 rounded-full bg-white border border-[#E5E2DC] flex items-center justify-center mx-auto mb-5 text-stone-400 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 font-display mb-2">
          {t.cartEmpty}
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto mb-8">
          {t.cartEmptyDesc}
        </p>
        <button
          onClick={() => navigateTo('products')}
          className="btn-gold-primary px-6 py-3.5 rounded-xl text-sm font-bold shadow-md"
        >
          {t.continueShopping}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 bg-[#FAF9F6]">
      <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            {t.shoppingCart}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review your automotive hardware and accessories before checkout.
          </p>
        </div>
        <button
          onClick={() => navigateTo('products')}
          className="text-xs text-[#B8860B] hover:text-[#996515] font-bold"
        >
          ← {t.continueShopping}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="p-5 rounded-2xl pearl-card flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-white border border-[#E5E2DC] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    {item.product.displayLabel || item.product.name}
                  </h3>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {item.product.name}
                  </div>
                  <div className="text-xs text-emerald-700 font-bold mt-1">
                    In Stock ({item.product.stock} units available)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-[#E5E2DC]">
                {/* Stepper */}
                <div className="flex items-center rounded-xl border border-stone-300 bg-white p-1 shadow-sm">
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold text-stone-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="p-1.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <div className="text-base font-bold text-stone-900 font-mono-tabular">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono-tabular">
                    ₹{item.unitPrice.toLocaleString('en-IN')} each
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl pearl-card flex items-center gap-3 text-xs text-stone-600">
            <Truck className="w-4 h-4 text-[#B8860B] shrink-0" />
            <span>Eligible for Free Pan-India Express Delivery via BlueDart / DTDC.</span>
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl pearl-card space-y-5 shadow-md">
            <h2 className="text-lg font-bold text-stone-900 font-display">
              {t.orderSummary}
            </h2>

            <div className="space-y-3 text-xs text-stone-600 border-b border-[#E5E2DC] pb-4">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-bold text-stone-900 font-mono-tabular">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.shipping}</span>
                <span className="font-bold text-emerald-700">{t.freeShipping}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.taxGst}</span>
                <span className="text-stone-500 font-mono-tabular">
                  Included (₹{tax.toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            <div className="flex justify-between text-base font-bold text-stone-900">
              <span>{t.total}</span>
              <span className="text-[#B8860B] font-mono-tabular text-2xl font-black">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="btn-gold-primary w-full py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <span>{t.proceedToCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-stone-500 space-y-1.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-stone-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
              <p>Supports COD, UPI, Credit/Debit Cards, & Net Banking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
