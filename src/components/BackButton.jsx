import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function BackButton({ 
  label = 'Back', 
  onClick, 
  fallbackView = 'catalogue', 
  className = '',
  ariaLabel = 'Return to previous page'
}) {
  const { goBack } = useShop();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      goBack(fallbackView);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-card/80 hover:bg-champagne/15 border border-champagne/25 hover:border-champagne/60 text-ivory-soft hover:text-champagne transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-md shadow-sm hover:shadow-luxury hover:-translate-x-0.5 active:translate-x-0 active:scale-95 cursor-pointer ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 text-champagne transition-transform duration-300 group-hover:-translate-x-1" />
      <span>{label}</span>
    </button>
  );
}
