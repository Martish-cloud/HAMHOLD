import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { NeonTypewriterText } from './TextAnimations';

export default function NewArrivals() {
  const { navigateToCatalogue } = useShop();

  // 8 Curated New Arrivals (Part C replacements applied)
  const NEW_ARRIVAL_IDS = [
    'devi-floral-ruby-emerald-collar',
    'padmavati-royal-kundan-set',
    'selene-tahitian-pendant',
    'astraea-constellation-locket',
    'zara-diamond-nose-ring',
    'chandrika-crescent-nath',
    'astraea-diamond-foliage-choker',
    'symphony-sapphire-collar-alt'
  ];
  const newProducts = NEW_ARRIVAL_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <section id="new-arrivals" className="py-4 sm:py-5 lg:py-6 bg-obsidian border-t border-champagne/10 relative overflow-hidden">
      {/* Genuine Full-Width Background Video 2 (~60% perceived visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-[0.62] filter contrast-105 brightness-100"
        >
          <source src="/Video/Video%20%20(2).mp4" type="video/mp4" />
          <source src="/Video/Video%202.mp4" type="video/mp4" />
        </video>
        {/* Balanced subtle dark overlay achieving ~60% perceived video visibility while maintaining product card contrast */}
        <div className="absolute inset-0 bg-obsidian/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/45 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header — Streamlined vertical height */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 sm:mb-4">
          <div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-champagne font-medium block mb-0.5">
              Fresh From The Atelier
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-ivory tracking-[0.03em] font-normal leading-tight">
              <NeonTypewriterText text="NEW ARRIVALS" />
            </h2>
          </div>
          <button
            onClick={() => navigateToCatalogue({ isNew: true })}
            className="mt-2 md:mt-0 inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-champagne hover:text-champagne-light transition-colors group"
          >
            <span>VIEW ALL NEW PIECES</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Products Grid: 4 cols on desktop (2 rows of 4), 2 cols on mobile — fits completely in one viewport */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
