import React, { useState } from 'react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { GhostInterleapText } from './TextAnimations';
import { useParallax } from '../hooks/useParallax';

function CategoryCard({ cat, onNavigate }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  const imageParallaxRef = useParallax({ speed: 0.06, maxOffset: 10 });

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - y) * 8;
    const rotY = (x - 0.5) * 8;
    setTilt({ x: rotX, y: rotY, glareX: x * 100, glareY: y * 100, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  return (
    <div
      onClick={() => onNavigate({ category: cat.id })}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) translateZ(10px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)',
        transformStyle: 'preserve-3d',
        transition: tilt.isHovered ? 'transform 0.12s ease-out' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="card-hover-lift-fill flex-shrink-0 w-44 sm:w-52 md:w-auto group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-obsidian-card/75 hover:bg-obsidian-card border border-champagne/15 hover:border-champagne/50 transition-all duration-350 cursor-pointer shadow-luxury hover:shadow-luxury-hover overflow-hidden will-change-transform"
    >
      {/* Warm Charcoal / Bronze-Tinted Luxury Fill Transition */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-espresso-light/50 via-obsidian-surface to-obsidian opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-radial-gradient from-champagne/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

      {/* Specular Glare Overlay */}
      {tilt.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl opacity-70"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(214, 194, 154, 0.22) 0%, rgba(214, 194, 154, 0.04) 45%, transparent 70%)`
          }}
        />
      )}

      {/* Category Image Area with Integrated Circular Decorative Rings & Ambient Glow */}
      <div className="relative z-10 w-full aspect-square max-w-[140px] sm:max-w-[160px] mb-3.5 flex items-center justify-center">
        {/* Decorative Circular Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-champagne/25 group-hover:border-champagne/50 transition-colors duration-500 pointer-events-none" />

        {/* Concentric Subtle Orbital Accent Ring */}
        <div className="absolute -inset-1 rounded-full border border-champagne/15 border-dashed group-hover:border-champagne/30 transition-all duration-700 pointer-events-none" />

        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-2 rounded-full bg-espresso/60 group-hover:bg-champagne/15 blur-md transition-colors duration-500 pointer-events-none" />

        {/* Medallion Image Viewport Filling the Inner Region with Image Parallax */}
        <div
          ref={imageParallaxRef}
          className="relative w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-full overflow-hidden border border-champagne/35 bg-obsidian shadow-2xl will-change-transform"
        >
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            decoding="async"
            width="240"
            height="240"
            className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Subtle vignette for luxury depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      </div>

      {/* Category Name & Discover action */}
      <div className="text-center relative z-10 w-full mt-auto">
        <h3 className="font-serif-luxury text-sm sm:text-base text-ivory group-hover:text-champagne transition-colors duration-300 line-clamp-1">
          {cat.name}
        </h3>
        <span className="text-[10px] text-champagne/80 group-hover:text-champagne uppercase tracking-[0.2em] font-sans mt-1.5 flex items-center justify-center gap-1 transition-colors">
          <span>Explore</span>
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </div>
  );
}

export default function ShopByCategory() {
  const { navigateToCatalogue } = useShop();
  const bgParallaxRef = useParallax({ speed: 0.15, maxOffset: 35 });

  return (
    <section className="py-20 md:py-28 bg-obsidian border-t border-champagne/10 relative overflow-hidden">
      {/* Background radial accent with smooth parallax */}
      <div
        ref={bgParallaxRef}
        className="absolute top-1/2 left-0 w-96 h-96 bg-espresso-light/30 rounded-full blur-[100px] pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium block mb-2">
              Curated Architecture
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-ivory tracking-[0.03em] font-normal">
              <GhostInterleapText text="DISCOVER YOUR SIGNATURE" />
            </h2>
          </div>
          <button
            onClick={() => navigateToCatalogue()}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-champagne hover:text-champagne-light transition-colors group"
          >
            <span>VIEW ALL CATEGORIES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Categories Grid (Desktop) & Swipe Carousel (Mobile) */}
        <div className="flex overflow-x-auto no-scrollbar md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.slice(0, 10).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} onNavigate={navigateToCatalogue} />
          ))}
        </div>
      </div>
    </section>
  );
}

