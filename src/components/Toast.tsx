import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 left-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-emerald-600 text-white border-emerald-500';
        let Icon = CheckCircle2;

        if (toast.type === 'error') {
          bgColor = 'bg-rose-600 text-white border-rose-500';
          Icon = AlertCircle;
        } else if (toast.type === 'info') {
          bgColor = 'bg-slate-800 text-white border-slate-700';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl border ${bgColor} transition-all duration-300 transform translate-y-0 opacity-100 backdrop-blur-md`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors ml-1"
              aria-label="بستن اعلان"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
