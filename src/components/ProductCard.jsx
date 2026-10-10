import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../data/products';
import { useParallax } from '../hooks/useParallax';

export default function ProductCard({ product, priority = false }) {
  const { isInWishlist, toggleWishlist, addToCart, setSelectedProduct } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  const imageParallaxRef = useParallax({ speed: 0.05, maxOffset: 8 });
  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e) => {
    // Only apply on fine-pointer devices (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - y) * 8; // subtle tilt max 4 deg
    const rotY = (x - 0.5) * 8;
    setTilt({ x: rotX, y: rotY, glareX: x * 100, glareY: y * 100, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) translateZ(10px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)',
        transformStyle: 'preserve-3d',
        transition: tilt.isHovered ? 'transform 0.12s ease-out' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="card-hover-lift-fill group relative flex flex-col bg-obsidian-card/75 hover:bg-obsidian-card rounded-xl border border-champagne/15 hover:border-champagne/45 transition-all duration-350 overflow-hidden cursor-pointer shadow-luxury hover:shadow-luxury-hover will-change-transform"
    >
      {/* Warm Charcoal / Bronze Luxury Fill Transition */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-espresso-light/40 via-obsidian-card to-obsidian opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
      <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-radial-gradient from-champagne/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

      {/* AR/VR Specular Reflection Overlay */}
      {tilt.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-xl opacity-75"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(214, 194, 154, 0.2) 0%, rgba(214, 194, 154, 0.04) 40%, transparent 70%)`
          }}
        />
      )}
      {/* Badges */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-semibold bg-champagne text-obsidian rounded-full shadow-sm">
            New
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-medium bg-espresso-light/90 text-champagne border border-champagne/30 rounded-full backdrop-blur-sm">
            Bestseller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        aria-label="Add to wishlist"
        className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-obsidian/70 hover:bg-obsidian border border-champagne/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-ivory backdrop-blur-md"
      >
        <Heart
          className={`w-4 h-4 transition-colors duration-300 ${
            wishlisted ? 'fill-champagne text-champagne' : 'text-ivory/70 hover:text-champagne'
          }`}
        />
      </button>

      {/* Product Image Viewport Container with Image Parallax */}
      <div className="relative z-10 w-full aspect-square flex items-center justify-center overflow-hidden bg-gradient-radial from-espresso/30 via-obsidian-card to-obsidian">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute inset-0 bg-radial-gradient from-champagne/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

        {/* Primary Jewellery Image with Parallax Depth */}
        <img
          ref={imageParallaxRef}
          src={product.primaryImage || product.thumbImage}
          srcSet={
            product.thumbImage && product.primaryImage && product.thumbImage !== product.primaryImage
              ? `${product.thumbImage} 720w, ${product.primaryImage} 1200w`
              : undefined
          }
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 380px"
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width="600"
          height="600"
          onError={(e) => {
            if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
              e.currentTarget.src = product.fallbackImage;
            }
          }}
          className={`product-card-image w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform ${
            product.primaryImage?.endsWith('.svg')
              ? 'object-contain p-6 relative z-[1] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]'
              : 'object-cover object-center'
          }`}
        />

        {/* Quick View Button (Desktop overlay) */}
        <div className="absolute inset-x-4 bottom-4 z-20 hidden md:flex opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-obsidian-surface/90 hover:bg-champagne hover:text-obsidian border border-champagne/30 text-ivory text-[11px] uppercase tracking-widest font-semibold backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-300 shadow-luxury"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="relative z-10 p-4 md:p-5 flex flex-col flex-grow justify-between border-t border-champagne/10 bg-obsidian-light/30">
        <div>
          {/* Category & Collection */}
          <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-taupe-light mb-1.5 font-medium">
            <span>{product.collection}</span>
            <span>{product.metal.split(' ')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif-luxury text-base md:text-lg text-ivory line-clamp-1 group-hover:text-champagne transition-colors duration-300">
            {product.name}
          </h3>

          {/* Stone detail */}
          <p className="text-[11px] text-ivory-muted/70 line-clamp-1 mt-0.5 font-sans">
            {product.stone.split('(')[0]}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-champagne/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-semibold text-champagne tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-ivory-muted/50 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label="Add to Bag"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAdded
                ? 'bg-champagne text-obsidian scale-105'
                : 'bg-champagne/10 hover:bg-champagne text-champagne hover:text-obsidian border border-champagne/30'
            }`}
          >
            {isAdded ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
