import React from 'react';
import { ArrowRight, Sparkles, Gem, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { NeonTypewriterText } from './TextAnimations';

export default function PrivateOffers() {
  const { navigateToCatalogue } = useShop();

  return (
    <section className="py-6 sm:py-7 lg:py-7 xl:py-8 bg-obsidian-light/30 border-t border-champagne/15 relative overflow-hidden flex flex-col justify-center">
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

        {/* 2-Part Curated Offer Layout (Side by Side on Desktop, Medium Sized ~10-15% reduced) */}
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 items-stretch">
          {/* Card 1: For Women — The Signature Edit */}
          <div className="card-hover-lift-fill preserve-3d group relative rounded-2xl border border-champagne/20 hover:border-champagne/50 transition-all duration-500 overflow-hidden shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between will-change-transform bg-obsidian">
            {/* Ambient underlying image texture visible through translucent lower panel (~60% visibility) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <img
                src="/Image 2.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-[52%_15%] opacity-35 filter blur-[2px] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian/75" />
            </div>

            {/* Top Image Showcase with Refined Model Framing & Restrained Subtle Vignette */}
            <div className="relative z-10 w-full h-42 sm:h-44 lg:h-[174px] overflow-hidden flex-shrink-0">
              <picture className="w-full h-full block">
                <source srcSet="/images/editorial/the-hamhold-edit/image-2.webp" type="image/webp" />
                <img
                  src="/Image 2.png"
                  alt="Women's Fine Jewellery Private Edit"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover object-[52%_6%] transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </picture>
              {/* Controlled translucent gradient preserving full model visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-black/20 pointer-events-none" />
              
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

            {/* Refined Translucent Lower Text Panel (~60% visibility of underlying image/texture, crisp text) */}
            <div className="relative z-10 p-5 sm:p-5.5 lg:p-5.5 pt-5 sm:pt-5.5 flex-1 flex flex-col justify-between bg-obsidian/50 backdrop-blur-md border-t border-champagne/15">
              <div className="transform group-hover:translate-z-10 transition-transform duration-300">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-champagne/80 font-medium mb-1">
                  <Gem className="w-3.5 h-3.5 text-champagne" />
                  <span>The Signature Suite</span>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-ivory mb-1.5 group-hover:text-champagne transition-colors">
                  THE SIGNATURE EDIT
                </h3>
                <p className="text-ivory-soft/85 text-xs font-sans font-light leading-relaxed mb-3.5">
                  A harmonious trio uniting the Aurelia Solitaire Diamond Ring, Celeste South Sea Pearl Drops, and Nocturne Pavé Tennis Bracelet in solid 18K gold.
                </p>

                {/* Bundle Details List */}
                <div className="space-y-1.5 pb-3.5 border-b border-champagne/15 text-xs text-ivory-muted/90 font-sans">
                  <div className="flex items-center justify-between">
                    <span>• Aurelia Solitaire Ring (0.75ct)</span>
                    <span className="text-ivory-soft">₹68,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Celeste South Sea Pearl Drops</span>
                    <span className="text-ivory-soft">₹1,12,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Nocturne Pavé Tennis Bracelet</span>
                    <span className="text-ivory-soft">₹60,900</span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA Row */}
              <div className="pt-3.5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-ivory-muted/60 font-sans">
                    Curated Suite Price
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif-luxury text-xl sm:text-2xl font-semibold text-champagne">
                      ₹2,32,900
                    </span>
                    <span className="text-[11px] text-ivory-muted/50 line-through font-sans">
                      ₹2,41,400
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateToCatalogue({ gender: 'women' })}
                  data-cursor="explore"
                  className="btn-3d relative inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-[11px] sm:text-xs tracking-[0.18em] uppercase font-semibold border border-champagne hover:border-champagne-light transition-all duration-300 shadow-glow"
                >
                  <span>SHOP WOMEN</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: For Men — The Gentlemen's Edit */}
          <div className="card-hover-lift-fill preserve-3d group relative rounded-2xl border border-champagne/20 hover:border-champagne/50 transition-all duration-500 overflow-hidden shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between will-change-transform bg-obsidian">
            {/* Ambient underlying image texture visible through translucent lower panel (~60% visibility) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <img
                src="/images/brand/ambassador/ayush-ambassador.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-[36%_20%] opacity-35 filter blur-[2px] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian/75" />
            </div>

            {/* Top Image Showcase with Refined Model Framing & Restrained Subtle Vignette */}
            <div className="relative z-10 w-full h-42 sm:h-44 lg:h-[174px] overflow-hidden flex-shrink-0">
              <img
                src="/images/brand/ambassador/ayush-ambassador.webp"
                alt="Men's Fine Jewellery Private Edit"
                loading="lazy"
                decoding="async"
                width="800"
                height="450"
                className="w-full h-full object-cover object-[36%_6%] transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Controlled translucent gradient preserving full model visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-black/20 pointer-events-none" />
              
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

            {/* Refined Translucent Lower Text Panel (~60% visibility of underlying image/texture, crisp text) */}
            <div className="relative z-10 p-5 sm:p-5.5 lg:p-5.5 pt-5 sm:pt-5.5 flex-1 flex flex-col justify-between bg-obsidian/50 backdrop-blur-md border-t border-champagne/15">
              <div className="transform group-hover:translate-z-10 transition-transform duration-300">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-champagne/80 font-medium mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                  <span>The Sovereign Suite</span>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-ivory mb-1.5 group-hover:text-champagne transition-colors">
                  THE GENTLEMEN'S EDIT
                </h3>
                <p className="text-ivory-soft/85 text-xs font-sans font-light leading-relaxed mb-3.5">
                  A commanding masculine assembly featuring the Monarch Imperial Diamond Kada, Sovereign Black Onyx Ring, and Atlas Diamond-Cut Cuban Chain.
                </p>

                {/* Bundle Details List */}
                <div className="space-y-1.5 pb-3.5 border-b border-champagne/15 text-xs text-ivory-muted/90 font-sans">
                  <div className="flex items-center justify-between">
                    <span>• Monarch Imperial Diamond Kada</span>
                    <span className="text-ivory-soft">₹1,45,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Sovereign Black Onyx Ring</span>
                    <span className="text-ivory-soft">₹64,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Atlas Heavy 18K Gold Cuban Chain</span>
                    <span className="text-ivory-soft">₹2,65,000</span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA Row */}
              <div className="pt-3.5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-ivory-muted/60 font-sans">
                    Curated Suite Price
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif-luxury text-xl sm:text-2xl font-semibold text-champagne">
                      ₹4,64,000
                    </span>
                    <span className="text-[11px] text-ivory-muted/50 line-through font-sans">
                      ₹4,74,000
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateToCatalogue({ gender: 'men' })}
                  data-cursor="explore"
                  className="btn-3d relative inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-[11px] sm:text-xs tracking-[0.18em] uppercase font-semibold border border-champagne hover:border-champagne-light transition-all duration-300 shadow-glow"
                >
                  <span>SHOP MEN</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
