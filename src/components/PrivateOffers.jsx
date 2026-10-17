import React from 'react';
import { ArrowRight, Sparkles, Gem, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { NeonTypewriterText } from './TextAnimations';

export default function PrivateOffers() {
  const { navigateToCatalogue } = useShop();

  return (
    <section className="py-20 md:py-28 bg-obsidian-light/30 border-t border-champagne/15 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-espresso/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-champagne/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso-light/60 border border-champagne/25 text-champagne text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Atelier Privileges</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal mb-3">
            <NeonTypewriterText text="PRIVATE JEWELLERY OFFERS" />
          </h2>
          <p className="text-ivory-soft/85 text-xs sm:text-sm md:text-base font-sans font-light tracking-wide">
            Curated pieces. Exclusive privileges.
          </p>
          <span className="inline-block mt-2 text-[9px] uppercase tracking-[0.25em] text-champagne/60 font-medium font-sans">
            Private Edit — Atelier Collection
          </span>
        </div>

        {/* 2-Part Curated Offer Layout (Side by Side on Desktop, Stacked on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: For Women — The Signature Edit */}
          <div className="group relative rounded-2xl bg-gradient-radial from-espresso/40 via-obsidian-card to-obsidian border border-champagne/20 hover:border-champagne/45 transition-all duration-500 overflow-hidden shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between">
            {/* Top Image Banner with Atmospheric Vignette */}
            <div className="relative w-full h-64 sm:h-72 overflow-hidden">
              <picture className="w-full h-full block">
                <source srcSet="/images/editorial/the-hamhold-edit/image-2.webp" type="image/webp" />
                <img
                  src="/Image 2.png"
                  alt="Women's Fine Jewellery Private Edit"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover object-[50%_18%] transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.25em] font-medium bg-obsidian/85 text-champagne border border-champagne/30 backdrop-blur-md">
                  For Her • 3-Piece Edit
                </span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold bg-champagne text-obsidian shadow-glow">
                  Save ₹8,500
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-champagne/80 font-medium mb-1.5">
                  <Gem className="w-3.5 h-3.5 text-champagne" />
                  <span>The Signature Suite</span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivory mb-2 group-hover:text-champagne transition-colors">
                  THE SIGNATURE EDIT
                </h3>
                <p className="text-ivory-soft/80 text-xs sm:text-sm font-sans font-light leading-relaxed mb-6">
                  A harmonious trio uniting the Aurelia Solitaire Diamond Ring, Celeste South Sea Pearl Drops, and Nocturne Pavé Tennis Bracelet in solid 18K gold.
                </p>

                {/* Bundle Details List */}
                <div className="space-y-2 pb-6 border-b border-champagne/15 text-xs text-ivory-muted/90 font-sans">
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

              {/* Pricing & CTA */}
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ivory-muted/60 font-sans">
                    Curated Suite Price
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-champagne">
                      ₹2,32,900
                    </span>
                    <span className="text-xs text-ivory-muted/50 line-through font-sans">
                      ₹2,41,400
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateToCatalogue({ gender: 'women' })}
                  data-cursor="explore"
                  className="relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.2em] uppercase font-semibold border border-champagne hover:border-champagne-light transition-all duration-300 shadow-glow hover:shadow-[0_0_25px_rgba(214,194,154,0.4)] transform hover:-translate-y-1 active:translate-y-0 group/btn"
                >
                  <span>SHOP WOMEN</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: For Men — The Gentlemen's Edit */}
          <div className="group relative rounded-2xl bg-gradient-radial from-espresso/40 via-obsidian-card to-obsidian border border-champagne/20 hover:border-champagne/45 transition-all duration-500 overflow-hidden shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between">
            {/* Top Image Banner with Atmospheric Vignette */}
            <div className="relative w-full h-64 sm:h-72 overflow-hidden">
              <img
                src="/images/brand/ambassador/ayush-ambassador.webp"
                alt="Men's Fine Jewellery Private Edit"
                loading="lazy"
                decoding="async"
                width="800"
                height="450"
                className="w-full h-full object-cover object-[50%_25%] transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.25em] font-medium bg-obsidian/85 text-champagne border border-champagne/30 backdrop-blur-md">
                  For Him • 3-Piece Edit
                </span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold bg-champagne text-obsidian shadow-glow">
                  Save ₹10,000
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-champagne/80 font-medium mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                  <span>The Sovereign Suite</span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivory mb-2 group-hover:text-champagne transition-colors">
                  THE GENTLEMEN'S EDIT
                </h3>
                <p className="text-ivory-soft/80 text-xs sm:text-sm font-sans font-light leading-relaxed mb-6">
                  A commanding masculine assembly featuring the Monarch Imperial Diamond Kada, Sovereign Black Onyx Ring, and Atlas Diamond-Cut Cuban Chain.
                </p>

                {/* Bundle Details List */}
                <div className="space-y-2 pb-6 border-b border-champagne/15 text-xs text-ivory-muted/90 font-sans">
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

              {/* Pricing & CTA */}
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ivory-muted/60 font-sans">
                    Curated Suite Price
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-champagne">
                      ₹4,64,000
                    </span>
                    <span className="text-xs text-ivory-muted/50 line-through font-sans">
                      ₹4,74,000
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateToCatalogue({ gender: 'men' })}
                  data-cursor="explore"
                  className="relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.2em] uppercase font-semibold border border-champagne hover:border-champagne-light transition-all duration-300 shadow-glow hover:shadow-[0_0_25px_rgba(214,194,154,0.4)] transform hover:-translate-y-1 active:translate-y-0 group/btn"
                >
                  <span>SHOP MEN</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
