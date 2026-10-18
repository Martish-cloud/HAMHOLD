import React from 'react';
import { ArrowRight, Sparkles, Gem, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { NeonTypewriterText } from './TextAnimations';

export default function PrivateOffers() {
  const { navigateToCatalogue } = useShop();

  return (
    <section id="private-offers" className="py-6 sm:py-7 lg:py-8 bg-obsidian-light/30 border-t border-champagne/15 relative overflow-hidden flex flex-col justify-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-espresso/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-champagne/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Refined Vertical Footprint */}
        <div className="text-center max-w-2xl mx-auto mb-5 lg:mb-5.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-espresso-light/60 border border-champagne/25 text-champagne text-[10px] tracking-[0.25em] uppercase font-medium mb-1.5 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Atelier Privileges</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-ivory tracking-[0.03em] font-normal mb-1">
            <NeonTypewriterText text="PRIVATE JEWELLERY OFFERS" />
          </h2>
          <p className="text-ivory-soft/85 text-xs sm:text-sm font-sans font-light tracking-wide">
            Curated pieces. Exclusive privileges.
          </p>
          <span className="inline-block mt-0.5 text-[9px] uppercase tracking-[0.25em] text-champagne/60 font-medium font-sans">
            Private Edit — Atelier Collection
          </span>
        </div>

        {/* 2-Part Curated Offer Layout (Side by Side on Desktop) */}
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 items-stretch">
          {/* Card 1: For Women — The Signature Edit */}
          <div className="card-hover-lift-fill preserve-3d group relative rounded-2xl border border-champagne/20 hover:border-champagne/50 transition-all duration-500 overflow-hidden shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between will-change-transform bg-obsidian">
            {/* Ambient underlying image texture visible through ~60% visible / 40% translucent content panel */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <img
                src="/Image 2.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-[50%_20%] opacity-55 filter blur-[1.5px] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/20 to-obsidian/45" />
            </div>

            {/* 1. Top Image Showcase — Slightly Reduced Scale to Reveal Full Head, Face & Jewellery */}
            <div className="relative z-10 w-full h-48 sm:h-52 lg:h-[210px] overflow-hidden flex-shrink-0 bg-obsidian">
              <picture className="w-full h-full block">
                <source srcSet="/images/editorial/the-hamhold-edit/image-2.webp" type="image/webp" />
                <img
                  src="/Image 2.png"
                  alt="Women's Fine Jewellery Private Edit"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover object-[50%_16%] scale-[0.93] transform transition-transform duration-700 ease-out group-hover:scale-[0.97]"
                />
              </picture>

              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 transform group-hover:translate-z-20 transition-transform duration-300">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-medium bg-obsidian/85 text-champagne border border-champagne/30 backdrop-blur-md shadow-sm">
                  For Her • 3-Piece Edit
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10 transform group-hover:translate-z-20 transition-transform duration-300">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.18em] font-semibold bg-champagne text-obsidian shadow-glow">
                  Save ₹8,500
                </span>
              </div>
            </div>

            {/* 2 & 3. Compact Blue-Outlined Content Area with ~60% Visible Luxury Background */}
            <div className="relative z-10 px-5 py-3.5 sm:px-6 sm:py-4 flex-1 flex flex-col justify-between bg-obsidian/40 backdrop-blur-md border-t border-champagne/20">
              <div className="transform group-hover:translate-z-10 transition-transform duration-300">
                <div className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.22em] text-champagne font-medium mb-1">
                  <Gem className="w-3 h-3 text-champagne" />
                  <span>The Signature Suite</span>
                </div>
                <h3 className="font-serif-luxury text-lg sm:text-xl text-ivory mb-1 tracking-[0.02em] group-hover:text-champagne transition-colors">
                  THE SIGNATURE EDIT
                </h3>
                <p className="text-ivory-soft/90 text-[11px] sm:text-xs font-sans font-light leading-snug mb-2.5">
                  A harmonious trio uniting the Aurelia Solitaire Diamond Ring, Celeste South Sea Pearl Drops, and Nocturne Pavé Tennis Bracelet in solid 18K gold.
                </p>

                {/* Bundle Details List */}
                <div className="space-y-1 pb-2.5 border-b border-champagne/15 text-[11px] sm:text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-ivory-soft">• Aurelia Solitaire Ring (0.75ct)</span>
                    <span className="text-champagne-light font-medium">₹68,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ivory-soft">• Celeste South Sea Pearl Drops</span>
                    <span className="text-champagne-light font-medium">₹1,12,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ivory-soft">• Nocturne Pavé Tennis Bracelet</span>
                    <span className="text-champagne-light font-medium">₹60,900</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Pricing & CTA Row — Grounded with high legibility */}
            <div className="relative z-10 px-5 py-3 sm:px-6 sm:py-3.5 bg-obsidian/75 backdrop-blur-md border-t border-champagne/25 flex items-center justify-between gap-3">
              <div>
                <div className="text-[9.5px] uppercase tracking-[0.22em] text-champagne/85 font-semibold font-sans">
                  Curated Suite Price
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-champagne drop-shadow-[0_1px_6px_rgba(212,175,55,0.25)]">
                    ₹2,32,900
                  </span>
                  <span className="text-[11px] sm:text-xs text-ivory-soft/60 line-through font-sans">
                    ₹2,41,400
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigateToCatalogue({ gender: 'women' })}
                data-cursor="explore"
                className="btn-3d relative inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-[11px] sm:text-xs tracking-[0.18em] uppercase font-bold border border-champagne hover:border-champagne-light transition-all duration-300 shadow-glow"
              >
                <span>SHOP WOMEN</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: For Men — The Gentlemen's Edit */}
          <div className="card-hover-lift-fill preserve-3d group relative rounded-2xl border border-champagne/20 hover:border-champagne/50 transition-all duration-500 overflow-hidden shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between will-change-transform bg-obsidian">
            {/* Ambient underlying image texture visible through ~60% visible / 40% translucent content panel */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <img
                src="/images/brand/ambassador/ayush-ambassador.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-[35%_25%] opacity-55 filter blur-[1.5px] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/20 to-obsidian/45" />
            </div>

            {/* 1. Top Image Showcase — 100% Visibility, No Dark Overlays, Refined Model Framing */}
            <div className="relative z-10 w-full h-48 sm:h-52 lg:h-[210px] overflow-hidden flex-shrink-0 bg-obsidian">
              <img
                src="/images/brand/ambassador/ayush-ambassador.webp"
                alt="Men's Fine Jewellery Private Edit"
                loading="lazy"
                decoding="async"
                width="800"
                height="450"
                className="w-full h-full object-cover object-[35%_20%] transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 transform group-hover:translate-z-20 transition-transform duration-300">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-medium bg-obsidian/85 text-champagne border border-champagne/30 backdrop-blur-md shadow-sm">
                  For Him • 3-Piece Edit
                </span>
              </div>
              <div className="absolute top-3 right-3 z-10 transform group-hover:translate-z-20 transition-transform duration-300">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.18em] font-semibold bg-champagne text-obsidian shadow-glow">
                  Save ₹10,000
                </span>
              </div>
            </div>

            {/* 2 & 3. Compact Blue-Outlined Content Area with ~60% Visible Luxury Background */}
            <div className="relative z-10 px-5 py-3.5 sm:px-6 sm:py-4 flex-1 flex flex-col justify-between bg-obsidian/40 backdrop-blur-md border-t border-champagne/20">
              <div className="transform group-hover:translate-z-10 transition-transform duration-300">
                <div className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.22em] text-champagne font-medium mb-1">
                  <ShieldCheck className="w-3 h-3 text-champagne" />
                  <span>The Sovereign Suite</span>
                </div>
                <h3 className="font-serif-luxury text-lg sm:text-xl text-ivory mb-1 tracking-[0.02em] group-hover:text-champagne transition-colors">
                  THE GENTLEMEN'S EDIT
                </h3>
                <p className="text-ivory-soft/90 text-[11px] sm:text-xs font-sans font-light leading-snug mb-2.5">
                  A commanding masculine assembly featuring the Monarch Imperial Diamond Kada, Sovereign Black Onyx Ring, and Atlas Diamond-Cut Cuban Chain.
                </p>

                {/* Bundle Details List */}
                <div className="space-y-1 pb-2.5 border-b border-champagne/15 text-[11px] sm:text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-ivory-soft">• Monarch Imperial Diamond Kada</span>
                    <span className="text-champagne-light font-medium">₹1,45,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ivory-soft">• Sovereign Black Onyx Ring</span>
                    <span className="text-champagne-light font-medium">₹64,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ivory-soft">• Atlas Heavy 18K Gold Cuban Chain</span>
                    <span className="text-champagne-light font-medium">₹2,65,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Pricing & CTA Row — Grounded with high legibility */}
            <div className="relative z-10 px-5 py-3 sm:px-6 sm:py-3.5 bg-obsidian/75 backdrop-blur-md border-t border-champagne/25 flex items-center justify-between gap-3">
              <div>
                <div className="text-[9.5px] uppercase tracking-[0.22em] text-champagne/85 font-semibold font-sans">
                  Curated Suite Price
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-champagne drop-shadow-[0_1px_6px_rgba(212,175,55,0.25)]">
                    ₹4,64,000
                  </span>
                  <span className="text-[11px] sm:text-xs text-ivory-soft/60 line-through font-sans">
                    ₹4,74,000
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigateToCatalogue({ gender: 'men' })}
                data-cursor="explore"
                className="btn-3d relative inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-[11px] sm:text-xs tracking-[0.18em] uppercase font-bold border border-champagne hover:border-champagne-light transition-all duration-300 shadow-glow"
              >
                <span>SHOP MEN</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
