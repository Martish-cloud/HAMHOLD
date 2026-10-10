import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Shield } from 'lucide-react';
import { BlurWipeText } from './TextAnimations';
import { useParallax } from '../hooks/useParallax';

export default function ForHimSection() {
  const { navigateToCatalogue } = useShop();
  const bgParallaxRef = useParallax({ speed: 0.14, maxOffset: 35 });
  const ambassadorParallaxRef = useParallax({ speed: 0.06, maxOffset: 16 });

  // Men's jewellery products (4 products)
  const mensProducts = PRODUCTS.filter((p) => p.gender === 'men' || p.category === 'mens').slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-obsidian-light/40 border-t border-champagne/10 relative overflow-hidden">
      {/* Deep moody architectural lighting with parallax */}
      <div
        ref={bgParallaxRef}
        className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-espresso/40 rounded-full blur-[140px] pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Tag */}
        <div className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium mb-4">
          <Shield className="w-3.5 h-3.5 text-champagne" />
          <span>The Sovereign Men's Atelier</span>
        </div>

        {/* Desktop: 2-Column Split Editorial Card | Mobile: Stacked Editorial Flow */}
        <div className="mb-14 md:mb-18 rounded-2xl bg-gradient-radial from-espresso/40 via-obsidian-card to-obsidian border border-champagne/20 overflow-hidden shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Column: Men's Jewellery Introduction */}
            <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 lg:p-14 order-2 lg:order-1 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-champagne/80 font-sans font-semibold mb-2 block">
                Brand Ambassador Édition
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal leading-[1.12] mb-3">
                <BlurWipeText text="FOR HIM" />
              </h2>
              <div className="font-serif text-lg sm:text-xl text-champagne italic font-light mb-4">
                Timeless Elegance • Premium Jewellery for Men
              </div>
              <p className="text-ivory-soft/85 text-xs sm:text-sm md:text-base font-sans font-light leading-relaxed mb-6 max-w-lg">
                Substantial solid 18K gold kadas, platinum cuffs, diamond-cut Cuban chains, and sovereign onyx signets designed for commanding presence and architectural discipline.
              </p>

              {/* Trust & Craftsmanship Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4 pb-6 border-y border-champagne/15 mb-6 text-xs text-ivory-muted/90 font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
                  <span>100% Solid 18K Gold &amp; Platinum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
                  <span>Ergonomic Weight &amp; Comfort Fit</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigateToCatalogue({ gender: 'men' })}
                  data-cursor="explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.22em] uppercase font-semibold transition-all duration-300 shadow-glow group"
                >
                  <span>EXPLORE MEN'S ATELIER</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column: Ayush / Men's Brand Ambassador Editorial Image with Parallax Depth */}
            <div className="lg:col-span-6 relative order-1 lg:order-2 h-72 sm:h-96 md:h-[460px] lg:h-[500px] overflow-hidden bg-obsidian-surface flex items-center justify-center">
              <picture>
                <source media="(max-width: 768px)" srcSet="/images/brand/ambassador/ayush-ambassador-mobile.webp" />
                <img
                  ref={ambassadorParallaxRef}
                  src="/images/brand/ambassador/ayush-ambassador.webp"
                  alt="HAMHOLD Men's Brand Ambassador"
                  className="w-full h-full object-cover object-[center_20%] md:object-[50%_25%] transition-transform duration-700 hover:scale-[1.02] will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              {/* Subtle luxury edge vignetting */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60 lg:opacity-30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent opacity-80 pointer-events-none hidden lg:block" />

              {/* Editorial Caption Badge */}
              <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-obsidian/85 border border-champagne/30 backdrop-blur-md">
                <span className="text-[9px] uppercase tracking-[0.25em] text-champagne font-sans font-semibold">
                  HAMHOLD Men's Ambassador
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Sub-heading for Product Grid */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-champagne/15">
          <div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-ivory font-normal">
              Curated Men's Fine Jewellery
            </h3>
            <p className="text-[11px] sm:text-xs text-ivory-muted font-sans mt-0.5">
              Certified BIS Hallmarked creations sculpted for distinction.
            </p>
          </div>
          <button
            onClick={() => navigateToCatalogue({ gender: 'men' })}
            className="mt-3 sm:mt-0 text-xs uppercase tracking-[0.2em] text-champagne hover:text-champagne-light transition-colors self-start sm:self-auto"
          >
            View All ({PRODUCTS.filter((p) => p.gender === 'men' || p.category === 'mens').length}) →
          </button>
        </div>

        {/* 4 Men's Jewellery Cards Grid with Shimmer Stroke Effects and Refined Hover Lift */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {mensProducts.map((product) => (
            <div
              key={product.id}
              className="relative group/shimmer rounded-xl p-[1.5px] overflow-hidden h-full transition-transform duration-350 hover:-translate-y-1.5"
            >
              {/* Continuous animated travelling gold light streak along card perimeter */}
              <div
                className="absolute -inset-[150%] pointer-events-none opacity-40 group-hover/shimmer:opacity-100 transition-opacity duration-500 animate-[spin_6s_linear_infinite]"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(214, 194, 154, 0.4) 300deg, rgba(214, 194, 154, 0.95) 335deg, rgba(255, 248, 230, 1) 350deg, transparent 360deg)'
                }}
              />
              <div className="relative rounded-[11px] bg-obsidian h-full w-full">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

