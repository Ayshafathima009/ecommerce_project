import React from 'react';
import { useStore } from '../context/StoreContext';
import { Shield, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8 bg-[#FAF9F6]">
      <div className="border-b border-[#E5E2DC] pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B8860B] mb-1 font-bold">
          <Shield className="w-4 h-4" />
          <span>LEGAL & COMPLIANCE · DOMAIN: merai.sieme.in</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Effective Date: October 2026 · SIEME Drive Automotive Technologies India Pvt Ltd
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">1. Scope and Overview</h2>
          <p>
            This Privacy Policy governs the manner in which MERAI SIEME ("we", "our", or "us"), operated under the official domain <strong>merai.sieme.in</strong>, collects, stores, processes, and protects customer information provided during purchase of Driver.MERAI automotive displays and accessories.
          </p>
        </section>

        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">2. Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Customer identity & contact data: Full Name, Phone Number, Delivery Address, and Email.</li>
            <li>Vehicle specifications: Vehicle make, model, manufacturing year, and dashboard dimensions for harness fitment verification.</li>
            <li>Transaction records: Order ID, purchased SKUs, quantity, tax invoices, and fulfillment history.</li>
            <li>We do NOT store plain-text payment credentials, credit card numbers, or CVVs.</li>
          </ul>
        </section>

        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">3. How Data is Utilized</h2>
          <p>
            Information collected is strictly utilized to process your order, deliver hardware via authorized logistics partners (BlueDart/DTDC), dispatch automated invoice documentation, and validate your 2-Year Pan-India warranty claims.
          </p>
        </section>

        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">4. Data Security & Storage</h2>
          <p>
            All communications are encrypted using Transport Layer Security (TLS 1.3 / 256-bit encryption). Customer account records are stored using modern cryptographic salt and hash algorithms (Argon2 / PBKDF2).
          </p>
        </section>

        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">5. Contact Grievance Officer</h2>
          <p>
            If you have inquiries regarding your personal information, reach out to our privacy desk at: <strong>privacy@sieme.in</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8 bg-[#FAF9F6]">
      <div className="border-b border-[#E5E2DC] pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B8860B] mb-1 font-bold">
          <FileText className="w-4 h-4" />
          <span>TERMS OF SERVICE · DOMAIN: merai.sieme.in</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
          Terms & Conditions of Sale
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Official Terms for SIEME DRIVE presents MERAI E-Commerce Store
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">1. Agreement to Terms</h2>
          <p>
            By accessing or ordering hardware from <strong>merai.sieme.in</strong>, you agree to be bound by these Terms of Service and all applicable automotive consumer regulations in India.
          </p>
        </section>

        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">2. Product Availability & Stock Allocation</h2>
          <p>
            Active products like the <strong>MERAI Daiichi Edition Car Display (Driver.MERAI)</strong> are sold subject to live factory inventory allocation (initial batch: 200 units). Inactive preview products (MERAI AirPods, Smart Watch, AI Robot) are non-purchasable until officially authorized and updated by the administrator.
          </p>
        </section>

        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">3. Pricing & Taxes</h2>
          <p>
            All listed prices (e.g. ₹10,000 for Driver.MERAI) are in Indian National Rupees (INR) and include applicable Goods and Services Tax (GST 18%). Official tax invoices are provided with each dispatched order.
          </p>
        </section>

        <section className="space-y-2 pearl-card p-6 rounded-2xl shadow-sm">
          <h2 className="text-base font-bold text-stone-900">4. 2-Year Replacement Warranty</h2>
          <p>
            SIEME DRIVE warrants that Driver.MERAI hardware is free from manufacturing defects in materials and workmanship for a period of two (2) years from the date of initial purchase, provided installation utilized OEM socket-to-socket couplers without wire tampering.
          </p>
        </section>
      </div>
    </div>
  );
};
