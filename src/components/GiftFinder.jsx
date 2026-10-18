import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Gift, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { NeonTypewriterText } from './TextAnimations';

export default function GiftFinder() {
  const { navigateToCatalogue } = useShop();
  const videoRef = useRef(null);
  const showcaseRef = useRef(null);

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

  const allFilteredGifts = useMemo(() => {
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
    });
  }, [recipient, occasion, budget]);

  // Display 6 cards per desktop row
  const CARDS_PER_ROW = 6;
  const totalRows = Math.max(1, Math.ceil(allFilteredGifts.length / CARDS_PER_ROW));

  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [animState, setAnimState] = useState('active'); // 'entering' | 'active' | 'exiting'
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // Track showcase visibility
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset row & enter animation when filters change
  useEffect(() => {
    setCurrentRowIndex(0);
    setAnimState('entering');
    const t = setTimeout(() => {
      setAnimState('active');
    }, 40);
    return () => clearTimeout(t);
  }, [recipient, occasion, budget]);

  // Premium continuous vertical showcase transition sequence
  useEffect(() => {
    if (totalRows <= 1 || !isInView || isPaused || prefersReducedMotion) return;

    // Showcase cycle: Display cards in center for 6.5s before transitioning to next row
    const cycleTimer = setTimeout(() => {
      // 1. Row continues upward with restrained fade-out and slight scale reduction
      setAnimState('exiting');

      const advanceTimer = setTimeout(() => {
        // 2. Next row enters smoothly from below with subtle dark transition
        setCurrentRowIndex((prev) => (prev + 1) % totalRows);
        setAnimState('entering');

        const activeTimer = setTimeout(() => {
          // 3. Complete product cards become clearly visible in center
          setAnimState('active');
        }, 50);

        return () => clearTimeout(activeTimer);
      }, 650);

      return () => clearTimeout(advanceTimer);
    }, 6500);

    return () => clearTimeout(cycleTimer);
  }, [totalRows, currentRowIndex, isInView, isPaused, prefersReducedMotion]);

  const currentGifts = useMemo(() => {
    return allFilteredGifts.slice(
      currentRowIndex * CARDS_PER_ROW,
      (currentRowIndex + 1) * CARDS_PER_ROW
    );
  }, [allFilteredGifts, currentRowIndex]);

  const handleNextRow = () => {
    if (totalRows <= 1) return;
    setAnimState('exiting');
    setTimeout(() => {
      setCurrentRowIndex((prev) => (prev + 1) % totalRows);
      setAnimState('entering');
      setTimeout(() => setAnimState('active'), 50);
    }, 350);
  };

  const handlePrevRow = () => {
    if (totalRows <= 1) return;
    setAnimState('exiting');
    setTimeout(() => {
      setCurrentRowIndex((prev) => (prev - 1 + totalRows) % totalRows);
      setAnimState('entering');
      setTimeout(() => setAnimState('active'), 50);
    }, 350);
  };

  return (
    <>
      {/* 1. Gift Finder Section with Background Video 6 (Steps 1, 2, 3) */}
      <section id="gift-finder" className="pt-20 md:pt-24 pb-12 md:pb-16 bg-obsidian border-t border-champagne/15 relative overflow-hidden">
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
          {/* Header with single-line desktop title and responsive wrapping */}
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-8 md:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian/70 border border-champagne/30 text-champagne text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium mb-4 md:mb-5 backdrop-blur-md shadow-luxury">
              <Gift className="w-3.5 h-3.5 text-champagne" />
              <span>Interactive Gift Atelier</span>
            </div>
            <h2 className="font-serif-luxury text-[clamp(1.5rem,2.7vw,2.7rem)] text-ivory tracking-[0.025em] font-normal leading-tight mt-1 mb-3.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] whitespace-normal md:whitespace-nowrap">
              Find something they will never forget
            </h2>
            <p className="text-ivory-soft text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Select your preferences below to discover bespoke creations tailored for that unforgettable milestone.
            </p>
          </div>

          {/* Compact Filter Controls Bar without excess right-side empty space */}
          <div className="bg-obsidian/60 sm:bg-obsidian/50 border border-champagne/30 rounded-2xl p-4 sm:p-5 sm:px-6 shadow-2xl backdrop-blur-md w-fit max-w-[calc(100vw-2rem)] mx-auto space-y-3.5 sm:space-y-4 mt-6 sm:mt-8">
            {/* 1. Recipient Selector */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                1. Who is this gift for?
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {[
                  { id: 'all', label: 'All Recipients' },
                  { id: 'her', label: 'For Her' },
                  { id: 'him', label: 'For Him' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setRecipient(btn.id)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all ${
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
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
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
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all ${
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
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
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
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all ${
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

      {/* 2. Distinct Handpicked Recommendations Section (6 Cards Per Row on Desktop + Vertical Showcase Animation) */}
      <section
        ref={showcaseRef}
        aria-label="Gift Recommendations"
        className="py-12 md:py-16 bg-espresso-dark/95 border-t border-champagne/15 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
      >
        {/* Ambient subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-champagne/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1600px] xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {currentGifts.length > 0 ? (
            <div>
              {/* Section Header Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-ivory-muted font-medium">
                    Showing {currentGifts.length} Handpicked Gift Recommendation{currentGifts.length > 1 ? 's' : ''}
                    {totalRows > 1 && (
                      <span className="text-champagne/80 font-normal ml-2">
                        (Set {currentRowIndex + 1} of {totalRows})
                      </span>
                    )}
                  </span>
                  {totalRows > 1 && (
                    <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-obsidian/60 border border-champagne/20 text-[10px] text-champagne/80">
                      {isPaused ? <Play className="w-2.5 h-2.5" /> : <Pause className="w-2.5 h-2.5" />}
                      <span>{isPaused ? 'Paused on inspection' : 'Continuous showcase'}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {totalRows > 1 && (
                    <div className="flex items-center gap-1 mr-2">
                      <button
                        onClick={handlePrevRow}
                        aria-label="Previous recommendation row"
                        className="w-7 h-7 rounded-full bg-obsidian-surface border border-champagne/25 text-ivory hover:text-champagne hover:border-champagne/50 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNextRow}
                        aria-label="Next recommendation row"
                        className="w-7 h-7 rounded-full bg-obsidian-surface border border-champagne/25 text-ivory hover:text-champagne hover:border-champagne/50 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => navigateToCatalogue()}
                    className="text-xs uppercase tracking-widest text-champagne hover:text-champagne-light flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Browse Entire Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Showcase Container with vertical transition masks and smooth continuous translate animation */}
              <div className="relative py-1">
                {/* Subtle dark transition edge layers */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-espresso-dark/95 to-transparent z-10 opacity-70" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-espresso-dark/95 to-transparent z-10 opacity-70" />

                {/* 6-Card Desktop Grid with vertical animation states */}
                <div
                  style={{
                    transform:
                      animState === 'entering'
                        ? 'translateY(28px) scale(0.99)'
                        : animState === 'exiting'
                        ? 'translateY(-24px) scale(0.985)'
                        : 'translateY(0) scale(1)',
                    opacity: animState === 'active' ? 1 : 0,
                    transition: prefersReducedMotion
                      ? 'none'
                      : animState === 'exiting'
                      ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
                      : animState === 'active'
                      ? 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1)'
                      : 'none',
                    willChange: 'transform, opacity'
                  }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-3.5 xl:gap-4"
                >
                  {currentGifts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </div>

              {/* Pagination Dots when multiple rows exist */}
              {totalRows > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: totalRows }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === currentRowIndex) return;
                        setAnimState('exiting');
                        setTimeout(() => {
                          setCurrentRowIndex(idx);
                          setAnimState('entering');
                          setTimeout(() => setAnimState('active'), 50);
                        }, 350);
                      }}
                      aria-label={`Go to row ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentRowIndex === idx
                          ? 'w-6 bg-champagne shadow-glow'
                          : 'w-2 bg-champagne/25 hover:bg-champagne/50'
                      }`}
                    />
                  ))}
                </div>
              )}
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
                className="px-6 py-2.5 rounded-full bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold cursor-pointer"
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
