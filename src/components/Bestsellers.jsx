import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Flame } from 'lucide-react';
import { NeonTypewriterText } from './TextAnimations';
import { useParallax } from '../hooks/useParallax';

export default function Bestsellers() {
  const { navigateToCatalogue } = useShop();
  const bgParallaxRef = useParallax({ speed: 0.12, maxOffset: 30 });

  // 8 Curated Most Wanted Bestsellers (Maharani Basra Pearl Collar at pos 1, Vespa Sapphire Ring at pos 2)
  const MOST_WANTED_IDS = [
    'noor-polki-pearl-collar',
    'vesper-sapphire-ring',
    'aurelia-solitaire-ring',
    'seraphina-eternity-band',
    'avantika-meenakari-gold-kada',
    'celeste-dual-bypass-ring',
    'astra-drop-earrings',
    'celeste-pearl-drops'
  ];
  const bestsellers = MOST_WANTED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <section id="most-wanted" className="py-4 sm:py-5 lg:py-6 bg-espresso-dark/30 border-t border-champagne/10 relative overflow-hidden">
      {/* Background Video 11 (~65% visual visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-[0.68] filter contrast-105 brightness-100"
        >
          <source src="/Video/Video%2011.mp4" type="video/mp4" />
        </video>
        {/* Balanced subtle dark overlay preserving ~65% video visibility while keeping text crisp */}
        <div className="absolute inset-0 bg-obsidian/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/45 via-transparent to-obsidian/45 pointer-events-none" />
      </div>

      {/* Decorative ambient lighting with parallax */}
      <div
        ref={bgParallaxRef}
        className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-champagne/[0.04] rounded-full blur-[130px] pointer-events-none will-change-transform z-[1]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header — Streamlined vertical height */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 sm:mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-champagne font-medium mb-0.5">
              <Flame className="w-3 h-3 text-champagne" />
              <span>Iconic Signatures</span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-ivory tracking-[0.03em] font-normal leading-tight">
              <NeonTypewriterText text="MOST WANTED" />
            </h2>
          </div>
          <button
            onClick={() => navigateToCatalogue({ isBestseller: true })}
            className="mt-2 md:mt-0 inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-champagne hover:text-champagne-light transition-colors group"
          >
            <span>EXPLORE BESTSELLERS</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Grid: 4 cols on desktop (2 rows of 4), 2 cols on mobile — fits completely in one viewport */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} compact={true} />
          ))}
        </div>
      </div>
    </section>
  );
}

