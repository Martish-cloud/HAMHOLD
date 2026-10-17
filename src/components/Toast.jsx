import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Check, ShoppingBag } from 'lucide-react';
import { formatINR } from '../data/products';

export default function Toast() {
  const { toastData } = useShop();

  if (!toastData) return null;

  // Rich Product Added Toast
  if (toastData.productName) {
    return (
      <div
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 animate-fade-in flex items-center gap-3.5 p-3.5 pr-5 rounded-2xl bg-obsidian-surface/98 border border-champagne/40 text-ivory shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(214,194,154,0.15)] backdrop-blur-xl max-w-sm will-change-transform"
        style={{
          transform: 'perspective(1000px) translateZ(20px)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Product Thumbnail */}
        <div className="w-12 h-12 rounded-xl bg-obsidian-card border border-champagne/25 overflow-hidden flex items-center justify-center shrink-0">
          {toastData.image ? (
            <img
              src={toastData.image}
              alt={toastData.productName}
              className={`w-full h-full ${
                toastData.image.endsWith('.svg')
                  ? 'object-contain p-1 filter drop-shadow'
                  : 'object-cover object-center'
              }`}
            />
          ) : (
            <ShoppingBag className="w-5 h-5 text-champagne" />
          )}
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-champagne mb-0.5">
            <Check className="w-3 h-3 text-champagne stroke-[3]" />
            <span>{toastData.title || 'Added to Your Bag'}</span>
          </div>
          <h4 className="font-serif-luxury text-sm text-ivory font-normal truncate">
            {toastData.productName}
          </h4>
          <div className="flex items-center justify-between text-[11px] text-ivory-muted/80 mt-0.5">
            <span>Qty: {toastData.quantity || 1}</span>
            {toastData.price && (
              <span className="font-semibold text-champagne-light">
                {formatINR(toastData.price * (toastData.quantity || 1))}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Simple Notification Toast
  return (
    <div
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 animate-fade-in flex items-center space-x-3 px-5 py-3.5 rounded-full bg-obsidian-surface/98 border border-champagne/40 text-ivory shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(214,194,154,0.15)] backdrop-blur-xl will-change-transform"
      style={{
        transform: 'perspective(1000px) translateZ(20px)'
      }}
    >
      <Sparkles className="w-4 h-4 text-champagne shrink-0 animate-pulse" />
      <span className="text-xs uppercase tracking-wider font-medium text-ivory">
        {toastData.message || toastData.title}
      </span>
    </div>
  );
}
