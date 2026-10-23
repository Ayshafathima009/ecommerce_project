import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, CustomerShippingAddress } from '../types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Building2,
  Lock,
  ArrowRight,
  AlertCircle,
  Truck,
  CheckCircle2
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    currentUser,
    placeOrder,
    navigateTo,
    addToast,
    t
  } = useStore();

  const [shipping, setShipping] = useState<CustomerShippingAddress>({
    fullName: currentUser?.addresses?.[0]?.fullName || currentUser?.name || 'Rajesh Kumar',
    phone: currentUser?.phone || '+91 98765 43210',
    email: currentUser?.email || 'skr2436228@gmail.com',
    streetAddress: currentUser?.addresses?.[0]?.streetAddress || 'Plot 74, Sector 18, Cyber City',
    city: currentUser?.addresses?.[0]?.city || 'Gurugram',
    state: currentUser?.addresses?.[0]?.state || 'Haryana',
    postalCode: currentUser?.addresses?.[0]?.postalCode || '122002',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('driver.merai@okhdfcbank');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  
  // Card demo state (never store raw sensitive data)
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8824');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardName, setCardName] = useState('Rajesh Kumar');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 bg-[#FAF9F6]">
        <h2 className="text-xl font-bold text-stone-900">Your cart is empty.</h2>
        <button
          onClick={() => navigateTo('products')}
          className="btn-gold-primary px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          {t.continueShopping}
        </button>
      </div>
    );
  }

  const handleInputChange = (field: keyof CustomerShippingAddress, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!shipping.fullName.trim() || !shipping.phone.trim() || !shipping.email.trim() || !shipping.streetAddress.trim() || !shipping.city.trim() || !shipping.postalCode.trim()) {
      setFormError('Please fill in all delivery address details.');
      addToast('Please complete the delivery form.', 'warning');
      return;
    }

    try {
      setIsSubmitting(true);
      const newOrder = await placeOrder(shipping, paymentMethod);
      navigateTo('order-confirmation', newOrder.id);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to place order. Please try again.');
      addToast(err?.message || 'Order failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 bg-[#FAF9F6]">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
          {t.checkout}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Complete your delivery details and choose your preferred payment method.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Delivery & Payment Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {formError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* 1. Delivery Address Card */}
          <div className="p-6 rounded-2xl pearl-card space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-base border-b border-[#E5E2DC] pb-3">
              <Truck className="w-5 h-5 text-[#B8860B]" />
              <h2>{t.deliveryDetails}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-600 mb-1.5 font-bold">{t.fullName} *</label>
                <input
                  type="text"
                  required
                  value={shipping.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                  placeholder="e.g. Vikram Malhotra"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1.5 font-bold">{t.phoneNumber} *</label>
                <input
                  type="tel"
                  required
                  value={shipping.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-600 mb-1.5 font-bold">{t.emailAddress} * (For tax invoice & dispatch updates)</label>
                <input
                  type="email"
                  required
                  value={shipping.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-600 mb-1.5 font-bold">{t.streetAddress} *</label>
                <input
                  type="text"
                  required
                  value={shipping.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                  placeholder="Flat No, Building, Road name"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1.5 font-bold">{t.city} *</label>
                <input
                  type="text"
                  required
                  value={shipping.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                  placeholder="e.g. Bengaluru"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1.5 font-bold">{t.state} *</label>
                <input
                  type="text"
                  required
                  value={shipping.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                  placeholder="e.g. Karnataka"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1.5 font-bold">{t.pinCode} *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={shipping.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none font-mono shadow-sm"
                  placeholder="560001"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1.5 font-bold">Country</label>
                <input
                  type="text"
                  disabled
                  value="India"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F5F4F0] border border-[#E5E2DC] text-stone-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Card */}
          <div className="p-6 rounded-2xl pearl-card space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
                <CreditCard className="w-5 h-5 text-[#B8860B]" />
                <h2>{t.paymentMethod}</h2>
              </div>
              <span className="text-[11px] font-mono text-[#996515] bg-[#FAF9F6] border border-[#D4AF37] px-2 py-0.5 rounded font-bold shadow-sm">
                DEMO MODE SIMULATOR
              </span>
            </div>

            {/* Payment Options Radio List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* UPI Option */}
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 shadow-sm ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-50/60 border-[#D4AF37] text-stone-900 ring-1 ring-[#D4AF37]'
                    : 'bg-white border-[#E5E2DC] text-stone-600 hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-0.5 text-[#B8860B]"
                />
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-stone-900">
                    <QrCode className="w-4 h-4 text-[#B8860B]" />
                    <span>UPI / QR Instant Pay</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              </label>

              {/* COD Option */}
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 shadow-sm ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-50/60 border-[#D4AF37] text-stone-900 ring-1 ring-[#D4AF37]'
                    : 'bg-white border-[#E5E2DC] text-stone-600 hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-0.5 text-[#B8860B]"
                />
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-stone-900">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>{t.cashOnDelivery}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">Pay upon doorstep package inspection</p>
                </div>
              </label>

              {/* Card Option */}
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 shadow-sm ${
                  paymentMethod === 'card'
                    ? 'bg-amber-50/60 border-[#D4AF37] text-stone-900 ring-1 ring-[#D4AF37]'
                    : 'bg-white border-[#E5E2DC] text-stone-600 hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-0.5 text-[#B8860B]"
                />
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-stone-900">
                    <CreditCard className="w-4 h-4 text-[#B8860B]" />
                    <span>Credit / Debit Card</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">Visa, Mastercard, RuPay, Amex</p>
                </div>
              </label>

              {/* Net Banking */}
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 shadow-sm ${
                  paymentMethod === 'netbanking'
                    ? 'bg-amber-50/60 border-[#D4AF37] text-stone-900 ring-1 ring-[#D4AF37]'
                    : 'bg-white border-[#E5E2DC] text-stone-600 hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="mt-0.5 text-[#B8860B]"
                />
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-stone-900">
                    <Building2 className="w-4 h-4 text-[#B8860B]" />
                    <span>{t.netBanking}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">All 50+ Indian Banks supported</p>
                </div>
              </label>
            </div>

            {/* Configured Details per Selected Payment Method */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-3">
                <div className="text-xs text-stone-700 font-bold">Verify UPI Virtual Payment Address (VPA):</div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF9F6] border border-stone-300 text-stone-900 text-xs font-mono"
                  placeholder="yourname@upi"
                />
                <div className="flex gap-2 text-[11px] text-stone-600">
                  <span className="px-2 py-1 rounded bg-[#FAF9F6] border border-stone-200">GPay</span>
                  <span className="px-2 py-1 rounded bg-[#FAF9F6] border border-stone-200">PhonePe</span>
                  <span className="px-2 py-1 rounded bg-[#FAF9F6] border border-stone-200">Paytm</span>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-3 text-xs">
                <div className="text-stone-800 font-bold">Card Simulation Preview (Zero Raw Secret Storage):</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-stone-600 block mb-1 font-semibold">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF9F6] border border-stone-300 text-stone-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1 font-semibold">Valid Thru</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF9F6] border border-stone-300 text-stone-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1 font-semibold">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength={3}
                      defaultValue="•••"
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF9F6] border border-stone-300 text-stone-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-2 text-xs">
                <label className="text-stone-800 font-bold block">Select Bank:</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF9F6] border border-stone-300 text-stone-900 text-xs font-semibold"
                >
                  <option>HDFC Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#D4AF37]/50 text-[11px] text-stone-700 leading-relaxed shadow-sm">
              <strong className="text-[#996515]">Notice:</strong> {t.demoPaymentNotice} No real funds will be deducted from your account. An authentic order record with inventory reduction will be registered immediately.
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Order Button */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl pearl-card space-y-5 shadow-md sticky top-24">
            <h2 className="text-lg font-bold text-stone-900 font-display">
              {t.orderSummary}
            </h2>

            {/* Itemized list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-white border border-[#E5E2DC] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 truncate">
                      {item.product.displayLabel || item.product.name}
                    </h4>
                    <p className="text-stone-500 text-[11px]">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-stone-900 font-mono-tabular shrink-0">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E2DC] pt-3 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="text-stone-900 font-bold font-mono-tabular">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.shipping}</span>
                <span className="text-emerald-700 font-bold">{t.freeShipping}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.taxGst}</span>
                <span className="text-stone-500 font-mono-tabular">Included (18%)</span>
              </div>
            </div>

            <div className="border-t border-[#E5E2DC] pt-3 flex justify-between items-baseline text-base font-bold text-stone-900">
              <span>{t.total}</span>
              <span className="text-[#B8860B] text-2xl font-black font-mono-tabular">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold-primary w-full py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              {isSubmitting ? (
                <span>Deducting Stock & Confirming...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{t.placeOrder} (₹{cartSubtotal.toLocaleString('en-IN')})</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>SIEME Automotive Certified Security</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
