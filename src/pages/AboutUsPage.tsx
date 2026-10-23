import React from 'react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../assets/images';
import { Shield, Award, Cpu, Wrench, Navigation, CheckCircle2 } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12 bg-[#FAF9F6]">
      
      {/* Hero Brand Story */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] font-mono">
          SIEME DRIVE PRESENTING MERAI
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display">
          Automotive Technology & Precision Engineering.
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          At MERAI SIEME, we believe modern vehicles deserve cockpit technology that matches aerospace precision. We engineer automotive-grade infotainment and connected electronics designed to deliver uncompromising clarity, acoustics, and seamless smartphone synergy.
        </p>
      </div>

      {/* Image & Craftsmanship Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl pearl-card p-6 sm:p-10 shadow-md">
        <div className="lg:col-span-6 rounded-xl overflow-hidden aspect-[4/3] bg-white border border-[#E5E2DC]">
          <img
            src={IMAGES.heroCockpit}
            alt="MERAI Engineering"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-stone-700">
          <h2 className="text-2xl font-bold text-stone-900 font-display">
            The SIEME Automotive Standard
          </h2>
          <p className="leading-relaxed">
            Generic commercial tablets fail under extreme automotive temperature variations, vibration fatigue, and battery draining standby states. MERAI hardware is custom-fabricated with high-grade automotive silicon, certified for operating temperatures between <strong>-20°C and +75°C</strong>.
          </p>
          <p className="leading-relaxed">
            Our flagship <strong>Driver.MERAI Daiichi Edition</strong> integrates lossless CANBUS vehicle telemetry, steering wheel control matching, and 48-band DSP studio audio without requiring vehicle wire slicing.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-[#E5E2DC] shadow-sm">
              <strong className="text-stone-900 block text-sm font-mono font-bold">100%</strong>
              <span className="text-stone-500">Zero-Wire-Cutting Guarantee</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E5E2DC] shadow-sm">
              <strong className="text-[#B8860B] block text-sm font-mono font-bold">2-Year</strong>
              <span className="text-stone-500">Pan-India Doorstep Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl pearl-card space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-display">Octa-Core Automotive SoC</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            4GB high-bandwidth RAM and 64GB high-endurance storage ensure rapid app launching, split-screen multitasking, and lag-free navigation.
          </p>
        </div>

        <div className="p-6 rounded-2xl pearl-card space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-display">Acoustic Excellence</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Equipped with 48-band digital sound processing (DSP), sub-bass time delay correction, and MOSFET amplification to bring studio sound to your car.
          </p>
        </div>

        <div className="p-6 rounded-2xl pearl-card space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shadow-sm">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-display">Certified Fitment Network</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Backed by a verified network of 250+ installation partners across major Indian metropolitan hubs and Tier-1 cities.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center p-8 rounded-2xl pearl-card space-y-4 shadow-md">
        <h3 className="text-xl font-bold text-stone-900 font-display">
          Ready to experience the Driver.MERAI difference?
        </h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          Order online at <strong>merai.sieme.in</strong> with free express shipping and 2-year warranty.
        </p>
        <button
          onClick={() => navigateTo('product-detail', 'merai-car-display-daiichi')}
          className="btn-gold-primary px-6 py-3 rounded-xl font-bold text-xs shadow-md"
        >
          Explore Driver.MERAI (₹10,000)
        </button>
      </div>

    </div>
  );
};
