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

  // 8 Curated Most Wanted Bestsellers (Part A replacements applied)
  const MOST_WANTED_IDS = [
    'aurelia-solitaire-ring',
    'seraphina-eternity-band',
    'avantika-meenakari-gold-kada',
    'noor-polki-pearl-collar',
    'celeste-dual-bypass-ring',
    'astra-drop-earrings',
    'celeste-pearl-drops',
    'vesper-sapphire-ring'
  ];
  const bestsellers = MOST_WANTED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="py-20 md:py-28 bg-espresso-dark/60 border-t border-champagne/10 relative overflow-hidden">
      {/* Decorative ambient lighting with parallax */}
      <div
        ref={bgParallaxRef}
        className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-champagne/[0.04] rounded-full blur-[130px] pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium mb-2">
              <Flame className="w-3.5 h-3.5 text-champagne" />
              <span>Iconic Signatures</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal">
              <NeonTypewriterText text="MOST WANTED" />
            </h2>
          </div>
          <button
            onClick={() => navigateToCatalogue({ isBestseller: true })}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-champagne hover:text-champagne-light transition-colors group"
          >
            <span>EXPLORE BESTSELLERS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Grid: 4 cols on desktop, 3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

