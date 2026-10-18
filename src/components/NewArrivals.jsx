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
    <section className="py-20 md:py-28 bg-obsidian border-t border-champagne/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium block mb-2">
              Fresh From The Atelier
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal">
              <NeonTypewriterText text="NEW ARRIVALS" />
            </h2>
          </div>
          <button
            onClick={() => navigateToCatalogue({ isNew: true })}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-champagne hover:text-champagne-light transition-colors group"
          >
            <span>VIEW ALL NEW PIECES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Products Grid: 4 cols on desktop, 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
