import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../assets/images';
import {
  User as UserIcon,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  LogOut,
  MapPin,
  Package,
  Shield,
  ArrowRight
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    login,
    register,
    logout,
    orders,
    navigateTo,
    t
  } = useStore();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, 'customer');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, phone, password);
  };

  // If user is logged in, show Profile and Quick links
  if (currentUser) {
    const userOrders = orders.filter(
      (o) => o.customer.email.toLowerCase() === currentUser.email.toLowerCase()
    );

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8 bg-[#FAF9F6]">
        {/* Profile Card Header */}
        <div className="p-6 sm:p-8 rounded-2xl pearl-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl metallic-gold-header border-2 border-[#D4AF37] flex items-center justify-center text-stone-950 text-2xl font-black font-display shadow-md">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-mono uppercase bg-[#1C1917] text-[#F5D76E] px-2 py-0.5 rounded font-bold">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">{currentUser.email}</p>
              {currentUser.phone && (
                <p className="text-xs text-stone-500 font-medium">{currentUser.phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('my-orders')}
              className="btn-gold-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Package className="w-4 h-4" />
              <span>{t.navMyOrders} ({userOrders.length})</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-rose-700 text-xs font-semibold flex items-center gap-2 border border-stone-300 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>

        {/* Account Details & Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl pearl-card space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#B8860B]" />
              <span>{t.profileDetails}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#E5E2DC]">
                <span className="text-stone-500">Account Status:</span>
                <span className="text-emerald-700 font-bold">Verified Active Customer</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E2DC]">
                <span className="text-stone-500">Preferred Language:</span>
                <span className="text-stone-800 uppercase font-mono font-bold">MERAI SIEME Default</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E2DC]">
                <span className="text-stone-500">Security Credentials:</span>
                <span className="text-stone-700 font-medium">Argon2 / PBKDF2 Encrypted</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl pearl-card space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B8860B]" />
              <span>Saved Delivery Addresses</span>
            </h3>

            {currentUser.addresses && currentUser.addresses.length > 0 ? (
              <div className="p-3.5 rounded-xl bg-white border border-[#E5E2DC] text-xs space-y-1 shadow-sm">
                <div className="font-bold text-stone-900">
                  {currentUser.addresses[0].fullName}
                </div>
                <div className="text-stone-600">
                  {currentUser.addresses[0].streetAddress}
                </div>
                <div className="text-stone-600">
                  {currentUser.addresses[0].city}, {currentUser.addresses[0].state} -{' '}
                  {currentUser.addresses[0].postalCode}
                </div>
                <div className="text-stone-500 font-medium">Phone: {currentUser.addresses[0].phone}</div>
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                Addresses are automatically saved when you place an order.
              </p>
            )}
          </div>
        </div>

        {/* Quick Recent Orders */}
        <div className="p-6 rounded-2xl pearl-card space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              {t.orderHistory}
            </h3>
            <button
              onClick={() => navigateTo('my-orders')}
              className="text-xs text-[#B8860B] hover:text-[#996515] font-bold"
            >
              View Full Order Timeline →
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-500">
              {t.noOrdersYet}
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigateTo('order-confirmation', order.id)}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E2DC] hover:border-[#D4AF37] cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-[#B8860B]" />
                    <div>
                      <span className="font-mono font-bold text-stone-900">{order.id}</span>
                      <span className="text-stone-500 ml-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-stone-900 font-mono-tabular font-bold">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 border border-emerald-300 text-emerald-800 uppercase">
                      {order.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Not logged in: Show Login / Registration form with shiny MS Logo
  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 bg-[#FAF9F6]">
      
      {/* Brand Heading with Official Black-and-Gold MERAI SIEME Logo */}
      <div className="text-center space-y-3">
        <div className="h-20 w-auto p-1 mx-auto flex items-center justify-center">
          <img
            src={IMAGES.msLogo}
            alt="MERAI SIEME"
            className="h-16 w-auto max-w-[240px] object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
          {isLoginTab ? t.login : t.createAccount}
        </h1>
        <p className="text-xs text-stone-500 max-w-xs mx-auto">
          Access your Driver.MERAI purchases, warranty status, and dispatch tracking.
        </p>
      </div>

      {/* Auth Card */}
      <div className="p-6 sm:p-8 rounded-2xl pearl-card space-y-6 shadow-md border border-[#E5E2DC]">
        
        {/* Toggle Login / Register */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F3F2EE] border border-[#E5E2DC] text-xs font-bold">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`py-2 rounded-lg transition-colors ${
              isLoginTab ? 'bg-[#1C1917] text-[#F5D76E] shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.login}
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`py-2 rounded-lg transition-colors ${
              !isLoginTab ? 'bg-[#1C1917] text-[#F5D76E] shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.register}
          </button>
        </div>

        {isLoginTab ? (
          /* Login Form */
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 mb-1 font-bold">{t.email} *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-stone-600 font-bold">{t.password} *</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none font-mono shadow-sm"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-md"
            >
              {t.login}
            </button>

            {/* Quick Demo Fill Buttons */}
            <div className="pt-2 border-t border-[#E5E2DC] text-[11px] text-stone-500 space-y-1.5">
              <span className="block text-stone-500 font-medium">Quick Test Credentials:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('skr2436228@gmail.com');
                    setPassword('DriverMerai#2026');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E2DC] hover:border-stone-400 text-stone-700 font-semibold shadow-sm"
                >
                  Customer Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    login('admin@sieme.in', 'Admin@2026', 'admin');
                    navigateTo('admin');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#D4AF37] text-[#996515] hover:bg-amber-50 font-bold shadow-sm"
                >
                  Admin Portal Login
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 mb-1 font-bold">{t.fullName} *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rajesh Kumar"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-1 font-bold">{t.email} *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-1 font-bold">{t.phoneNumber}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-1 font-bold">{t.password} *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none font-mono shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-md"
            >
              {t.register}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
