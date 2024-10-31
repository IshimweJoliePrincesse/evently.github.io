// ToastContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import './use-toast'

// Define the Toast type
type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive'; // Define your toast variants
};

// Create context
const ToastContext = createContext<{
  toast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
} | undefined>(undefined);

// ToastProvider component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    
    // Automatically remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Render the Toasts */}
      <div className="toast-container">
        {toasts.map(({ id, title, description, variant }) => (
          <div key={id} className={`toast ${variant}`}>
            <h4>{title}</h4>
            {description && <p>{description}</p>}
            <button onClick={() => removeToast(id)}>X</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Create a custom hook to use the Toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
