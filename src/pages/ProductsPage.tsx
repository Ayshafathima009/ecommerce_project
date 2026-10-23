import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Star, ShoppingBag, Eye, SlidersHorizontal, Check } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, navigateTo, addToCart, t } = useStore();
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 bg-[#FAF9F6]">
      
      {/* Title & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E2DC] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] font-mono">
            MERAI SIEME AUTOMOTIVE CATALOGUE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display mt-1">
            Engineered Electronics & Cockpit Displays
          </h1>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Explore genuine SIEME DRIVE hardware. Designed for seamless vehicle telemetry, wireless phone projection, and studio audio.
          </p>
        </div>

        {/* Filter buttons & sort */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-white border border-[#E5E2DC] rounded-xl text-xs shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'all' ? 'bg-[#1C1917] text-[#F5D76E] shadow-sm' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              All Hardware
            </button>
            <button
              onClick={() => setFilter('car_display')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'car_display' ? 'bg-[#1C1917] text-[#F5D76E] shadow-sm' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Car Displays
            </button>
            <button
              onClick={() => setFilter('audio')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'audio' ? 'bg-[#1C1917] text-[#F5D76E] shadow-sm' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Audio
            </button>
            <button
              onClick={() => setFilter('wearable')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'wearable' ? 'bg-[#1C1917] text-[#F5D76E] shadow-sm' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Wearables
            </button>
            <button
              onClick={() => setFilter('robotics')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'robotics' ? 'bg-[#1C1917] text-[#F5D76E] shadow-sm' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Robotics
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-white border border-[#E5E2DC] text-stone-700 text-xs font-semibold focus:outline-none focus:border-[#D4AF37] shadow-sm"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid: 3 columns desktop, 2 columns tablet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isAvailable = product.status === 'available' && product.stock > 0;
          return (
            <div
              key={product.id}
              onClick={() => navigateTo('product-detail', product.id)}
              className={`group rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between ${
                isAvailable
                  ? 'pearl-card pearl-card-hover'
                  : 'bg-[#F2F1ED] border border-[#DDD9D2] text-stone-400 opacity-80 hover:opacity-95'
              }`}
            >
              <div>
                {/* Product Image */}
                <div className="relative rounded-xl overflow-hidden bg-white aspect-[4/3] mb-4 border border-[#E5E2DC] shadow-inner">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isAvailable ? 'group-hover:scale-105' : 'grayscale-[50%] opacity-70'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Stock status badge */}
                  {isAvailable ? (
                    <div className="absolute top-3 left-3 bg-white/95 border border-emerald-500/60 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{product.stock} in Stock</span>
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-200 text-[11px] font-bold px-2.5 py-1 rounded-md shadow">
                      {t.outOfStock}
                    </div>
                  )}

                  {product.displayLabel && (
                    <div className="absolute bottom-3 right-3 bg-[#1C1917]/90 backdrop-blur-md border border-[#D4AF37] text-[#F5D76E] text-[11px] font-mono font-bold px-2 py-0.5 rounded shadow">
                      {product.displayLabel}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="uppercase tracking-wider font-bold text-[#B8860B]">
                    {product.category.replace('_', ' ')}
                  </span>
                  <span>·</span>
                  <div className="flex items-center text-amber-500 gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-stone-800 font-bold">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors">
                  {product.name}
                </h3>

                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Specs pill tags */}
                {(product.ram || product.storage) && (
                  <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-stone-700">
                    <span className="bg-[#FAF9F6] px-2 py-1 rounded border border-[#E5E2DC]">
                      RAM: {product.ram}
                    </span>
                    <span className="bg-[#FAF9F6] px-2 py-1 rounded border border-[#E5E2DC]">
                      ROM: {product.storage}
                    </span>
                  </div>
                )}
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 mt-4 border-t border-[#E5E2DC] flex items-center justify-between">
                <div>
                  <div className="text-lg font-black text-stone-900 font-mono-tabular">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                  {product.originalPrice && (
                    <div className="text-[11px] text-stone-400 line-through font-mono-tabular">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!isAvailable}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isAvailable) addToCart(product.id, 1);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isAvailable
                        ? 'btn-gold-primary'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAvailable ? t.addToCart : t.outOfStock}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
