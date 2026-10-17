import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../data/products';
import { X, Heart, Star, ShieldCheck, Truck, RotateCcw, Check, Sparkles, Ruler } from 'lucide-react';
import DeliveryChecker from './DeliveryChecker';

export default function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsCartOpen
  } = useShop();

  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState('specs');
  const [isZoomed, setIsZoomed] = useState(false);

  if (!selectedProduct) return null;

  const wishlisted = isInWishlist(selectedProduct.id);
  const sizes = selectedProduct.sizes || ['Standard'];
  const currentSize = selectedSize || sizes[0];

  // Gallery images array
  const gallery = [
    { type: 'isolated', src: selectedProduct.primaryImage, title: 'Isolated Masterpiece' },
    { type: 'lifestyle', src: selectedProduct.lifestyleImage, title: 'Editorial & Wear' },
  ];

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeResult('Insured Express Delivery available in 2–4 business days.');
    } else {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, currentSize, 1);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-obsidian-surface border border-champagne/25 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-obsidian/80 hover:bg-obsidian border border-champagne/30 text-ivory hover:text-champagne flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Left: Gallery (5 cols) */}
          <div className="lg:col-span-6 bg-gradient-radial from-espresso/40 via-obsidian-card to-obsidian p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-champagne/15">
            {/* Main Stage */}
            <div
              className="relative w-full aspect-square flex items-center justify-center cursor-zoom-in overflow-hidden rounded-xl border border-champagne/10 bg-obsidian-card/40"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {(gallery[activeImageIdx]?.src || selectedProduct.primaryImage)?.endsWith('.svg') && (
                <div className="absolute bottom-6 w-3/4 h-5 bg-black/50 blur-md rounded-full pointer-events-none" />
              )}
              <img
                src={gallery[activeImageIdx]?.src || selectedProduct.primaryImage}
                alt={selectedProduct.name}
                decoding="async"
                onError={(e) => {
                  if (e.currentTarget.src !== selectedProduct.primaryImage) {
                    e.currentTarget.src = selectedProduct.primaryImage;
                  }
                }}
                className={`w-full h-full object-contain transition-transform duration-500 ${
                  (gallery[activeImageIdx]?.src || selectedProduct.primaryImage)?.endsWith('.svg')
                    ? 'filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] p-6'
                    : ''
                } ${
                  isZoomed ? 'scale-150' : 'scale-100 hover:scale-105'
                }`}
              />
              <span className="absolute bottom-3 right-3 text-[10px] text-ivory-muted/60 uppercase tracking-widest bg-obsidian/70 px-2 py-1 rounded backdrop-blur-sm">
                {isZoomed ? 'Click to minimize' : 'Click to zoom'}
              </span>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                    activeImageIdx === idx
                      ? 'border-champagne bg-champagne/15 scale-105'
                      : 'border-champagne/20 bg-obsidian-card/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Trust highlights below image */}
            <div className="mt-6 pt-4 border-t border-champagne/15 grid grid-cols-2 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs text-ivory-soft">
                <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
                <span>100% Certified Gold &amp; Diamond</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ivory-soft">
                <Truck className="w-4 h-4 text-champagne shrink-0" />
                <span>Free Insured Transit across India</span>
              </div>
            </div>
          </div>

          {/* Right: Product Info & Actions (7 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Header details */}
              <div className="flex items-center justify-between text-xs tracking-widest uppercase text-champagne mb-2">
                <span>{selectedProduct.collection} COLLECTION</span>
                <span className="text-ivory-muted font-mono">{selectedProduct.sku}</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-ivory font-normal mb-2">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-champagne">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-champagne stroke-champagne" />
                  ))}
                </div>
                <span className="text-xs text-ivory-soft font-medium">
                  {selectedProduct.rating} ({selectedProduct.reviewsCount} Atelier Reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-champagne/15">
                <span className="text-2xl sm:text-3xl font-semibold text-champagne">
                  {formatINR(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-ivory-muted line-through">
                    {formatINR(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] text-champagne/80 uppercase tracking-widest font-sans">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ivory-muted/90 font-light leading-relaxed my-4">
                {selectedProduct.description}
              </p>

              {/* Size Selector */}
              {selectedProduct.sizes && (
                <div className="my-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase tracking-widest font-semibold text-champagne">
                      Select Size
                    </span>
                    <span className="text-ivory-muted flex items-center gap-1 text-[11px]">
                      <Ruler className="w-3 h-3" /> Standard Indian Sizing
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-10 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                          currentSize === sz
                            ? 'bg-champagne text-obsidian shadow-glow'
                            : 'bg-obsidian-surface text-ivory border border-champagne/25 hover:border-champagne'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Availability Estimator */}
              <div className="my-5">
                <DeliveryChecker compact />
              </div>

              {/* Accordions */}
              <div className="border-t border-champagne/15 pt-4 space-y-2 text-xs">
                <div className="border border-champagne/10 rounded-lg p-3 bg-obsidian-card/40">
                  <div className="font-semibold text-champagne mb-1">Precious Specifications:</div>
                  <ul className="text-ivory-muted space-y-1 font-sans">
                    <li>• Metal: {selectedProduct.metal} ({selectedProduct.purity})</li>
                    <li>• Gemstone: {selectedProduct.stone}</li>
                    <li>• Gross Weight: {selectedProduct.weight}</li>
                    <li>• Certification: 100% BIS Hallmarked / Lab Certified</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-champagne/15 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(selectedProduct, currentSize, 1)}
                className="flex-1 py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-glow"
              >
                ADD TO BAG
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 rounded-full bg-obsidian-card hover:bg-obsidian-surface border border-champagne/40 text-ivory hover:text-champagne text-xs tracking-[0.2em] uppercase font-semibold transition-all"
              >
                BUY NOW
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                aria-label="Wishlist"
                className="w-12 h-12 rounded-full border border-champagne/30 flex items-center justify-center text-ivory hover:text-champagne hover:border-champagne transition-all shrink-0 self-center sm:self-auto"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? 'fill-champagne text-champagne' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
