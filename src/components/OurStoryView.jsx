import React from 'react';
import { useShop } from '../context/ShopContext';
import { Compass, Shield, Heart, Sparkles, Clock, Hammer, ArrowRight } from 'lucide-react';
import { GhostInterleapText } from './TextAnimations';
import BackButton from './BackButton';

export default function OurStoryView() {
  const { navigateToCatalogue } = useShop();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in space-y-24">
      {/* Back Button */}
      <div className="flex items-center justify-start">
        <BackButton fallbackView="home" label="Back to Atelier" />
      </div>

      {/* 1. Hero Manifesto */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-champagne font-semibold block">
          The Midnight Atelier
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-ivory tracking-[0.03em] font-normal leading-[1.12]">
          <GhostInterleapText>
            JEWELLERY CRAFTED <br />
            <span className="text-gold-gradient italic">TO HOLD FOREVER.</span>
          </GhostInterleapText>
        </h1>
        <p className="text-ivory-soft text-sm sm:text-base md:text-lg font-sans font-light leading-relaxed">
          Founded on the conviction that fine jewellery is humanity’s ultimate vessel of memory. In a fast-moving world of transient adornment, certain milestones demand an enduring physical anchor.
        </p>
      </div>

      {/* 2. Visual Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-champagne/30 shadow-2xl bg-obsidian-card">
          <img
            src="/images/brand/ambassador/ambassador-portrait.webp"
            alt="HAMHOLD Atelier Craft"
            className="w-full h-[450px] sm:h-[550px] object-cover object-top filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-obsidian/80 backdrop-blur-md border border-champagne/20">
            <span className="font-serif-luxury text-champagne text-base italic block">
              "Every cut of solid 18K gold and setting of stone is measured against one timeless standard: will this piece hold its emotional weight fifty years from today?"
            </span>
            <span className="text-[10px] text-ivory-muted uppercase tracking-widest block mt-1 font-mono">
              The Atelier Standard
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 text-xs sm:text-sm text-ivory-soft/90 font-light leading-relaxed font-sans">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/25 text-champagne text-[10px] uppercase tracking-widest font-medium">
            <span>Philosophy &amp; Metallurgy</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal leading-tight">
            Architectural Geometry Meets Neoclassical Discipline
          </h2>
          <p>
            HAMHOLD is an independent luxury fine jewellery atelier. Our aesthetic signature — the <em>Midnight Atelier</em> — moves away from conventional bright-lit commercial showrooms, embracing deep obsidian, warm ivory, and refined champagne tones.
          </p>
          <p>
            Every ring, necklace, cuff, and kada in our catalogue is conceived not as fleeting seasonal fashion, but as a structural heirloom. We work exclusively with certified 18K solid gold, 950 platinum, naturally certified conflict-free diamonds, and museum-grade gemstones.
          </p>
          <div className="p-5 rounded-xl bg-obsidian-card/80 border border-champagne/20 shadow-luxury">
            <h4 className="font-serif-luxury text-base text-champagne mb-1 font-normal">
              100% Certified &amp; Hallmarked
            </h4>
            <p className="text-ivory-muted text-xs">
              Every creation receives government-approved BIS Hallmarking inspection and certified diamond grading documentation before leaving our vault.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Four Atelier Pillars */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
            Pillars of Excellence
          </span>
          <h3 className="font-serif-luxury text-3xl text-ivory">Our Core Commitments</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Compass,
              title: 'Architectural Balance',
              desc: 'Clean neoclassical geometry paired with comfortable ergonomic curves that adapt seamlessly to daily living.'
            },
            {
              icon: Sparkles,
              title: 'Sovereign Materials',
              desc: 'Solid 18K gold, dense 950 platinum, and conflict-free natural diamonds selected for purity, luster, and longevity.'
            },
            {
              icon: Heart,
              title: 'Milestones & Memories',
              desc: 'Physical anchors marking personal victories, anniversaries, and quiet everyday milestones to cherish across generations.'
            },
            {
              icon: Clock,
              title: 'Crafted to Hold Forever',
              desc: 'Structural engineering that outlasts transient fast fashion, holding its value and emotional significance intact.'
            }
          ].map((pil, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-obsidian-surface border border-champagne/20 hover:border-champagne/45 transition-all duration-300 shadow-luxury flex flex-col justify-between"
              style={{
                transform: 'perspective(1000px)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/25 flex items-center justify-center text-champagne mb-4">
                  <pil.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif-luxury text-lg text-ivory mb-2 font-normal">
                  {pil.title}
                </h4>
                <p className="text-ivory-muted text-xs font-sans font-light leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Atelier CTA */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-radial from-espresso-dark/90 via-obsidian-surface to-obsidian border border-champagne/30 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
        <h3 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal">
          Begin Your Heirloom Journey
        </h3>
        <p className="text-xs sm:text-sm text-ivory-muted max-w-lg mx-auto font-light leading-relaxed">
          Explore our fine jewellery collections, curated with obsessive craftsmanship and certified precious materials.
        </p>
        <button
          onClick={() => navigateToCatalogue()}
          className="px-8 py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.22em] uppercase font-semibold transition-all shadow-glow inline-flex items-center gap-2"
        >
          <span>EXPLORE THE CATALOGUE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
