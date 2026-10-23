import React from 'react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../assets/images';
import { ShieldCheck, Cpu, Headphones, Award, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, t } = useStore();

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E5E2DC] text-stone-600 text-xs">
      {/* 4 Value Pillars Banner — Pearl Silver Surface */}
      <div className="border-b border-[#E5E2DC] bg-[#F3F2EE] py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#B8860B] shadow-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Automotive Grade</h4>
              <p className="text-stone-500 text-xs mt-0.5">High-endurance octa-core silicon rated for extreme cabin temperatures.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#B8860B] shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">2-Year Direct Warranty</h4>
              <p className="text-stone-500 text-xs mt-0.5">Comprehensive door-step replacement support across India.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#B8860B] shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">OEM Plug & Play</h4>
              <p className="text-stone-500 text-xs mt-0.5">Lossless socket-to-socket vehicle harness with zero wire slicing.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#B8860B] shadow-sm">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Dedicated Tech Desk</h4>
              <p className="text-stone-500 text-xs mt-0.5">Expert installation guidance via video call & local fitment partners.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-auto rounded-xl bg-white border border-[#D4AF37]/50 px-2 py-1 shadow-sm flex items-center justify-center">
                <img
                  src={IMAGES.msLogo}
                  alt="MERAI SIEME"
                  className="h-11 w-auto max-w-[180px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed max-w-sm">
              SIEME DRIVE presenting MERAI. Pioneers in high-precision automotive cockpit displays, intelligent vehicular infotainment, and connected mobility electronics.
            </p>

            <div className="text-xs text-stone-800 font-medium">
              Official Webstore: <span className="text-[#B8860B] font-mono font-bold">merai.sieme.in</span>
            </div>

            <div className="space-y-1.5 pt-1 text-stone-600 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>support@sieme.in · sales@merai.sieme.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>1800-419-SIEME (Toll-Free, 9 AM – 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>SIEME Automotive Tech Tower, Outer Ring Rd, Bangalore 560103</span>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              Automotive Tech
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('product-detail', 'merai-car-display-daiichi')}
                  className="hover:text-[#B8860B] transition-colors text-left"
                >
                  Driver.MERAI Car Display (4GB/64GB)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('product-detail', 'merai-airpods-pro')}
                  className="hover:text-[#B8860B] transition-colors text-left"
                >
                  MERAI AirPods
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('product-detail', 'merai-smart-watch')}
                  className="hover:text-[#B8860B] transition-colors text-left"
                >
                  MERAI Smart Watch
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('product-detail', 'merai-ai-robot')}
                  className="hover:text-[#B8860B] transition-colors text-left"
                >
                  MERAI AI Robot Companion
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="text-[#B8860B] hover:text-[#996515] font-bold pt-1 block"
                >
                  View All Products →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              Customer Services
            </h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('my-orders')} className="hover:text-[#B8860B] transition-colors">
                  My Orders & Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#B8860B] transition-colors">
                  Customer Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#B8860B] transition-colors">
                  Fitment & Installation Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#B8860B] transition-colors">
                  About SIEME DRIVE
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#B8860B] transition-colors">
                  Contact Support Team
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Legal */}
          <div>
            <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              Network & Legal
            </h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('distributor')} className="text-[#B8860B] hover:text-[#996515] font-bold">
                  Distributor Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-stone-700 hover:text-[#B8860B]">
                  Admin Command Center
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-[#B8860B] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-[#B8860B] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <span className="text-stone-500">ISO 9001:2015 Automotive Certified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-[#E5E2DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} MERAI SIEME — SIEME DRIVE. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-700">merai.sieme.in</span>
            <span>·</span>
            <span>Made in India</span>
            <span>·</span>
            <span className="text-stone-600">Official Flagship E-Commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
