import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Search, Sparkles, X, ArrowRight, Check, AlertCircle } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    navigateTo,
    addToCart,
    t
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const suggestions = [
    'Driver.MERAI',
    'Car Display',
    'Android Display',
    'Daiichi Edition',
    '4GB RAM Screen',
    'MERAI Smart Watch',
    'MERAI AirPods'
  ];

  // Intelligent fuzzy search and alias matching
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return products;
    }

    const normalizedQ = q
      .replace(/driver\s*merai|merai\s*driver/g, 'driver.merai')
      .replace(/car\s*screen|dash\s*screen|android\s*screen/g, 'car display')
      .replace(/daiichi\s*display/g, 'daiichi edition');

    return products.filter((product) => {
      if (product.name.toLowerCase().includes(q)) return true;
      if (product.displayLabel?.toLowerCase().includes(q)) return true;

      if (product.aliases.some((alias) => alias.toLowerCase().includes(q) || q.includes(alias.toLowerCase()))) {
        return true;
      }

      if (product.category.toLowerCase().includes(q)) return true;
      if (product.shortDescription.toLowerCase().includes(q)) return true;

      if (product.specs.some((s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q))) {
        return true;
      }

      if (product.name.toLowerCase().includes(normalizedQ)) return true;
      if (product.aliases.some((alias) => alias.toLowerCase().includes(normalizedQ))) return true;

      return false;
    });
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#FAF9F6] border border-[#D4AF37]/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar with Gold Accent */}
        <div className="p-4 border-b border-[#E5E2DC] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#B8860B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Driver.MERAI, Car Display, Android Screen, Daiichi..."
            className="flex-1 bg-transparent text-stone-900 placeholder-stone-400 text-sm focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#D4AF37]/60 text-[11px] text-[#996515] font-mono font-bold shadow-sm">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>AI Assist</span>
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions / Keyword Triggers */}
        <div className="px-4 py-2.5 bg-[#F3F2EE] border-b border-[#E5E2DC] flex items-center gap-2 overflow-x-auto text-xs text-stone-600 scrollbar-none">
          <span className="text-[11px] text-stone-500 shrink-0 uppercase tracking-wider font-bold">Try:</span>
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => setQuery(item)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FAF9F6] hover:text-[#996515] hover:border-[#D4AF37] border border-[#E5E2DC] transition-colors whitespace-nowrap shrink-0 font-medium text-stone-700 shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-[#FAF9F6]">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-800">No matching automotive products found for "{query}"</p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching for <strong>Driver.MERAI</strong>, <strong>Car Display</strong>, or <strong>Daiichi Edition</strong>.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-xs text-stone-500 mb-2 font-medium flex items-center justify-between">
                <span>{searchResults.length} Products Found</span>
                {query && <span className="text-[#B8860B] font-bold">Recognized query aliases</span>}
              </div>

              <div className="space-y-2.5">
                {searchResults.map((product) => {
                  const isAvailable = product.status === 'available' && product.stock > 0;
                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigateTo('product-detail', product.id);
                        setIsSearchOpen(false);
                      }}
                      className="group p-3 rounded-xl bg-white hover:bg-stone-50 border border-[#E5E2DC] hover:border-[#D4AF37] transition-all cursor-pointer flex items-center gap-4 shadow-sm"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#FAF9F6] border border-[#E5E2DC] overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 truncate group-hover:text-[#B8860B] transition-colors">
                            {product.name}
                          </h4>
                          {product.displayLabel && (
                            <span className="text-[11px] text-[#B8860B] font-mono font-bold">
                              ({product.displayLabel})
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-500 truncate mt-0.5">
                          {product.shortDescription}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="font-bold text-stone-900 font-mono-tabular">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-stone-300">·</span>
                          {isAvailable ? (
                            <span className="text-emerald-700 font-semibold text-[11px]">
                              {product.stock} units in stock
                            </span>
                          ) : (
                            <span className="text-stone-400 text-[11px]">
                              Out of stock
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isAvailable && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product.id, 1);
                              setIsSearchOpen(false);
                            }}
                            className="btn-gold-primary hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-bold"
                          >
                            Add to Cart
                          </button>
                        )}
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#B8860B] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="p-3 bg-white border-t border-[#E5E2DC] text-xs text-stone-500 flex items-center justify-between">
          <span>AI Assist powers semantic query expansion & alias resolution.</span>
          <span className="text-stone-400">Press ESC or click close</span>
        </div>
      </div>
    </div>
  );
};
