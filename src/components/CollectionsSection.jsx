import React, { useState, useRef, useEffect } from 'react';
import { COLLECTIONS, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { GhostInterleapText } from './TextAnimations';
import { useParallax } from '../hooks/useParallax';

export default function CollectionsSection() {
  const { navigateToCatalogue, setSelectedProduct } = useShop();
  const [activeCollectionId, setActiveCollectionId] = useState('SIGNATURE');
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const bgParallaxRef = useParallax({ speed: 0.14, maxOffset: 35 });
  const showcaseParallaxRef = useParallax({ speed: 0.05, maxOffset: 12 });

  const currentCollection =
    COLLECTIONS.find((c) => c.id === activeCollectionId) || COLLECTIONS[0];

  // Get products from this collection for full swiping experience
  let collectionProducts = PRODUCTS.filter(
    (p) => p.collection === activeCollectionId
  );

  // Exact required order for SIGNATURE COLLECTION curated pieces:
  // Position 1: Original Product #4 (symphony-sapphire-collar)
  // Position 2: Original Product #2 (zephyr-sculpted-hoops)
  // Position 3: Original Product #1 (elysian-emerald-ring)
  // Position 4: Original Product #3 (harmonia-tennis-necklace)
  if (activeCollectionId === 'SIGNATURE') {
    const signatureOrder = [
      'symphony-sapphire-collar',
      'zephyr-sculpted-hoops',
      'elysian-emerald-ring',
      'harmonia-tennis-necklace'
    ];
    collectionProducts.sort((a, b) => {
      const idxA = signatureOrder.indexOf(a.id);
      const idxB = signatureOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    checkScroll();
  }, [activeCollectionId]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 bg-espresso/30 border-t border-champagne/10 relative overflow-hidden">
      {/* Background Video 8 (~45-47% visual visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-[0.46] filter contrast-105 brightness-95"
        >
          <source src="/Video/Video%20(8).mp4" type="video/mp4" />
        </video>
        {/* Subtle dark overlay to ensure high text contrast while preserving ~45-47% video visibility */}
        <div className="absolute inset-0 bg-obsidian/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/50 pointer-events-none" />
      </div>

      {/* Decorative ambient lighting with parallax */}
      <div
        ref={bgParallaxRef}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[140px] pointer-events-none will-change-transform z-[1]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium block mb-1.5">
            Midnight Atelier Series
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-ivory tracking-[0.03em] font-normal mb-2">
            <GhostInterleapText text="THE HAMHOLD COLLECTIONS" />
          </h2>
          <p className="text-ivory-muted/80 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Each collection represents a distinct exploration of light, geometry, and eternal emotion.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-6 sm:mb-7 pb-1">
          {COLLECTIONS.map((col) => {
            const isActive = col.id === activeCollectionId;
            return (
              <button
                key={col.id}
                onClick={() => setActiveCollectionId(col.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'btn-3d bg-champagne text-obsidian shadow-glow font-semibold'
                    : 'btn-3d-secondary bg-obsidian-surface/60 text-ivory-soft hover:text-champagne hover:bg-obsidian-light border border-champagne/15'
                }`}
              >
                {col.name}
              </button>
            );
          })}
        </div>

        {/* Active Collection Editorial Showcase */}
        <div
          ref={showcaseParallaxRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-obsidian-card/75 border border-champagne/20 rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-md will-change-transform"
        >
          {/* Left: Collection Story & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-champagne mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Collection Spotlight</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivory mb-2 font-normal">
                <GhostInterleapText>{currentCollection.name} Collection</GhostInterleapText>
              </h3>
              <p className="text-champagne text-xs sm:text-sm font-serif italic mb-3">
                "{currentCollection.tagline}"
              </p>
              <p className="text-ivory-muted text-xs sm:text-[13px] font-sans font-light leading-relaxed mb-5 line-clamp-3">
                {currentCollection.description}
              </p>
            </div>

            <button
              onClick={() => navigateToCatalogue({ collection: currentCollection.id })}
              data-cursor="explore"
              className="btn-3d inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 w-fit group shadow-glow"
            >
              <span>EXPLORE {currentCollection.name.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right: Featured Pieces Horizontal Swipe Track */}
          <div className="lg:col-span-7 mt-4 lg:mt-0 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-widest text-champagne/80 font-sans">
                Curated Pieces ({collectionProducts.length})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous piece"
                  className="btn-3d-secondary w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian disabled:opacity-25 disabled:pointer-events-none transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Next piece"
                  className="btn-3d-secondary w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full border border-champagne/30 flex items-center justify-center text-champagne hover:bg-champagne hover:text-obsidian disabled:opacity-25 disabled:pointer-events-none transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto gap-3.5 sm:gap-4 pb-2 -mx-2 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
            >
              {collectionProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  data-cursor="view"
                  className="card-hover-lift-fill preserve-3d flex-shrink-0 w-38 sm:w-44 lg:w-44 snap-start group p-3 sm:p-3.5 rounded-xl bg-obsidian-surface/85 hover:bg-obsidian-surface border border-champagne/15 hover:border-champagne/50 transition-all duration-350 cursor-pointer flex flex-col justify-between hover:shadow-luxury-hover will-change-transform"
                >
                  {/* Warm Charcoal / Bronze Luxury Background Fill Transition */}
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-espresso-light/40 via-obsidian-card to-obsidian opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-radial-gradient from-champagne/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

                  {/* Product Image Container with 3D Depth */}
                  <div className="relative z-10 w-full aspect-square flex items-center justify-center mb-2.5 bg-obsidian-card rounded-lg overflow-hidden border border-champagne/15 group-hover:border-champagne/40 transition-colors duration-350 transform group-hover:translate-z-10">
                    <img
                      src={prod.primaryImage}
                      alt={prod.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform ${
                        prod.primaryImage?.endsWith('.svg')
                          ? 'object-contain p-4 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]'
                          : prod.imagePosition || 'object-cover object-center'
                      }`}
                    />
                  </div>
                  <div className="relative z-10 transform group-hover:translate-z-10">
                    <h4 className="font-serif-luxury text-xs sm:text-[13px] text-ivory line-clamp-1 group-hover:text-champagne transition-colors duration-300">
                      {prod.name}
                    </h4>
                    <div className="text-xs font-semibold text-champagne mt-0.5">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

