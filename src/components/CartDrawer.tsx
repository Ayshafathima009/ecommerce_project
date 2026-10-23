import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    navigateTo,
    t
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E5E2DC] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E5E2DC] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-stone-900 tracking-wide">
                {t.shoppingCart}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF9F6]">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E5E2DC] flex items-center justify-center mx-auto mb-4 text-stone-400 shadow-sm">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-800 mb-1">
                  {t.cartEmpty}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                  {t.cartEmptyDesc}
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('products');
                  }}
                  className="btn-gold-primary px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  {t.continueShopping}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E2DC] flex gap-3.5 items-start shadow-sm"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-[#FAF9F6] border border-[#E5E2DC] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 truncate">
                      {item.product.displayLabel || item.product.name}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5 truncate">
                      {item.product.name}
                    </p>
                    <div className="text-xs font-bold text-[#B8860B] mt-1 font-mono-tabular">
                      ₹{item.unitPrice.toLocaleString('en-IN')}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-lg border border-stone-300 bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E5E2DC] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="text-stone-900 font-mono-tabular font-bold">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.shipping}</span>
                  <span className="text-emerald-700 font-bold">{t.freeShipping}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E5E2DC] text-sm font-bold text-stone-900">
                  <span>{t.total}</span>
                  <span className="text-[#B8860B] font-mono-tabular text-lg">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="btn-gold-primary w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <span>{t.proceedToCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('cart');
                }}
                className="w-full text-center text-xs text-stone-500 hover:text-stone-800 py-1 font-semibold"
              >
                View Full Cart Summary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
