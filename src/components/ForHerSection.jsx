import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BlurWipeText } from './TextAnimations';

export default function ForHerSection() {
  const { navigateToCatalogue } = useShop();

  // Women's jewellery curation
  const womensProducts = PRODUCTS.filter((p) => p.gender === 'women').slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-obsidian border-t border-champagne/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>Radiant Femininity</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal">
              <BlurWipeText text="FOR HER" />
            </h2>
            <p className="text-ivory-muted text-xs sm:text-sm font-sans font-light mt-2 max-w-lg">
              Solitaire rings, South Sea pearl cascades, diamond tennis bracelets, and bespoke Colombian emerald pendants sculpted to elevate every celebration.
            </p>
          </div>
          <button
            onClick={() => navigateToCatalogue({ gender: 'women' })}
            data-cursor="explore"
            className="btn-3d-secondary mt-4 md:mt-0 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-champagne/30 hover:border-champagne bg-espresso-light/40 hover:bg-champagne hover:text-obsidian text-champagne text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-glow group"
          >
            <span>EXPLORE WOMEN'S ATELIER</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Women's Jewellery Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {womensProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
