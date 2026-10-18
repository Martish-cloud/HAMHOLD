import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BlurWipeText } from './TextAnimations';
import image3 from '../../Images/THE HAMHOLD EDIT/Image 3.png';

export default function TheHamholdEdit() {
  const { navigateToCatalogue } = useShop();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const scrollContainerRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const lookbookImages = [
    {
      id: '01',
      title: '01 — THE SIGNATURE EDIT',
      subtitle: 'Sculpted in 18K solid gold, Polki diamonds & royal emeralds',
      tag: 'Grand Atelier',
      src: '/images/editorial/the-hamhold-edit/hamhold-edit-01.webp',
      srcWebp: '/images/editorial/the-hamhold-edit/hamhold-edit-01.webp',
      srcMobile: '/images/editorial/the-hamhold-edit/hamhold-edit-01-mobile.webp',
      aspect: 'aspect-[16/10.8]',
      focal: 'object-[51%_10%]',
      alt: 'HAMHOLD The Signature Edit - Haute Joaillerie'
    },
    {
      id: '02',
      title: '02 — TIMELESS ADORNMENT',
      subtitle: 'Heirloom silhouettes designed to transcend generations',
      tag: 'Heritage Collection',
      src: image3,
      aspect: 'aspect-[16/10.8]',
      focal: 'object-[49%_7%]',
      alt: 'HAMHOLD Timeless Adornment - Emerald & Gold Haute Joaillerie'
    }
  ];

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleSwipe = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(checkScroll, 350);
  };

  // Lightbox keyboard controls
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev + 1) % lookbookImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev - 1 + lookbookImages.length) % lookbookImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, lookbookImages.length]);

  return (
    <section className="py-24 md:py-36 bg-obsidian border-t border-champagne/15 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-espresso/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-champagne/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso-light/60 border border-champagne/25 text-champagne text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>Editorial Lookbook</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivory tracking-[0.03em] font-normal leading-[1.08] mb-3">
              <BlurWipeText text="THE HAMHOLD EDIT" />
            </h2>
            <p className="text-ivory-soft/85 text-xs sm:text-sm md:text-base font-sans font-light tracking-wide leading-relaxed">
              A study in light, craftsmanship, and timeless adornment. Swipe to experience the collection.
            </p>
          </div>

          {/* Swipe / Navigation Controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => handleSwipe('left')}
              disabled={!canScrollLeft}
              aria-label="Previous editorial card"
              className={`btn-3d-secondary w-11 h-11 rounded-full border border-champagne/30 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'bg-obsidian-surface hover:bg-champagne hover:text-obsidian text-champagne hover:scale-105 active:scale-95 shadow-luxury'
                  : 'bg-obsidian/30 text-champagne/30 border-champagne/10 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSwipe('right')}
              disabled={!canScrollRight}
              aria-label="Next editorial card"
              className={`btn-3d-secondary w-11 h-11 rounded-full border border-champagne/30 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'bg-obsidian-surface hover:bg-champagne hover:text-obsidian text-champagne hover:scale-105 active:scale-95 shadow-luxury'
                  : 'bg-obsidian/30 text-champagne/30 border-champagne/10 cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Balanced Editorial Gallery Container */}
        <div className="max-w-[1080px] mx-auto">
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex md:grid md:grid-cols-2 gap-6 lg:gap-7 items-stretch overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {lookbookImages.map((imgItem, index) => (
              <div key={imgItem.id} className="flex-shrink-0 w-[84vw] sm:w-[420px] md:w-auto snap-center flex flex-col">
                <div
                  onClick={() => setActiveLightboxIndex(index)}
                  data-cursor="view"
                  className={`card-hover-lift-fill preserve-3d group relative flex-1 min-h-[300px] sm:min-h-[340px] lg:min-h-[370px] ${imgItem.aspect} rounded-2xl overflow-hidden bg-obsidian-card border border-champagne/20 hover:border-champagne/55 transition-all duration-700 cursor-pointer shadow-luxury hover:shadow-luxury-hover flex flex-col justify-end will-change-transform`}
                >
                  <picture className="absolute inset-0 w-full h-full block">
                    {imgItem.srcMobile && (
                      <source media="(max-width: 640px)" srcSet={imgItem.srcMobile} type="image/webp" />
                    )}
                    {imgItem.srcWebp && (
                      <source srcSet={imgItem.srcWebp} type="image/webp" />
                    )}
                    <img
                      src={imgItem.src}
                      alt={imgItem.alt}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover ${imgItem.focal} transition-transform duration-1000 ease-out group-hover:scale-[1.04]`}
                    />
                  </picture>

                  {/* Gradient Vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-obsidian/30 via-transparent to-transparent opacity-50 pointer-events-none" />

                  {/* Top Tag with 3D Depth */}
                  <div className="absolute top-4 left-4 z-10 transform group-hover:translate-z-20 transition-transform duration-300">
                    <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.25em] font-medium bg-obsidian/80 text-champagne border border-champagne/30 backdrop-blur-md shadow-sm">
                      {imgItem.tag}
                    </span>
                  </div>

                  {/* Centered Circular Luxury VIEW Button with 3D Float on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div
                      style={{ transform: 'translateZ(36px)' }}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-champagne/60 bg-obsidian/85 backdrop-blur-md flex flex-col items-center justify-center text-champagne opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 shadow-luxury"
                    >
                      <Eye className="w-4.5 h-4.5 mb-0.5 text-champagne" />
                      <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-medium uppercase text-ivory">VIEW</span>
                    </div>
                  </div>

                  {/* Bottom Editorial Caption with 3D Depth */}
                  <div className="relative z-10 p-5 sm:p-6 lg:p-6.5 transform group-hover:translate-z-10 transition-transform duration-300">
                    <span className="font-serif-luxury text-base sm:text-xl lg:text-xl text-ivory block font-normal group-hover:text-champagne transition-colors duration-300">
                      {imgItem.title}
                    </span>
                    <p className="text-[11px] sm:text-xs md:text-[13px] text-ivory-soft/80 font-sans font-light mt-1 leading-snug">
                      {imgItem.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Action */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={() => navigateToCatalogue({ gender: 'women' })}
            data-cursor="explore"
            className="btn-3d inline-flex items-center gap-3 px-9 py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.22em] uppercase font-semibold transition-all duration-300 shadow-glow group"
          >
            <span>DISCOVER THE HIGH JEWELLERY EDIT</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Lightbox Viewer Modal */}
      {activeLightboxIndex !== null && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-obsidian/80 hover:bg-obsidian border border-champagne/30 text-ivory hover:text-champagne flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev - 1 + lookbookImages.length) % lookbookImages.length);
            }}
            aria-label="Previous Image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-obsidian/70 hover:bg-obsidian border border-champagne/25 text-ivory hover:text-champagne flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev + 1) % lookbookImages.length);
            }}
            aria-label="Next Image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-obsidian/70 hover:bg-obsidian border border-champagne/25 text-ivory hover:text-champagne flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Lightbox Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
          >
            <img
              src={lookbookImages[activeLightboxIndex].src}
              alt={lookbookImages[activeLightboxIndex].alt}
              className="max-h-[75vh] w-auto object-contain rounded-xl border border-champagne/25 shadow-2xl"
            />
            {/* Lightbox Caption */}
            <div className="mt-4 text-center">
              <span className="font-serif-luxury text-lg text-champagne block font-medium">
                {lookbookImages[activeLightboxIndex].title}
              </span>
              <span className="text-xs text-ivory-muted/80 font-sans mt-0.5 block">
                {lookbookImages[activeLightboxIndex].subtitle} • {activeLightboxIndex + 1} / {lookbookImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
