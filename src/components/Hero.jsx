import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Hero() {
  const { navigateToCatalogue, setIsAboutOpen } = useShop();

  return (
    <section className="relative h-[calc(100svh-100px)] min-h-[520px] max-h-[820px] flex items-center overflow-hidden bg-obsidian py-4 sm:py-6 md:py-8">
      {/* 1. Background Video 4 (Complete viewport fit, proportional and undistorted) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[52%_42%] md:object-[50%_40%]"
        >
          <source src="/Video/Video%20(4).mp4" type="video/mp4" />
        </video>

        {/* Soft edge seams for top & bottom borders preserving video brightness and button legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,0.45)_0%,transparent_14%,transparent_86%,rgba(11,11,12,0.55)_100%)] pointer-events-none" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center">
        {/* Left Column: Eyebrow & Actions with crisp contrast over Video 4 */}
        <div className="max-w-2xl text-left pt-4 lg:pt-0">
          {/* Eyebrow / Tagline pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian/70 border border-champagne/30 text-champagne text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium mb-5 sm:mb-6 backdrop-blur-md shadow-luxury">
            <Sparkles className="w-3.5 h-3.5 text-champagne animate-pulse" />
            <span>MIDNIGHT ATELIER 2026</span>
          </div>

          {/* Action CTAs with 3D Micro-interactions */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-3.5 sm:gap-4">
            <button
              onClick={() => navigateToCatalogue()}
              data-cursor="explore"
              className="btn-3d w-full sm:w-auto px-7 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.22em] uppercase font-semibold transition-all duration-300 shadow-glow flex items-center justify-center gap-2.5 group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setIsAboutOpen(true)}
              className="btn-3d-secondary w-full sm:w-auto px-7 py-3.5 rounded-full bg-obsidian/75 hover:bg-obsidian border border-champagne/40 text-ivory hover:text-champagne text-xs tracking-[0.22em] uppercase font-medium transition-all duration-300 backdrop-blur-md shadow-luxury"
            >
              DISCOVER HAMHOLD
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
