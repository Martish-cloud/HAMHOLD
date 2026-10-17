import React from 'react';
import { Compass, Hammer, Sparkles, Gem, CheckCircle } from 'lucide-react';
import { NeonTypewriterText } from './TextAnimations';

export default function Craftsmanship() {
  const steps = [
    {
      num: '01',
      title: 'Architectural Design',
      icon: Compass,
      desc: 'Every piece begins with hand-drawn structural sketches and high-precision micro-CAD modeling to engineer ideal balance, ergonomics, and light refraction.'
    },
    {
      num: '02',
      title: 'Goldsmith Metallurgy',
      icon: Hammer,
      desc: 'Master artisans alloy and forge 18K solid gold and 950 platinum under controlled atelier heat, ensuring dense, pore-free precious metal foundations.'
    },
    {
      num: '03',
      title: 'Microscope Setting',
      icon: Gem,
      desc: 'Each natural diamond and precious gemstone is seated under 40x optical magnification, with prongs and bezels hand-burnished to secure stones seamlessly.'
    },
    {
      num: '04',
      title: 'Multistage Polishing',
      icon: Sparkles,
      desc: 'Using natural bristle wheels and diamond pastes, craftsmen polish hidden galleries, interior courts, and outer facets into an unbroken liquid-mirror sheen.'
    },
    {
      num: '05',
      title: 'Hallmark Inspection',
      icon: CheckCircle,
      desc: 'Before receiving the official HAMHOLD seal, every creation undergoes strict 12-point quality validation and government-approved BIS hallmarking verification.'
    }
  ];

  return (
    <section className="py-24 md:py-36 bg-obsidian border-t border-champagne/15 relative overflow-hidden">
      {/* 1. Full-Width Background Video 3 (~90% visual visibility, sharp and clear) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-90 filter contrast-105 brightness-95"
        >
          <source src="/Video/Video%20(3).mp4" type="video/mp4" />
        </video>

        {/* Lightweight translucent overlay ensuring 90% video visibility while keeping text crisp */}
        <div className="absolute inset-0 bg-obsidian/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,11,12,0.45)_95%)] pointer-events-none" />

        {/* Soft edge seam transitions preventing video from spilling into sections above or below */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,1)_0%,transparent_10%,transparent_90%,rgba(11,11,12,1)_100%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-obsidian/70 border border-champagne/30 text-champagne text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium mb-3 backdrop-blur-md">
            <span>The Atelier Standard</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal mb-4">
            <NeonTypewriterText text="CRAFTED WITH INTENTION." />
          </h2>
          <p className="text-ivory-soft text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto bg-obsidian/40 backdrop-blur-sm p-2.5 rounded-lg border border-champagne/15">
            The bridge between centuries of classical goldsmithing knowledge and modern precision fine jewellery engineering.
          </p>
        </div>

        {/* 5 Steps: Glassmorphic translucent cards floating over Video 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="card-hover-lift-fill preserve-3d group relative p-5 md:p-6 rounded-2xl bg-obsidian/30 hover:bg-obsidian/55 border border-champagne/25 hover:border-champagne/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(214,194,154,0.25)] transition-all duration-400 flex flex-col justify-between overflow-hidden backdrop-blur-sm shadow-luxury will-change-transform"
                style={{
                  transform: 'perspective(1000px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Subtle gold ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-champagne/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                <div className="transform group-hover:translate-z-10 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif-luxury text-2xl text-champagne font-light drop-shadow transform group-hover:translate-z-20 transition-transform duration-300">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-obsidian/60 border border-champagne/30 flex items-center justify-center text-champagne group-hover:scale-110 group-hover:bg-champagne group-hover:text-obsidian transition-all duration-300 shadow-sm backdrop-blur-md transform group-hover:translate-z-20">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>
                  <h3 className="font-serif-luxury text-lg text-ivory mb-2 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-champagne transition-colors duration-300">
                    {st.title}
                  </h3>
                  <p className="text-ivory-soft text-xs font-sans font-light leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-champagne/15 text-[9px] uppercase tracking-widest text-champagne/80 font-mono flex items-center justify-between">
                  <span>Atelier HAMHOLD</span>
                  <span className="text-[10px] text-champagne/60">Stage {st.num}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
