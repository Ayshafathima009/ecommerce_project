import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderColor = 'border-[#D4AF37]/50';
        let iconColor = 'text-[#B8860B]';
        let bgColor = 'bg-[#FAF9F6]';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderColor = 'border-emerald-500/50';
          iconColor = 'text-emerald-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderColor = 'border-amber-500/50';
          iconColor = 'text-amber-600';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderColor = 'border-rose-500/50';
          iconColor = 'text-rose-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl ${bgColor} border ${borderColor} shadow-xl shadow-stone-300/40 backdrop-blur-md flex items-start gap-3 transition-all animate-in slide-in-from-bottom-2 duration-200`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
            <div className="flex-1 text-xs text-stone-800 leading-relaxed font-semibold">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
