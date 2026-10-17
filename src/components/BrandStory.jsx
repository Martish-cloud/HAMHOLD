import React from 'react';
import { Compass, Sparkles, Heart, Clock } from 'lucide-react';
import { GhostInterleapText } from './TextAnimations';

export default function BrandStory() {
  const pillars = [
    {
      icon: Compass,
      title: 'Architectural Balance',
      desc: 'Our design philosophy merges clean neoclassical geometry with comfortable, modern curves that adapt seamlessly to daily living.'
    },
    {
      icon: Sparkles,
      title: 'Sovereign Materials',
      desc: 'From solid 18K gold to 950 platinum and naturally certified conflict-free diamonds, our materials are selected for purity, luster, and longevity.'
    },
    {
      icon: Heart,
      title: 'Milestones & Memories',
      desc: 'Whether marking a personal victory, an anniversary, or a quiet everyday celebration, HAMHOLD creations act as an enduring anchor for what matters.'
    },
    {
      icon: Clock,
      title: 'Crafted to Hold Forever',
      desc: 'Jewellery should not be transient fast fashion. We create pieces engineered structurally to last generations, holding their emotional significance intact.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-espresso-dark/60 border-t border-champagne/15 relative overflow-hidden">
      {/* 1. Subtle Background Video 2 (~10% opacity) clipped strictly to section */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-10 filter brightness-110 contrast-125"
        >
          <source src="/Video/Video%20(2).mp4" type="video/mp4" />
        </video>
        {/* Deep luxurious atmospheric tints & overlays */}
        <div className="absolute inset-0 bg-espresso-dark/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(11,11,12,0.85)_85%)] pointer-events-none" />
        {/* Soft edge seam transitions ensuring Video 2 NEVER bleeds into adjacent sections */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,1)_0%,transparent_12%,transparent_88%,rgba(11,11,12,1)_100%)] pointer-events-none" />
      </div>

      {/* 2. Section Heading & Editorial Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-14 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium block mb-3">
              Brand Philosophy
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivory tracking-[0.03em] font-normal leading-[1.12] mb-6">
              <GhostInterleapText>
                WHY <br />
                <span className="text-gold-gradient">HAMHOLD?</span>
              </GhostInterleapText>
            </h2>
            <p className="text-ivory-soft text-sm sm:text-base font-sans font-light leading-relaxed mb-6">
              Founded on the belief that fine jewellery is the ultimate vessel of human memory. In a fast-moving world, certain moments demand a physical anchor — something precious, beautiful, and enduring.
            </p>
            <p className="text-ivory-muted text-xs sm:text-sm font-sans font-light leading-relaxed">
              At HAMHOLD, every cut of gold and setting of stone is measured against one timeless standard: will this piece hold its emotional weight fifty years from today?
            </p>
          </div>

          {/* Right Highlight: Atelier Motto */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-8 rounded-2xl bg-obsidian-card/80 border border-champagne/25 backdrop-blur-md shadow-luxury relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-champagne/5 blur-2xl pointer-events-none" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne/80 font-medium block mb-2">
                The HAMHOLD Atelier Motto
              </span>
              <p className="font-serif-luxury text-2xl sm:text-3xl text-gold-gradient italic leading-relaxed mb-3">
                "Crafted to Hold Forever."
              </p>
              <div className="h-[1px] w-14 bg-champagne/30 mb-3" />
              <p className="text-xs text-ivory-muted font-sans font-light leading-relaxed">
                Pieces engineered structurally to last generations, holding their emotional significance intact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Continuous Horizontal Text-and-Icon Marquee Strip over Video 2 */}
      <div className="relative z-10 w-full border-y border-champagne/15 bg-obsidian/30 backdrop-blur-sm py-6 sm:py-8 overflow-hidden">
        <div className="w-full overflow-hidden marquee-wrapper [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-marquee-rtl">
            {/* Primary Track */}
            <div className="flex shrink-0 items-center">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col justify-center min-w-[280px] sm:min-w-[340px] max-w-[360px] sm:max-w-[420px] px-6 sm:px-10">
                      <div className="flex items-center gap-3.5 mb-2.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-champagne/10 border border-champagne/25 flex items-center justify-center text-champagne shrink-0">
                          <Icon className="w-4 h-4 stroke-[1.5]" />
                        </div>
                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-ivory font-normal tracking-wide whitespace-nowrap">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-ivory-muted/90 text-xs sm:text-sm font-sans font-light leading-relaxed pl-11 sm:pl-12">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center text-champagne/40 px-2 sm:px-4 select-none shrink-0" aria-hidden="true">
                      <span className="text-[9px]">❖</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Duplicate Track for Seamless Loop (hidden from screen readers) */}
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <React.Fragment key={`dup-${idx}`}>
                    <div className="flex flex-col justify-center min-w-[280px] sm:min-w-[340px] max-w-[360px] sm:max-w-[420px] px-6 sm:px-10">
                      <div className="flex items-center gap-3.5 mb-2.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-champagne/10 border border-champagne/25 flex items-center justify-center text-champagne shrink-0">
                          <Icon className="w-4 h-4 stroke-[1.5]" />
                        </div>
                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-ivory font-normal tracking-wide whitespace-nowrap">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-ivory-muted/90 text-xs sm:text-sm font-sans font-light leading-relaxed pl-11 sm:pl-12">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center text-champagne/40 px-2 sm:px-4 select-none shrink-0">
                      <span className="text-[9px]">❖</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
