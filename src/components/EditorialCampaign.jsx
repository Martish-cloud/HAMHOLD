import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function EditorialCampaign() {
  const { navigateToCatalogue } = useShop();

  return (
    <section className="relative w-full h-[calc(100svh-88px)] md:h-[calc(100svh-108px)] min-h-[560px] max-h-[800px] lg:max-h-[860px] flex items-center bg-obsidian overflow-hidden">
      {/* Background Cinematic Video featuring HAMHOLD Brand Ambassador (Video 1) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/brand/ambassador/ambassador-hero.webp"
          className="w-full h-full object-cover object-[52%_26%] md:object-[50%_25%] filter brightness-95 contrast-105 pointer-events-none"
        >
          <source src="/Video/Video%20%20(1).mp4" type="video/mp4" />
        </video>

        {/* Directional Luxury Vignette: Darker on the left for crisp text readability while preserving full ambassador visibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,11,12,0.78)_0%,rgba(11,11,12,0.42)_36%,rgba(11,11,12,0.1)_65%,transparent_100%)] pointer-events-none" />
        {/* Soft edge seam transition for top & bottom borders */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,0.5)_0%,transparent_12%,transparent_88%,rgba(11,11,12,0.55)_100%)] pointer-events-none" />
      </div>

      {/* Hero Content Overlay: HM Monogram, GET READY, Ayesha, and CTA */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-end pb-10 sm:pb-14 md:pb-16 lg:pb-20 pointer-events-none">
        <div className="max-w-md pointer-events-auto">
          {/* HM Monogram Box */}
          <div className="w-14 sm:w-16 aspect-square bg-obsidian/90 border border-champagne/30 rounded-lg flex flex-col items-center justify-center shadow-luxury mb-4 backdrop-blur-md">
            <span className="text-[9px] text-champagne leading-none">◆</span>
            <span className="font-serif-luxury text-xl sm:text-2xl text-ivory font-semibold tracking-wider leading-none mt-0.5">HM</span>
            <div className="w-6 h-[1px] bg-champagne/40 mt-1" />
          </div>

          {/* Introductory Heading */}
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-ivory tracking-[0.2em] font-normal uppercase leading-tight drop-shadow-lg">
            GET READY
          </h2>

          {/* Ambassador Script Accent */}
          <div className="font-serif-luxury italic text-4xl sm:text-5xl md:text-6xl text-gold-gradient font-light -mt-1 sm:-mt-2 mb-3 drop-shadow-md">
            Ayesha
          </div>

          {/* Ornate Gold Accent Flourish Divider */}
          <div className="flex items-center gap-2 max-w-[180px] mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-champagne/60 to-transparent" />
            <span className="text-champagne/80 text-xs">❖</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-champagne/60 to-transparent" />
          </div>

          {/* Action CTA Button */}
          <button
            onClick={() => navigateToCatalogue()}
            data-cursor="explore"
            className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.22em] uppercase font-semibold transition-all duration-300 shadow-glow group backdrop-blur-md border border-champagne/30"
          >
            <span>EXPLORE THE EDIT</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
