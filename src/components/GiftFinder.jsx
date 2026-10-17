import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Gift, ArrowRight } from 'lucide-react';
import { NeonTypewriterText } from './TextAnimations';

export default function GiftFinder() {
  const { navigateToCatalogue } = useShop();
  const videoRef = useRef(null);

  const [recipient, setRecipient] = useState('all'); // 'all' | 'her' | 'him'
  const [occasion, setOccasion] = useState('all'); // 'all' | 'anniversary' | 'birthday' | 'wedding' | 'engagement'
  const [budget, setBudget] = useState('all'); // 'all' | 'under25k' | 'under50k' | 'luxury'

  // Performance-optimized video playback: play when near viewport, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: '300px 0px', threshold: 0.05 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredGifts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Recipient check
      if (recipient === 'her' && p.gender !== 'women') return false;
      if (recipient === 'him' && p.gender !== 'men') return false;

      // Budget check
      if (budget === 'under25k' && p.price > 25000) return false;
      if (budget === 'under50k' && p.price > 50000) return false;
      if (budget === 'luxury' && p.price < 100000) return false;

      // Occasion check
      if (occasion !== 'all') {
        const matchesTag = p.giftingTags?.some((tag) =>
          tag.toLowerCase().includes(occasion.toLowerCase())
        );
        const matchesOccasion = p.occasion
          ?.toLowerCase()
          .includes(occasion.toLowerCase());
        if (!matchesTag && !matchesOccasion) return false;
      }

      return true;
    }).slice(0, 4);
  }, [recipient, occasion, budget]);

  return (
    <>
      {/* 1. Gift Finder Section with Background Video 6 (Steps 1, 2, 3) */}
      <section id="gift-finder" className="py-20 md:py-28 bg-obsidian border-t border-champagne/15 relative overflow-hidden">
        {/* Genuine Background Video 6 (~90% visual visibility) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center opacity-90 filter contrast-105 brightness-95"
          >
            <source src="/Video/Video%20(6).mp4" type="video/mp4" />
          </video>

          {/* Lightweight translucent overlay ensuring 90% video visibility while keeping text crisp */}
          <div className="absolute inset-0 bg-obsidian/25 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,11,12,0.45)_95%)] pointer-events-none" />

          {/* Soft edge seam transitions preventing video from spilling into sections above or below */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,0.9)_0%,transparent_12%,transparent_88%,rgba(11,11,12,0.9)_100%)] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian/70 border border-champagne/30 text-champagne text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium mb-3 backdrop-blur-md shadow-luxury">
              <Gift className="w-3.5 h-3.5 text-champagne" />
              <span>Interactive Gift Atelier</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal mb-3">
              <NeonTypewriterText text="Find something they will never forget" />
            </h2>
            <p className="text-ivory-soft text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Select your preferences below to discover bespoke creations tailored for that unforgettable milestone.
            </p>
          </div>

          {/* Filter Controls Bar (Steps 1, 2, 3) */}
          <div className="bg-obsidian/60 sm:bg-obsidian/50 border border-champagne/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md max-w-4xl mx-auto space-y-6">
            {/* 1. Recipient Selector */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                1. Who is this gift for?
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: 'all', label: 'All Recipients' },
                  { id: 'her', label: 'For Her' },
                  { id: 'him', label: 'For Him' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setRecipient(btn.id)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                      recipient === btn.id
                        ? 'btn-3d bg-champagne text-obsidian shadow-glow font-semibold'
                        : 'btn-3d-secondary bg-obsidian/75 text-ivory-soft hover:text-champagne border border-champagne/25 backdrop-blur-sm'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Occasion Selector */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                2. What is the occasion?
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Any Occasion' },
                  { id: 'anniversary', label: 'Anniversary' },
                  { id: 'birthday', label: 'Birthday' },
                  { id: 'wedding', label: 'Wedding' },
                  { id: 'engagement', label: 'Engagement' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setOccasion(btn.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                      occasion === btn.id
                        ? 'btn-3d bg-champagne text-obsidian shadow-glow font-semibold'
                        : 'btn-3d-secondary bg-obsidian/75 text-ivory-soft hover:text-champagne border border-champagne/25 backdrop-blur-sm'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Budget Tier */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                3. Select Budget Range
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Price Ranges' },
                  { id: 'under25k', label: 'Under ₹25,000' },
                  { id: 'under50k', label: 'Under ₹50,000' },
                  { id: 'luxury', label: 'Luxury (₹1,00,000+)' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setBudget(btn.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                      budget === btn.id
                        ? 'btn-3d bg-champagne text-obsidian shadow-glow font-semibold'
                        : 'btn-3d-secondary bg-obsidian/75 text-ivory-soft hover:text-champagne border border-champagne/25 backdrop-blur-sm'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Distinct Handpicked Recommendations Section (No Video 6 background, preserving original section design) */}
      <section aria-label="Gift Recommendations" className="py-14 md:py-20 bg-espresso-dark/95 border-t border-champagne/15 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredGifts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-widest text-ivory-muted font-medium">
                  Showing {filteredGifts.length} Handpicked Gift Recommendation{filteredGifts.length > 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => navigateToCatalogue()}
                  className="text-xs uppercase tracking-widest text-champagne hover:text-champagne-light flex items-center gap-1.5 transition-colors"
                >
                  <span>Browse Entire Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredGifts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-obsidian-card/40 rounded-xl border border-champagne/15 p-8 max-w-md mx-auto">
              <p className="text-ivory-soft text-sm mb-4">
                No direct matches found for this specific combination.
              </p>
              <button
                onClick={() => {
                  setRecipient('all');
                  setOccasion('all');
                  setBudget('all');
                }}
                className="px-6 py-2.5 rounded-full bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
