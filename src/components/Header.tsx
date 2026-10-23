import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Language } from '../types';
import { IMAGES } from '../assets/images';
import {
  Search,
  ShoppingBag,
  User as UserIcon,
  Globe,
  ChevronDown,
  Menu,
  X,
  Truck,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    language,
    setLanguage,
    currentUser,
    t
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'ar', label: 'Arabic', native: 'العربية' }
  ];

  const handleNav = (page: any) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcements & Brand Bar — Brushed Pearl/Champagne */}
      <div className="bg-[#1C1917] border-b border-[#D4AF37]/40 text-xs text-stone-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#F5D76E] font-bold tracking-wider">SIEME DRIVE</span>
            <span className="text-stone-600">|</span>
            <span className="text-stone-300">Official Flagship Store: <strong className="text-white font-medium">merai.sieme.in</strong></span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#F5D76E]" />
              Pan-India Express Free Delivery on Driver.MERAI
            </span>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('distributor')}
                className={`hover:text-[#F5D76E] transition-colors ${activePage === 'distributor' ? 'text-[#F5D76E] font-bold' : ''}`}
              >
                {t.navDistributor}
              </button>
              <span className="text-stone-600">·</span>
              <button
                onClick={() => navigateTo('admin')}
                className={`hover:text-[#F5D76E] transition-colors ${activePage === 'admin' ? 'text-[#F5D76E] font-bold' : ''}`}
              >
                {t.navAdmin}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract — Luxury Metallic Gold Navbar with Gentle Shimmer */}
      <header className="sticky top-0 z-40 metallic-gold-header shadow-md transition-all border-b border-[#996515]/30">
        {/* Animated Metallic Shine */}
        <div className="metallic-gold-shine" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Zone 1: Official MS Black-and-Gold MERAI SIEME Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-xl p-1 transition-transform hover:scale-[1.01]"
              aria-label="MERAI SIEME Home"
            >
              <div className="h-12 sm:h-14 w-auto flex items-center justify-center px-2 py-1 rounded-xl bg-gradient-to-br from-[#FAF9F6] via-[#FFFFFF] to-[#E8E6E1] border border-[#996515]/40 shadow-sm shrink-0">
                <img
                  src={IMAGES.msLogo}
                  alt="MERAI SIEME"
                  className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>
          </div>

          {/* Zone 2: Concise Single-Line Navigation Links (Deep Charcoal on Gold) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-[#1C1917]">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-black transition-colors whitespace-nowrap shrink-0 py-1 ${
                activePage === 'home' ? 'text-black border-b-2 border-[#1C1917]' : 'hover:border-b-2 hover:border-[#1C1917]/40'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handleNav('products')}
              className={`hover:text-black transition-colors whitespace-nowrap shrink-0 py-1 ${
                activePage === 'products' ? 'text-black border-b-2 border-[#1C1917]' : 'hover:border-b-2 hover:border-[#1C1917]/40'
              }`}
            >
              {t.navProducts}
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-black transition-colors whitespace-nowrap shrink-0 py-1 ${
                activePage === 'about' ? 'text-black border-b-2 border-[#1C1917]' : 'hover:border-b-2 hover:border-[#1C1917]/40'
              }`}
            >
              {t.navAboutUs}
            </button>
            <button
              onClick={() => handleNav('my-orders')}
              className={`hover:text-black transition-colors whitespace-nowrap shrink-0 py-1 ${
                activePage === 'my-orders' ? 'text-black border-b-2 border-[#1C1917]' : 'hover:border-b-2 hover:border-[#1C1917]/40'
              }`}
            >
              {t.navMyOrders}
            </button>
            <button
              onClick={() => handleNav('account')}
              className={`hover:text-black transition-colors whitespace-nowrap shrink-0 py-1 ${
                activePage === 'account' ? 'text-black border-b-2 border-[#1C1917]' : 'hover:border-b-2 hover:border-[#1C1917]/40'
              }`}
            >
              {currentUser ? currentUser.name.split(' ')[0] : t.navAccount}
            </button>
          </nav>

          {/* Zone 3: Search Bar with AI Assist, Language Selector & Cart Action */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Search Input Trigger (Pearl-Silver & Gold Accent) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 hover:bg-white text-[#292524] text-xs font-medium transition-all w-32 sm:w-52 border border-[#B8860B]/50 hover:border-[#1C1917] shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              title="Search with AI Assist"
            >
              <Search className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
              <span className="truncate text-left text-stone-700">Driver.MERAI...</span>
              <span className="hidden sm:inline-block ml-auto text-[9px] font-mono uppercase bg-[#1C1917] text-[#F5D76E] px-1.5 py-0.5 rounded font-bold">
                AI
              </span>
            </button>

            {/* Language Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white/80 hover:bg-white text-[#1C1917] text-xs font-bold border border-[#B8860B]/40 hover:border-[#1C1917] transition-all shadow-sm"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#996515] shrink-0" />
                <span className="uppercase tracking-wider">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#57534E]" />
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 rounded-xl bg-[#FAF9F6] border border-[#D4AF37]/50 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#F5D76E]/30 transition-colors ${
                        language === l.code ? 'text-[#996515] font-bold bg-[#F5D76E]/20' : 'text-stone-800'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-stone-500 text-[11px]">{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Trigger Button — Deep Charcoal & Gold Accent */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center p-2.5 rounded-xl bg-[#1C1917] hover:bg-black text-[#F5D76E] border border-[#B8860B] transition-all shadow-md active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5D76E]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#1C1917] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-white font-mono-tabular">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#1C1917] text-[#F5D76E] hover:bg-black"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F6] border-b border-[#D4AF37]/40 px-6 py-4 space-y-3 shadow-xl">
            <button
              onClick={() => handleNav('home')}
              className={`block w-full text-left py-2 text-sm font-bold ${activePage === 'home' ? 'text-[#B8860B]' : 'text-stone-800'}`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handleNav('products')}
              className={`block w-full text-left py-2 text-sm font-bold ${activePage === 'products' ? 'text-[#B8860B]' : 'text-stone-800'}`}
            >
              {t.navProducts}
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`block w-full text-left py-2 text-sm font-bold ${activePage === 'about' ? 'text-[#B8860B]' : 'text-stone-800'}`}
            >
              {t.navAboutUs}
            </button>
            <button
              onClick={() => handleNav('my-orders')}
              className={`block w-full text-left py-2 text-sm font-bold ${activePage === 'my-orders' ? 'text-[#B8860B]' : 'text-stone-800'}`}
            >
              {t.navMyOrders}
            </button>
            <button
              onClick={() => handleNav('account')}
              className={`block w-full text-left py-2 text-sm font-bold ${activePage === 'account' ? 'text-[#B8860B]' : 'text-stone-800'}`}
            >
              {t.navAccount}
            </button>
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
              <button
                onClick={() => handleNav('admin')}
                className="text-stone-600 hover:text-[#B8860B] font-semibold"
              >
                {t.navAdmin}
              </button>
              <button
                onClick={() => handleNav('distributor')}
                className="text-stone-600 hover:text-[#B8860B] font-semibold"
              >
                {t.navDistributor}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
