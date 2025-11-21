import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-display font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-ayni-lilac-500 text-white hover:bg-ayni-lilac-700 focus:ring-ayni-lilac-400 shadow-lg shadow-ayni-lilac-200 border-b-4 border-ayni-lilac-700 active:border-b-0 active:translate-y-1",
    secondary: "bg-ayni-rose-500 text-white hover:bg-ayni-rose-600 focus:ring-ayni-rose-400 shadow-lg shadow-ayni-rose-200 border-b-4 border-ayni-rose-700 active:border-b-0 active:translate-y-1",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md",
    ghost: "bg-transparent hover:bg-ayni-lilac-100 text-ayni-lilac-700",
    outline: "border-2 border-ayni-lilac-500 text-ayni-lilac-700 hover:bg-ayni-lilac-50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-6 text-xl h-24" // Extra large for accessibility
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};