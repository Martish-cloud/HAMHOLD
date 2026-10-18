import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../data/products';
import { useParallax } from '../hooks/useParallax';
import { use3DTilt } from '../hooks/use3DTilt';

export default function ProductCard({ product, priority = false, compact = false }) {
  const { isInWishlist, toggleWishlist, addToCart, setSelectedProduct } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const imageParallaxRef = useParallax({ speed: 0.05, maxOffset: 8 });
  const wishlisted = isInWishlist(product.id);

  const { tiltState, tiltStyle, glareStyle, bind } = use3DTilt({
    maxTilt: 7,
    perspective: 1100,
    scale: 1.025,
    elevationY: -8,
    translateZ: 14,
    speed: 450,
    glare: true
  });

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
      data-cursor="view"
      style={tiltStyle}
      {...bind}
      className="card-hover-lift-fill preserve-3d group relative flex flex-col bg-obsidian-card/80 hover:bg-obsidian-card rounded-xl border border-champagne/15 hover:border-champagne/50 transition-colors duration-350 overflow-hidden cursor-pointer shadow-luxury hover:shadow-luxury-hover will-change-transform"
    >
      {/* Warm Charcoal / Bronze Luxury Fill Transition */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-gradient-to-br from-espresso-light/40 via-obsidian-card to-obsidian opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
      <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-radial-gradient from-champagne/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

      {/* Dynamic Specular Sheen Reflection Overlay */}
      {glareStyle && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-xl pointer-events-none"
          style={glareStyle}
        />
      )}

      {/* Badges with 3D Depth */}
      <div
        style={{ transform: tiltState.isHovered ? 'translateZ(26px)' : 'translateZ(0px)' }}
        className={`absolute z-20 flex flex-col pointer-events-none transition-transform duration-300 ${
          compact ? 'top-2.5 left-2.5 gap-1' : 'top-3.5 left-3.5 gap-1.5'
        }`}
      >
        {product.isNew && (
          <span
            className={`uppercase tracking-widest font-semibold bg-champagne text-obsidian rounded-full shadow-sm ${
              compact ? 'px-2 py-0.5 text-[8.5px]' : 'px-2.5 py-0.5 text-[9px]'
            }`}
          >
            New
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span
            className={`uppercase tracking-widest font-medium bg-espresso-light/90 text-champagne border border-champagne/30 rounded-full backdrop-blur-sm ${
              compact ? 'px-2 py-0.5 text-[8.5px]' : 'px-2.5 py-0.5 text-[9px]'
            }`}
          >
            Bestseller
          </span>
        )}
      </div>

      {/* Wishlist Button with 3D Depth */}
      <button
        onClick={handleWishlist}
        aria-label="Add to wishlist"
        style={{ transform: tiltState.isHovered ? 'translateZ(28px)' : 'translateZ(0px)' }}
        className={`absolute z-20 rounded-full bg-obsidian/75 hover:bg-obsidian border border-champagne/20 hover:border-champagne/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-ivory backdrop-blur-md shadow-sm ${
          compact ? 'top-2.5 right-2.5 w-7.5 h-7.5' : 'top-3.5 right-3.5 w-9 h-9'
        }`}
      >
        <Heart
          className={`transition-colors duration-300 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${
            wishlisted ? 'fill-champagne text-champagne' : 'text-ivory/70 hover:text-champagne'
          }`}
        />
      </button>

      {/* Product Image Viewport Container with 3D Image Depth & Parallax */}
      <div
        style={{ transform: tiltState.isHovered ? 'translateZ(18px)' : 'translateZ(0px)' }}
        className={`relative z-10 w-full flex items-center justify-center overflow-hidden bg-gradient-radial from-espresso/30 via-obsidian-card to-obsidian transition-transform duration-300 ${
          compact
            ? 'aspect-[1.12/1] sm:aspect-[1.15/1] max-h-[175px] sm:max-h-[190px]'
            : 'aspect-square'
        }`}
      >
        {/* Soft atmospheric ambient glow */}
        <div className="absolute inset-0 bg-radial-gradient from-champagne/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

        {/* Primary Jewellery Image with Depth */}
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
          className={`product-card-image w-full h-full transition-transform duration-500 ease-out will-change-transform ${
            product.primaryImage?.endsWith('.svg')
              ? 'object-contain p-6 relative z-[1] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] group-hover:scale-[1.05]'
              : compact
              ? 'object-cover object-[center_16%] scale-[0.93] group-hover:scale-[0.98]'
              : `${product.imagePosition || 'object-cover object-center'} group-hover:scale-[1.05]`
          }`}
        />

        {/* Quick View Button (Desktop overlay with 3D elevation) */}
        <div
          style={{ transform: tiltState.isHovered ? 'translateZ(30px)' : 'translateZ(0px)' }}
          className="absolute inset-x-3 bottom-3 z-20 hidden md:flex opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="btn-3d w-full py-1.5 sm:py-2 px-3 rounded-lg bg-obsidian-surface/90 hover:bg-champagne hover:text-obsidian border border-champagne/30 text-ivory text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 transition-all duration-300 shadow-luxury"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information with 3D Depth */}
      <div
        style={{ transform: tiltState.isHovered ? 'translateZ(14px)' : 'translateZ(0px)' }}
        className={`relative z-10 flex flex-col flex-grow justify-between border-t border-champagne/10 bg-obsidian-light/30 transition-transform duration-300 ${
          compact ? 'p-2.5 sm:p-3 pt-2 sm:pt-2.5 pb-2.5' : 'p-3 sm:p-3.5 lg:p-3 xl:p-3.5'
        }`}
      >
        <div>
          {/* Category & Collection */}
          <div
            className={`flex items-center justify-between tracking-widest uppercase text-taupe-light font-medium ${
              compact ? 'text-[9px] mb-0.5' : 'text-[10px] mb-1'
            }`}
          >
            <span>{product.collection || 'ATELIER'}</span>
            <span>{product.metal?.split(' ')[0] || ''}</span>
          </div>

          {/* Product Name */}
          <h3
            className={`font-serif-luxury text-ivory line-clamp-1 group-hover:text-champagne transition-colors duration-300 ${
              compact ? 'text-[12px] sm:text-[13px]' : 'text-[13px] sm:text-sm lg:text-[13px] xl:text-sm'
            }`}
          >
            {product.name}
          </h3>

          {/* Stone detail */}
          <p
            className={`text-ivory-muted/70 line-clamp-1 font-sans ${
              compact ? 'text-[9.5px] mt-0.5' : 'text-[10px] sm:text-[11px] mt-0.5'
            }`}
          >
            {product.stone?.split('(')[0]}
          </p>
        </div>

        {/* Price & Action with 3D Push */}
        <div
          className={`border-t border-champagne/10 flex items-center justify-between ${
            compact ? 'mt-1.5 pt-1.5' : 'mt-2.5 pt-2'
          }`}
        >
          <div className="flex flex-col">
            <span
              className={`font-semibold text-champagne tracking-tight ${
                compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
              }`}
            >
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className={`text-ivory-muted/50 line-through ${
                  compact ? 'text-[9.5px] sm:text-[10px]' : 'text-[10px] sm:text-[11px]'
                }`}
              >
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label="Add to Bag"
            style={{ transform: tiltState.isHovered ? 'translateZ(24px)' : 'translateZ(0px)' }}
            className={`btn-3d rounded-full flex items-center justify-center transition-all duration-300 ${
              compact ? 'w-6.5 h-6.5 sm:w-7 sm:h-7' : 'w-7.5 h-7.5 sm:w-8 sm:h-8'
            } ${
              isAdded
                ? 'bg-champagne text-obsidian scale-105 shadow-glow'
                : 'bg-champagne/10 hover:bg-champagne text-champagne hover:text-obsidian border border-champagne/30'
            }`}
          >
            {isAdded ? <Check className="w-3 h-3 stroke-[2.5]" /> : <Plus className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
