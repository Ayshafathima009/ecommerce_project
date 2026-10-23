import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../assets/images';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
  Radio,
  Wifi,
  Navigation,
  Car,
  Check,
  Star,
  ArrowRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo, addToCart, t } = useStore();

  // Promotional image slider
  const slides = [
    {
      id: 1,
      image: IMAGES.heroCockpit,
      title: "SIEME DRIVE presenting MERAI",
      subtitle: "Next-Generation Automotive Intelligence.",
      tag: "FLAGSHIP AUTOMOTIVE SYSTEM",
      desc: "Transform your vehicle cockpit into an intelligent high-definition digital command center with the MERAI Daiichi Edition.",
      actionText: "Order Driver.MERAI — ₹10,000",
      targetId: "merai-car-display-daiichi"
    },
    {
      id: 2,
      image: IMAGES.carDisplayDash,
      title: "Driver.MERAI In-Dash Integration",
      subtitle: "Pure Seamless Cockpit Elegance.",
      tag: "WIRELESS CARPLAY & ANDROID AUTO",
      desc: "Lossless OEM plug-and-play harness designed for 400+ vehicle models. Instant wireless mirroring and steering wheel control.",
      actionText: "Explore Specifications",
      targetId: "merai-car-display-daiichi"
    },
    {
      id: 3,
      image: IMAGES.carDisplayBox,
      title: "Daiichi Edition Hardware Suite",
      subtitle: "Complete Uncompromising Package.",
      tag: "4GB RAM + 64GB STORAGE",
      desc: "Includes high-speed GNSS antenna, dual USB harnesses, 48-band DSP output, and 2-Year comprehensive warranty.",
      actionText: "View Unboxing & Specs",
      targetId: "merai-car-display-daiichi"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const activeProduct = products.find((p) => p.id === 'merai-car-display-daiichi');
  const otherProducts = products.filter((p) => p.id !== 'merai-car-display-daiichi');

  return (
    <div className="space-y-16 pb-16 bg-[#FAF9F6]">
      
      {/* 1. Hero Campaign Slider */}
      <section 
        className="relative overflow-hidden bg-[#1C1917] border-b border-[#E5E2DC]"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative min-h-[500px] sm:min-h-[580px] lg:h-[620px] flex items-center">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Backdrop Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              
              {/* Measured Luxury Scrim */}
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-950/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/40" />

              {/* Slide Content */}
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 h-full flex flex-col justify-center py-12">
                <div className="max-w-xl space-y-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#F5D76E] font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span>{slide.tag}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
                    {slide.subtitle}
                  </h1>

                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
                    {slide.desc}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => {
                        if (slide.targetId) {
                          navigateTo('product-detail', slide.targetId);
                        }
                      }}
                      className="btn-gold-primary px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2"
                    >
                      <span>{slide.actionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigateTo('products')}
                      className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-100 font-semibold text-sm border border-white/30 backdrop-blur-sm transition-colors"
                    >
                      {t.heroCtaExplore}
                    </button>
                  </div>

                  <div className="pt-2 flex items-center gap-4 text-xs text-stone-300">
                    <span className="flex items-center gap-1.5 text-[#F5D76E] font-bold">
                      <Check className="w-3.5 h-3.5" /> 200 Units Initial Batch
                    </span>
                    <span className="text-stone-500">·</span>
                    <span>Pan-India Doorstep Dispatch</span>
                    <span className="text-stone-500">·</span>
                    <span>2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-black border border-[#D4AF37]/50 text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1.5 px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-stone-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-black border border-[#D4AF37]/50 text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Flagship Active Product Showcase: Driver.MERAI Daiichi Edition */}
      {activeProduct && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                <span>SIEME DRIVE Flagship Launch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                Featured Automotive Cockpit
              </h2>
            </div>
            <div className="text-xs text-stone-500 font-medium">
              Automotive Technology · Model: Driver.MERAI
            </div>
          </div>

          <div className="pearl-card rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#E5E2DC]">
            {/* Gallery Preview Left */}
            <div className="lg:col-span-6 space-y-4">
              <div 
                onClick={() => navigateTo('product-detail', activeProduct.id)}
                className="relative rounded-xl overflow-hidden bg-[#FAF9F6] border border-[#E5E2DC] aspect-[4/3] group cursor-pointer shadow-inner"
              >
                <img
                  src={activeProduct.images[0]}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1C1917]/90 backdrop-blur-md border border-[#D4AF37] text-[#F5D76E] text-xs font-bold px-3 py-1 rounded-md font-mono shadow">
                  {activeProduct.displayLabel}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 border border-emerald-500/50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{activeProduct.stock} Units In Stock</span>
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-3 gap-3">
                {activeProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateTo('product-detail', activeProduct.id)}
                    className="rounded-xl overflow-hidden border border-[#E5E2DC] hover:border-[#D4AF37] aspect-[4/3] bg-white transition-all shadow-sm"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details & Actions Right */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="text-[#B8860B] font-bold uppercase tracking-wider">Automotive Cockpit</span>
                <span>·</span>
                <div className="flex items-center text-amber-500 gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-stone-800">{activeProduct.rating}</span>
                  <span className="text-stone-500 font-medium">({activeProduct.reviewCount} verified ratings)</span>
                </div>
              </div>

              <h3 
                onClick={() => navigateTo('product-detail', activeProduct.id)}
                className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display hover:text-[#B8860B] cursor-pointer transition-colors"
              >
                {activeProduct.name}
              </h3>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs py-3 border-y border-[#E5E2DC]">
                <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E5E2DC]">
                  <span className="text-stone-500 block">Memory</span>
                  <strong className="text-stone-900 text-sm font-mono">{activeProduct.ram}</strong>
                </div>
                <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E5E2DC]">
                  <span className="text-stone-500 block">Storage</span>
                  <strong className="text-stone-900 text-sm font-mono">{activeProduct.storage}</strong>
                </div>
                <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E5E2DC]">
                  <span className="text-stone-500 block">Resolution</span>
                  <strong className="text-stone-900 text-sm">10.1" 2K IPS</strong>
                </div>
                <div className="bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E5E2DC]">
                  <span className="text-stone-500 block">CarPlay</span>
                  <strong className="text-[#B8860B] text-sm">Wireless</strong>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeProduct.shortDescription}
              </p>

              {/* Price Block */}
              <div className="flex items-baseline gap-4 pt-1">
                <span className="text-3xl font-black text-stone-900 font-mono-tabular">
                  ₹{activeProduct.price.toLocaleString('en-IN')}
                </span>
                {activeProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono-tabular">
                    ₹{activeProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-bold bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                  Save ₹{(activeProduct.originalPrice! - activeProduct.price).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => addToCart(activeProduct.id, 1)}
                  className="btn-gold-primary flex-1 min-w-[140px] py-3.5 px-6 rounded-xl font-bold text-sm text-center"
                >
                  {t.addToCart}
                </button>
                <button
                  onClick={() => {
                    addToCart(activeProduct.id, 1);
                    navigateTo('checkout');
                  }}
                  className="btn-pearl-secondary flex-1 min-w-[140px] py-3.5 px-6 rounded-xl font-bold text-sm text-center shadow-sm"
                >
                  {t.buyNow}
                </button>
                <button
                  onClick={() => navigateTo('product-detail', activeProduct.id)}
                  className="py-3.5 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold transition-colors border border-stone-300"
                >
                  {t.viewDetails}
                </button>
              </div>

              <div className="text-[11px] text-stone-500 pt-1 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>GST Tax Invoice provided · 7-Day Replacement Policy · Free Express Shipping</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Inactive Products Section (Light Grey, Out of Stock, Disabled Buttons) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
              Upcoming Innovations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
              MERAI Electronic Series
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-md">
            Production batches undergoing SIEME DRIVE acoustic and vehicular telemetry certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProducts.map((product) => {
            const isOutOfStock = product.stock <= 0 || product.status === 'out_of_stock';
            return (
              <div
                key={product.id}
                onClick={() => navigateTo('product-detail', product.id)}
                className={`group rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between ${
                  isOutOfStock
                    ? 'bg-[#F2F1ED] border border-[#DDD9D2] text-stone-400 opacity-80 hover:opacity-95'
                    : 'pearl-card pearl-card-hover'
                }`}
              >
                <div>
                  {/* Image container */}
                  <div className="relative rounded-xl overflow-hidden bg-white aspect-[4/3] mb-4 border border-[#E5E2DC]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isOutOfStock ? 'grayscale-[50%] opacity-70 group-hover:opacity-85' : 'group-hover:scale-105'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Explicit Out of Stock label */}
                    {isOutOfStock && (
                      <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-200 text-[11px] font-bold px-2.5 py-1 rounded shadow">
                        {t.outOfStock}
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                    {product.displayLabel || product.category}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E2DC] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-stone-400">Scheduled Price</div>
                    <div className="text-lg font-extrabold text-stone-800 font-mono-tabular">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Disabled purchase button for out of stock items */}
                  <button
                    disabled={isOutOfStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isOutOfStock) addToCart(product.id, 1);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isOutOfStock
                        ? 'bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300'
                        : 'btn-gold-primary'
                    }`}
                  >
                    {isOutOfStock ? t.outOfStock : t.addToCart}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Benefits and Automotive Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="pearl-card rounded-2xl p-8 sm:p-12 border border-[#E5E2DC]">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] font-mono">
              SIEME DRIVE AUTOMOTIVE STANDARDS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display">
              Why Discerning Drivers Choose Driver.MERAI
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Unlike generic aftermarket tablets, MERAI systems are engineered specifically for automotive environments with high thermal tolerance, low latency, and CANBUS compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white border border-[#E5E2DC] space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Instant Boot in 1.2 Seconds</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Automotive sleep-wake system starts immediately with vehicle ignition. No frustrating boot delays while reversing out of your driveway.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5E2DC] space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
                <Wifi className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">5GHz Wireless Phone Projection</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Connect your iPhone or Android phone cordlessly via high-bandwidth 5GHz Wi-Fi for lag-free Google Maps, Apple Maps, and music playback.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5E2DC] space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">48-Band DSP Studio Equalizer</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dedicated digital sound hardware with time-alignment delays and subwoofer crossovers to optimize your factory speakers into an acoustic hall.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5E2DC] space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">CANBUS Vehicle Telemetry</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Displays live vehicle health, door open status, real-time speed, air conditioner controls, and dynamic trajectory reverse camera guides.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5E2DC] space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
                <Navigation className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Quad-Satellite GNSS Positioning</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                High-precision GPS, GLONASS, Galileo, and BeiDou antenna locks your coordinates reliably under flyovers, tunnels, and deep mountain passes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5E2DC] space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">No Wire Cutting Guarantee</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                SIEME plug-and-play couplers plug directly into your car factory wiring loom, preserving your vehicle's OEM manufacturer electrical warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Support & Vehicle Fitment Assistance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 rounded-2xl pearl-card border border-[#E5E2DC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
              Need Fitment Assistance?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Not sure if Driver.MERAI fits your car model?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Our SIEME certified automotive engineers verify fitment for Maruti, Hyundai, Tata, Mahindra, Honda, Toyota, Kia, Volkswagen, and more within minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="btn-gold-primary px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md"
            >
              Verify Vehicle Compatibility
            </button>
            <button
              onClick={() => navigateTo('distributor')}
              className="px-5 py-3 rounded-xl btn-pearl-secondary text-xs sm:text-sm font-semibold"
            >
              Dealer / Distributor Inquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
