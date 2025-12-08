'use client';

interface ToastMobileProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export default function ToastMobile({ show, message, onClose }: ToastMobileProps) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm
      bg-black text-white text-sm px-4 py-3 rounded-lg shadow-md z-50
      transition-all duration-300
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
    `}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-white font-bold hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
