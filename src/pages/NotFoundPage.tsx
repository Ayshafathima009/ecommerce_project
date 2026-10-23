import React from 'react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../assets/images';
import { Home, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 bg-[#FAF9F6]">
      <div className="h-24 w-auto p-1 mx-auto flex items-center justify-center">
        <img
          src={IMAGES.msLogo}
          alt="MERAI SIEME"
          className="h-20 w-auto max-w-[280px] object-contain drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>
      <div>
        <span className="text-xs font-mono uppercase text-[#B8860B] font-bold tracking-wider">
          404 ERROR · PAGE NOT FOUND
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 font-display mt-2">
          Cockpit Navigation Route Lost
        </h1>
        <p className="text-xs text-stone-500 mt-2 max-w-sm mx-auto">
          The requested page URL does not exist or may have been relocated.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigateTo('home')}
          className="btn-gold-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </button>
        <button
          onClick={() => navigateTo('products')}
          className="btn-pearl-secondary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore Products</span>
        </button>
      </div>
    </div>
  );
};
