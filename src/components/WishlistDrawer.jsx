import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, formatINR } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    navigateToCatalogue,
    setSelectedProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (prod) => {
    addToCart(prod);
    toggleWishlist(prod.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-obsidian-surface border-l border-champagne/20 shadow-2xl flex flex-col justify-between animate-fade-in z-10">
        {/* Header */}
        <div className="p-6 border-b border-champagne/15 flex items-center justify-between">
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
            className="p-1 text-ivory hover:text-champagne transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ivory-muted text-sm mb-6">No pieces saved to your wishlist yet.</p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigateToCatalogue();
                }}
                className="px-6 py-3 rounded-full bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold"
              >
                DISCOVER CATALOGUE
              </button>
            </div>
          ) : (
            wishlistedProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex gap-4 p-3.5 rounded-xl bg-obsidian-card/60 border border-champagne/15 hover:border-champagne/30 transition-all"
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
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4
                        onClick={() => {
                          setSelectedProduct(prod);
                          setIsWishlistOpen(false);
                        }}
                        className="font-serif-luxury text-sm text-ivory font-normal line-clamp-1 cursor-pointer hover:text-champagne"
                      >
                        {prod.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="text-ivory-muted/60 hover:text-red-400 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-[11px] text-ivory-muted mt-0.5">
                      {prod.metal.split(' ')[0]} • {prod.collection}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-semibold text-champagne">
                      {formatINR(prod.price)}
                    </span>
                    <button
                      onClick={() => handleMoveToCart(prod)}
                      className="px-3 py-1.5 rounded-lg bg-champagne/15 hover:bg-champagne text-champagne hover:text-obsidian text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-champagne/30"
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
          <div className="p-6 border-t border-champagne/15 bg-obsidian-card/80">
            <button
              onClick={() => {
                setIsWishlistOpen(false);
                navigateToCatalogue();
              }}
              className="w-full py-3 rounded-full border border-champagne/30 text-ivory hover:text-champagne hover:border-champagne text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2"
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
