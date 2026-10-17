import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, formatINR } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, Heart, Sparkles } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    moveWishlistToBag,
    navigateToCatalogue,
    setSelectedProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 max-w-md w-full bg-obsidian-surface border-l border-champagne/25 shadow-2xl flex flex-col justify-between animate-fade-in z-10"
        style={{
          transform: 'perspective(1200px)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-champagne/15 flex items-center justify-between bg-obsidian-surface/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-xl text-ivory tracking-wider font-normal">
              SAVED PIECES
            </span>
            <span className="text-xs text-champagne font-mono font-bold">
              ({wishlist.length})
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="p-1.5 text-ivory-muted hover:text-champagne transition-colors rounded-full hover:bg-champagne/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne mx-auto mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <p className="font-serif-luxury text-lg text-ivory mb-1">Your Wishlist is Empty</p>
              <p className="text-ivory-muted text-xs mb-6 max-w-xs mx-auto">
                Explore our fine jewellery pieces and save your favorite creations to view or acquire later.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigateToCatalogue();
                }}
                className="px-8 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs uppercase tracking-widest font-semibold transition-all shadow-glow"
              >
                DISCOVER CATALOGUE
              </button>
            </div>
          ) : (
            wishlistedProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex gap-4 p-3.5 rounded-xl bg-obsidian-card/70 border border-champagne/15 hover:border-champagne/35 transition-all group"
              >
                {/* Image */}
                <div
                  onClick={() => {
                    setSelectedProduct(prod);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-20 rounded-lg bg-obsidian-card overflow-hidden flex items-center justify-center shrink-0 border border-champagne/15 cursor-pointer"
                >
                  <img
                    src={prod.primaryImage}
                    alt={prod.name}
                    className={`w-full h-full ${
                      prod.primaryImage?.endsWith('.svg')
                        ? 'object-contain p-2 filter drop-shadow-md'
                        : 'object-cover object-center'
                    }`}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          setSelectedProduct(prod);
                          setIsWishlistOpen(false);
                        }}
                        className="font-serif-luxury text-sm text-ivory font-normal truncate cursor-pointer hover:text-champagne transition-colors"
                      >
                        {prod.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="text-ivory-muted/60 hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-ivory-muted mt-0.5">
                      {prod.metal.split(' ')[0]} • {prod.collection} Collection
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-semibold text-champagne">
                      {formatINR(prod.price)}
                    </span>
                    <button
                      onClick={() => moveWishlistToBag(prod)}
                      className="btn-3d-secondary px-3.5 py-1.5 rounded-lg bg-champagne/15 hover:bg-champagne text-champagne hover:text-obsidian text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-champagne/30 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move To Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-champagne/15 bg-obsidian-card/90">
            <button
              onClick={() => {
                setIsWishlistOpen(false);
                navigateToCatalogue();
              }}
              className="btn-3d-secondary w-full py-3.5 rounded-full border border-champagne/30 text-ivory hover:text-champagne hover:border-champagne text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE MORE JEWELLERY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
