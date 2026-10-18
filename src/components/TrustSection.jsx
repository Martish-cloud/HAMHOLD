import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Truck, ShieldCheck, RefreshCw, Sparkles, Package } from 'lucide-react';

/**
 * Configurable Timing Map Synchronized with Video (9).mp4 (Total duration: 8.00s)
 * 
 * Visual Event Sequence Identified in Video 9:
 * 1. 0.0s – 1.4s: White-gloved hand sealing the tamper-proof gold ribbon on the luxury dispatch box with glowing light trails -> Insured Shipping
 * 2. 1.4s – 2.6s: Magnifying glass inspecting the certified circular 'BIS' hallmark on solid gold ingot -> BIS Hallmarked
 * 3. 2.6s – 4.0s: 3D curved gold exchange arrows rotating between two luxury jewellery boxes -> Easy Exchange
 * 4. 4.0s – 5.6s: Precision atelier jeweler tools micro-polishing gold chain with bright golden sparks -> Lifetime Atelier Care
 * 5. 5.6s – 8.0s: Bespoke Obsidian Atelier gift box and gold ornament with packaging icons -> Midnight Packaging
 */
export const BENEFIT_TIMING_MAP = [
  { id: 0, title: 'Insured Shipping', start: 0.0, end: 1.4 },
  { id: 1, title: 'BIS Hallmarked', start: 1.4, end: 2.6 },
  { id: 2, title: 'Easy Exchange', start: 2.6, end: 4.0 },
  { id: 3, title: 'Lifetime Atelier Care', start: 4.0, end: 5.6 },
  { id: 4, title: 'Midnight Packaging', start: 5.6, end: 8.0 },
];

export default function TrustSection() {
  const videoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const trustFeatures = [
    {
      icon: Truck,
      title: 'Insured Shipping',
      desc: 'Complimentary tamper-proof insured express delivery across India for orders above ₹25,000.'
    },
    {
      icon: ShieldCheck,
      title: 'BIS Hallmarked',
      desc: '100% government-approved BIS hallmarked gold and certified lab-graded natural diamonds.'
    },
    {
      icon: RefreshCw,
      title: 'Easy Exchange',
      desc: '15-day complimentary exchange & resize policy with insured home collection.'
    },
    {
      icon: Sparkles,
      title: 'Lifetime Atelier Care',
      desc: 'Complimentary ultrasonic cleaning, prong inspection, and polish refresh at our atelier.'
    },
    {
      icon: Package,
      title: 'Midnight Packaging',
      desc: 'Arrives in our bespoke Obsidian Atelier gift box with certified authenticity cards.'
    }
  ];

  // Check reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Determine active index from video currentTime
  const getIndexFromTime = useCallback((time) => {
    const t = ((time % 8.0) + 8.0) % 8.0;
    for (let i = 0; i < BENEFIT_TIMING_MAP.length; i++) {
      if (t >= BENEFIT_TIMING_MAP[i].start && t < BENEFIT_TIMING_MAP[i].end) {
        return i;
      }
    }
    return 0;
  }, []);

  // Synchronize active benefit with video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animFrameId = null;
    let isRunning = true;

    const syncLoop = () => {
      if (!isRunning) return;
      if (video && !video.paused && !video.seeking) {
        const idx = getIndexFromTime(video.currentTime);
        setActiveIndex((prev) => (prev !== idx ? idx : prev));
      }
      animFrameId = requestAnimationFrame(syncLoop);
    };

    animFrameId = requestAnimationFrame(syncLoop);

    const handleTimeUpdate = () => {
      if (video) {
        const idx = getIndexFromTime(video.currentTime);
        setActiveIndex((prev) => (prev !== idx ? idx : prev));
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      isRunning = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [getIndexFromTime]);

  // Click on a benefit to jump video to that moment
  const handleBenefitClick = (idx) => {
    setActiveIndex(idx);
    if (videoRef.current && BENEFIT_TIMING_MAP[idx]) {
      videoRef.current.currentTime = BENEFIT_TIMING_MAP[idx].start + 0.05;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <section className="relative py-24 sm:py-28 lg:py-36 min-h-[460px] md:min-h-[500px] lg:min-h-[540px] flex items-center justify-center bg-obsidian overflow-hidden border-t border-b border-champagne/20">
      {/* Background Video 9 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center filter brightness-[0.95]"
        >
          <source src="/Video/Video%20(9).mp4" type="video/mp4" />
        </video>

        {/* 10% subtle darkening & softening vignette overlay to maintain ~90% visual visibility */}
        <div className="absolute inset-0 bg-obsidian/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-obsidian/40 pointer-events-none" />
      </div>

      {/* Five Benefits Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 text-center items-stretch justify-center">
          {trustFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const isActive = isReducedMotion ? false : activeIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => handleBenefitClick(idx)}
                className={`relative group flex flex-col items-center justify-between p-5 md:p-6 rounded-2xl transition-all duration-700 ease-out cursor-pointer select-none backdrop-blur-md ${
                  isActive
                    ? 'scale-[1.04] -translate-y-1.5 bg-obsidian/85 border-champagne/60 shadow-[0_12px_36px_rgba(212,175,55,0.22)] ring-1 ring-champagne/40'
                    : 'scale-100 translate-y-0 bg-obsidian/60 border-champagne/15 hover:border-champagne/35 hover:bg-obsidian/70 shadow-luxury'
                } border ${idx === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : ''}`}
              >
                {/* Top subtle active indicator pill */}
                <div
                  className={`w-8 h-1 rounded-full mb-3 transition-all duration-500 ${
                    isActive
                      ? 'bg-champagne shadow-[0_0_10px_rgba(212,175,55,0.8)] opacity-100'
                      : 'bg-transparent opacity-0'
                  }`}
                />

                {/* Icon Circle */}
                <div
                  className={`w-13 h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3.5 transition-all duration-700 ${
                    isActive
                      ? 'bg-champagne text-obsidian border-champagne scale-110 shadow-[0_0_22px_rgba(212,175,55,0.5)]'
                      : 'bg-champagne/10 text-champagne border-champagne/25 group-hover:border-champagne/40'
                  } border`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 stroke-[1.6]" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-start">
                  <h4
                    className={`font-serif-luxury text-base md:text-lg mb-1.5 font-normal tracking-wide transition-colors duration-500 ${
                      isActive
                        ? 'text-champagne font-medium drop-shadow-[0_2px_6px_rgba(212,175,55,0.3)]'
                        : 'text-ivory'
                    }`}
                  >
                    {feat.title}
                  </h4>
                  <p
                    className={`text-[11px] md:text-xs font-sans font-light leading-relaxed transition-colors duration-500 ${
                      isActive ? 'text-ivory-soft' : 'text-ivory-muted/80'
                    }`}
                  >
                    {feat.desc}
                  </p>
                </div>

                {/* Bottom subtle gold accent line */}
                <div
                  className={`mt-4 w-full h-[2px] transition-all duration-700 ${
                    isActive
                      ? 'bg-gradient-to-r from-transparent via-champagne to-transparent opacity-100'
                      : 'bg-transparent opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
