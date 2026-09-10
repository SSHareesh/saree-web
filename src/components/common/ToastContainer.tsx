import { useToast } from '../../context/ToastContext';
import { X, Check, Info, AlertCircle } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-20 right-4 z-[100] flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-white border border-border-light px-4 py-3 shadow-sm animate-toast-in min-w-[280px] max-w-[380px]"
          role="alert"
        >
          {toast.type === 'success' && (
            <Check size={16} className="text-success flex-shrink-0" />
          )}
          {toast.type === 'info' && (
            <Info size={16} className="text-forest flex-shrink-0" />
          )}
          {toast.type === 'error' && (
            <AlertCircle size={16} className="text-discount flex-shrink-0" />
          )}
          <span className="text-sm text-text-primary flex-1">
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
