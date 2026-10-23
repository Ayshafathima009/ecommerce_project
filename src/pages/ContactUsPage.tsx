import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [carModel, setCarModel] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your inquiry has been received. A SIEME engineer will contact you shortly.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-10 bg-[#FAF9F6]">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] font-mono">
          SIEME DRIVE CUSTOMER DESK
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display">
          We're Here to Help Your Drive
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Have questions about Driver.MERAI fitment, CANBUS coupling, or bulk dealer shipments? Connect with our technical engineers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl pearl-card space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Official Contact Channels
            </h3>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Toll-Free Fitment Helpline</strong>
                  <span>1800-419-SIEME (74363)</span>
                  <div className="text-[11px] text-stone-500 font-medium">Mon – Sat: 9:00 AM – 8:00 PM IST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Email Inquiries</strong>
                  <span>support@sieme.in</span>
                  <div className="text-[11px] text-stone-500 font-medium">Corporate Sales: sales@merai.sieme.in</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Corporate Headquarters</strong>
                  <span>SIEME Drive Automotive Technologies India Pvt Ltd</span>
                  <div className="text-[11px] text-stone-600">
                    Technology Tower, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl pearl-card border border-[#D4AF37]/40 text-xs text-stone-800 space-y-2 shadow-sm">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
              <span>Doorstep Fitment in 40+ Cities</span>
            </h4>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              Upon placing your order for Driver.MERAI on <strong>merai.sieme.in</strong>, you can optionally request an authorized SIEME technician for doorstep installation in Bengaluru, NCR, Mumbai, Hyderabad, Pune, Chennai, and Kolkata.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl pearl-card space-y-5 shadow-md">
            <h3 className="text-lg font-bold text-stone-900 font-display">
              Send Fitment or Technical Inquiry
            </h3>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">Inquiry Received</h4>
                <p className="text-xs text-stone-700">
                  Thank you, <strong>{name}</strong>. Our vehicle specialist will review compatibility for your <strong>{carModel || 'vehicle'}</strong> and reply to {email} within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg btn-pearl-secondary text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-bold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 mb-1 font-bold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rohan@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-bold">Car Make, Model & Year</label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="e.g. Hyundai Creta 2023"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-bold">Your Message or Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your query regarding dashboard dimensions, CANBUS couplers, reverse camera integration, or warranty..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to SIEME Engineering Desk</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
