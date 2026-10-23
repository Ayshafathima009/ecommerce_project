import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Star,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    navigateTo,
    addToast,
    t
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isRotating, setIsRotating] = useState(true);

  // Automatic image rotation every 3.5 seconds (within 2-5s requirement)
  useEffect(() => {
    if (!product || product.images.length <= 1 || !isRotating) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % product.images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [product, isRotating]);

  // Reset image and quantity on product switch
  useEffect(() => {
    setActiveImageIdx(0);
    setQuantity(1);
  }, [product.id]);

  const isAvailable = product.status === 'available' && product.stock > 0;
  const relatedProducts = products.filter((p) => p.id !== product.id);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty < 1) return;
    if (newQty > product.stock) {
      addToast(`Only ${product.stock} units currently available in stock.`, 'warning');
      return;
    }
    setQuantity(newQty);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12 bg-[#FAF9F6]">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigateTo('home')} className="hover:text-stone-800">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('products')} className="hover:text-stone-800">
          Products
        </button>
        <span>/</span>
        <span className="text-stone-800 truncate font-semibold">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Gallery Left, Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Auto-Rotating Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className="relative rounded-2xl bg-white border border-[#E5E2DC] overflow-hidden aspect-[4/3] group shadow-sm"
            onMouseEnter={() => setIsRotating(false)}
            onMouseLeave={() => setIsRotating(true)}
          >
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.displayLabel && (
                <span className="bg-[#1C1917]/90 backdrop-blur-md border border-[#D4AF37] text-[#F5D76E] text-xs font-bold px-3 py-1 rounded-md font-mono shadow">
                  {product.displayLabel}
                </span>
              )}
            </div>

            {/* Rotation Control & Counter */}
            {product.images.length > 1 && (
              <>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-[#E5E2DC] text-[11px] text-stone-700 font-semibold px-2.5 py-1 rounded-md flex items-center gap-2 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span>Auto-rotating ({activeImageIdx + 1}/{product.images.length})</span>
                </div>

                <div className="absolute inset-y-0 left-3 flex items-center">
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-900 border border-[#E5E2DC] shadow transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute inset-y-0 right-3 flex items-center">
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev + 1) % product.images.length)}
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-900 border border-[#E5E2DC] shadow transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setIsRotating(false);
                  }}
                  className={`rounded-xl overflow-hidden aspect-[4/3] bg-white border transition-all shadow-sm ${
                    idx === activeImageIdx
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                      : 'border-[#E5E2DC] hover:border-stone-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-3.5 rounded-xl pearl-card flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#B8860B] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-stone-900">Free Express Shipping</div>
                <div className="text-stone-500 text-[11px]">Dispatches in 24 hours</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl pearl-card flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#B8860B] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-stone-900">2-Year SIEME Warranty</div>
                <div className="text-stone-500 text-[11px]">Pan-India door service</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl pearl-card flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-[#B8860B] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-stone-900">7-Day Replacement</div>
                <div className="text-stone-500 text-[11px]">Zero hassle verification</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 rounded-2xl pearl-card border border-[#E5E2DC] space-y-5 shadow-md">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="text-[#B8860B] font-bold tracking-wider uppercase">
                  SIEME DRIVE Automotive
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-stone-900 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                {product.name}
              </h1>

              {/* Reviews & Model rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-stone-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-stone-300">·</span>
                <span className="text-stone-500">{product.reviewCount} Ratings</span>
                <span className="text-stone-300">·</span>
                <span className="text-[#B8860B] font-bold">100% Genuine SIEME</span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E2DC] space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-stone-900 font-mono-tabular">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono-tabular">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                    (Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')})
                  </span>
                )}
              </div>
              <div className="text-[11px] text-stone-500">
                Inclusive of all taxes & GST invoice · Free express delivery
              </div>
            </div>

            {/* Stock Availability Indicator */}
            <div>
              {isAvailable ? (
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>In Stock — {product.stock} units ready for immediate dispatch</span>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Currently Out of Stock</div>
                    <div className="text-amber-700 text-[11px] mt-0.5">
                      Batch production scheduled. Our administrator will update stock soon.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RAM / Storage Configuration Tag if Car Display */}
            {(product.ram || product.storage) && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">
                  Hardware Configuration
                </label>
                <div className="flex gap-2">
                  <div className="px-3 py-2 rounded-lg bg-stone-100 border border-stone-300 text-xs font-mono font-bold text-stone-900">
                    {product.ram} RAM + {product.storage} ROM
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector (Active only when in stock) */}
            {isAvailable && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="font-bold text-stone-700">{t.quantity}</label>
                  <span className="text-stone-500 text-[11px]">Max {product.stock} units</span>
                </div>

                <div className="flex items-center w-36 rounded-xl border border-stone-300 bg-white p-1 shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-1.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-mono font-bold text-stone-900 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-1.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                disabled={!isAvailable}
                onClick={() => addToCart(product.id, quantity)}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  isAvailable
                    ? 'btn-gold-primary'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAvailable ? t.addToCart : t.outOfStock}</span>
              </button>

              <button
                disabled={!isAvailable}
                onClick={() => {
                  if (addToCart(product.id, quantity)) {
                    navigateTo('checkout');
                  }
                }}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  isAvailable
                    ? 'btn-pearl-secondary'
                    : 'bg-stone-100 text-stone-300 cursor-not-allowed border border-stone-200'
                }`}
              >
                <span>{isAvailable ? t.buyNow : 'Currently Unavailable'}</span>
                {isAvailable && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Product Specifications & Engineering Breakdown */}
      <div className="pearl-card rounded-2xl p-6 sm:p-10 space-y-8 border border-[#E5E2DC]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mb-1">
            {t.specifications}
          </h2>
          <p className="text-xs text-stone-500">
            Technical architecture verified by SIEME DRIVE automotive testing labs.
          </p>
        </div>

        {/* Specifications Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 border-t border-[#E5E2DC] pt-6">
          {product.specs.map((spec, i) => (
            <div
              key={i}
              className="py-2.5 border-b border-[#E5E2DC] flex items-center justify-between text-xs"
            >
              <span className="text-stone-500 font-medium">{spec.label}</span>
              <span className="text-stone-900 font-bold text-right max-w-[60%] font-mono-tabular">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Features & Benefits List */}
        <div className="pt-6 border-t border-[#E5E2DC]">
          <h3 className="text-lg font-bold text-stone-900 font-display mb-4">
            {t.featuresAndBenefits}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#E5E2DC] flex items-start gap-3 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-[#FAF9F6] border border-[#D4AF37] text-[#B8860B] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-stone-700 leading-relaxed font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 font-display">
            {t.relatedProducts}
          </h2>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs text-[#B8860B] hover:text-[#996515] font-bold"
          >
            View Full Catalogue →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => {
            const relAvailable = rel.status === 'available' && rel.stock > 0;
            return (
              <div
                key={rel.id}
                onClick={() => navigateTo('product-detail', rel.id)}
                className="group pearl-card pearl-card-hover rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-xl overflow-hidden bg-white aspect-[4/3] mb-3 border border-[#E5E2DC]">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E5E2DC] flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm font-mono-tabular">
                    ₹{rel.price.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[11px] font-bold ${relAvailable ? 'text-emerald-700' : 'text-stone-400'}`}>
                    {relAvailable ? 'Available' : 'Out of stock'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
