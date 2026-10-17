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
    <section className="py-20 md:py-28 bg-obsidian border-t border-champagne/15 relative overflow-hidden">
      {/* 1. Full-Width Background Video 2 (~90% visual visibility, matching CRAFTED WITH INTENTION) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-90 filter contrast-105 brightness-95"
        >
          <source src="/Video/Video%20(2).mp4" type="video/mp4" />
        </video>

        {/* Lightweight translucent overlay ensuring 90% video visibility while keeping text crisp */}
        <div className="absolute inset-0 bg-obsidian/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,11,12,0.45)_95%)] pointer-events-none" />

        {/* Soft edge seam transitions preventing video from spilling into sections above or below */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,1)_0%,transparent_10%,transparent_90%,rgba(11,11,12,1)_100%)] pointer-events-none" />
      </div>

      {/* 2. Section Heading & Editorial Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-14 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Text Column: Translucent luxury backdrop ensuring video is visible while text remains effortless to read */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian/70 border border-champagne/30 text-champagne text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium mb-4 backdrop-blur-md shadow-luxury">
              <span>BRAND PHILOSOPHY</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivory tracking-[0.03em] font-normal leading-[1.12] mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              <GhostInterleapText>
                WHY <br />
                <span className="text-gold-gradient">HAMHOLD?</span>
              </GhostInterleapText>
            </h2>
            <div className="p-5 sm:p-6 rounded-2xl bg-obsidian/35 border border-champagne/20 backdrop-blur-sm shadow-luxury space-y-4 max-w-2xl">
              <p className="text-ivory text-sm sm:text-base font-sans font-light leading-relaxed drop-shadow">
                Founded on the belief that fine jewellery is the ultimate vessel of human memory. In a fast-moving world, certain moments demand a physical anchor — something precious, beautiful, and enduring.
              </p>
              <p className="text-ivory-soft text-xs sm:text-sm font-sans font-light leading-relaxed drop-shadow">
                At HAMHOLD, every cut of gold and setting of stone is measured against one timeless standard: will this piece hold its emotional weight fifty years from today?
              </p>
            </div>
          </div>

          {/* Right Highlight: Translucent Motto Card floating over Video 2 with 3D Depth */}
          <div className="lg:col-span-5">
            <div className="card-hover-lift-fill preserve-3d p-6 sm:p-8 rounded-2xl bg-obsidian/30 hover:bg-obsidian/55 border border-champagne/25 hover:border-champagne/60 backdrop-blur-sm shadow-luxury relative overflow-hidden group transition-all duration-500 will-change-transform">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-champagne/15 blur-2xl pointer-events-none" />
              <div className="transform group-hover:translate-z-10 transition-transform duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-medium">
                    THE HAMHOLD ATELIER MOTTO
                  </span>
                  <span className="text-champagne/70 text-xs">❖</span>
                </div>
                <p className="font-serif-luxury text-2xl sm:text-3xl text-gold-gradient italic leading-relaxed mb-4 drop-shadow">
                  "Crafted to Hold Forever."
                </p>
                <div className="h-[1px] w-16 bg-champagne/30 mb-4" />
                <p className="text-xs sm:text-sm text-ivory-soft font-sans font-light leading-relaxed drop-shadow">
                  Pieces engineered structurally to last generations, holding their emotional significance intact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Continuous Horizontal Text-and-Icon Marquee Strip over Video 2 */}
      <div className="relative z-10 w-full border-y border-champagne/20 bg-obsidian/25 backdrop-blur-sm py-6 sm:py-8 overflow-hidden">
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
                        <div className="w-9 h-9 rounded-full bg-obsidian/60 border border-champagne/30 flex items-center justify-center text-champagne shrink-0 backdrop-blur-md shadow-sm">
                          <Icon className="w-4 h-4 stroke-[1.5]" />
                        </div>
                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-ivory font-normal tracking-wide whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-ivory-soft text-xs sm:text-sm font-sans font-light leading-relaxed pl-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
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
                        <div className="w-9 h-9 rounded-full bg-obsidian/60 border border-champagne/30 flex items-center justify-center text-champagne shrink-0 backdrop-blur-md shadow-sm">
                          <Icon className="w-4 h-4 stroke-[1.5]" />
                        </div>
                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-ivory font-normal tracking-wide whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-ivory-soft text-xs sm:text-sm font-sans font-light leading-relaxed pl-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
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
