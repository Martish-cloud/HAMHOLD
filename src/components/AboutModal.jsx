import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Shield, Compass, Heart } from 'lucide-react';

export default function AboutModal() {
  const { isAboutOpen, setIsAboutOpen } = useShop();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex justify-center animate-fade-in">
      <div className="w-full max-w-3xl bg-obsidian-surface border border-champagne/25 rounded-2xl shadow-2xl p-6 sm:p-10 relative my-auto">
        <button
          onClick={() => setIsAboutOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-obsidian/60 hover:bg-obsidian border border-champagne/20 text-ivory hover:text-champagne transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="text-center pb-6 border-b border-champagne/15">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-champagne font-medium block mb-2">
              The Midnight Atelier
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal">
              ABOUT HAMHOLD
            </h2>
            <p className="font-serif italic text-champagne text-base mt-2">
              "Crafted to Hold Forever."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-champagne/30 shadow-luxury bg-obsidian-card">
              <img
                src="/images/brand/ambassador/ambassador-portrait.webp"
                alt="HAMHOLD Brand Ambassador"
                className="w-full h-64 sm:h-72 md:h-80 object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-semibold block">
                  Campaign Édition 2026
                </span>
                <span className="text-[9px] text-ivory-muted tracking-wider">
                  The HAMHOLD Ambassador
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-ivory-soft/90 font-light leading-relaxed font-sans">
              <p>
                HAMHOLD is an independent luxury fine jewellery atelier dedicated to contemporary elegance, architectural discipline, and enduring emotional significance. Our aesthetic direction — the <em>Midnight Atelier</em> — moves away from generic luxury palettes, embracing the cinematic contrast of obsidian, warm ivory, and deep champagne tones.
              </p>
              <p>
                Every ring, necklace, cuff, and kada in our 37-piece atelier catalogue is conceived not as transient adornment, but as an heirloom engineered structurally to last generations. We work exclusively with certified 18K solid gold, 950 platinum, and naturally graded gemstones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-champagne/15">
            <div className="p-4 rounded-xl bg-obsidian-card border border-champagne/15 text-center">
              <Compass className="w-5 h-5 text-champagne mx-auto mb-2" />
              <h4 className="font-serif-luxury text-sm text-ivory mb-1">Architectural Form</h4>
              <p className="text-[11px] text-ivory-muted">Neoclassical geometry refined for comfortable modern wear.</p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-card border border-champagne/15 text-center">
              <Shield className="w-5 h-5 text-champagne mx-auto mb-2" />
              <h4 className="font-serif-luxury text-sm text-ivory mb-1">100% Certified</h4>
              <p className="text-[11px] text-ivory-muted">BIS Hallmarked precious metals &amp; verified diamond grading.</p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-card border border-champagne/15 text-center">
              <Heart className="w-5 h-5 text-champagne mx-auto mb-2" />
              <h4 className="font-serif-luxury text-sm text-ivory mb-1">Eternal Memories</h4>
              <p className="text-[11px] text-ivory-muted">Jewellery designed to hold personal milestones forever.</p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="px-8 py-3 rounded-full bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold"
            >
              Explore The Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
