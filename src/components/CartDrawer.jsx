import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Check, Sparkles, ShieldCheck } from 'lucide-react';
import DeliveryChecker from './DeliveryChecker';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQty,
    cartSubtotal,
    cartCount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    discountedSubtotal,
    gstAmount,
    deliveryCharge,
    finalPayableTotal,
    navigateToCheckout,
    navigateToCatalogue
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [isPromoError, setIsPromoError] = useState(false);
  const [showDeliveryCheck, setShowDeliveryCheck] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage(res.message);
      setIsPromoError(false);
      setPromoInput('');
    } else {
      setPromoMessage(res.message);
      setIsPromoError(true);
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoMessage(null);
    setIsPromoError(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
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
              YOUR SHOPPING BAG
            </span>
            <span className="text-xs text-champagne font-mono font-bold">
              ({cartCount})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            className="p-1.5 text-ivory-muted hover:text-champagne transition-colors rounded-full hover:bg-champagne/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping / Value Banner */}
        <div className="bg-espresso-dark px-6 py-2.5 border-b border-champagne/10 flex items-center justify-between text-[11px] text-ivory-soft">
          <span className="flex items-center gap-1.5 text-champagne font-medium">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            100% Certified Heirloom Fine Jewellery
          </span>
          <span className="text-ivory-muted text-[10px] uppercase tracking-wider">
            Insured Transit
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne mx-auto mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <p className="font-serif-luxury text-lg text-ivory mb-1">Your Shopping Bag is Empty</p>
              <p className="text-ivory-muted text-xs mb-6 max-w-xs mx-auto">
                Discover master-crafted solitaires, diamond tennis necklaces, and signature 18K gold pieces.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateToCatalogue();
                }}
                className="px-8 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs uppercase tracking-widest font-semibold transition-all shadow-glow"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <>
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 p-3.5 rounded-xl bg-obsidian-card/70 border border-champagne/15 hover:border-champagne/30 transition-all shadow-sm group"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-lg bg-obsidian-card overflow-hidden flex items-center justify-center shrink-0 border border-champagne/15">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className={`w-full h-full ${
                        item.product.primaryImage?.endsWith('.svg')
                          ? 'object-contain p-2 filter drop-shadow-md'
                          : 'object-cover object-center'
                      }`}
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-sm text-ivory font-normal truncate group-hover:text-champagne transition-colors">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-ivory-muted/60 hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-ivory-muted mt-0.5">
                        Size: {item.selectedSize} • {item.product.metal ? item.product.metal.split(' ')[0] : '18K Gold'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-champagne/25 rounded-md bg-obsidian">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.selectedSize, -1)}
                          className="p-1 text-ivory-muted hover:text-champagne transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-ivory">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.selectedSize, 1)}
                          className="p-1 text-ivory-muted hover:text-champagne transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <div className="text-sm font-semibold text-champagne">
                        {formatINR(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Availability Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setShowDeliveryCheck(!showDeliveryCheck)}
                  className="w-full text-left text-xs text-champagne hover:text-champagne-light flex items-center justify-between p-2.5 rounded-lg bg-obsidian-card/40 border border-champagne/15"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Check Delivery to Your Location
                  </span>
                  <span className="text-[10px] uppercase tracking-wider">{showDeliveryCheck ? 'Hide' : 'Check'}</span>
                </button>
                {showDeliveryCheck && (
                  <div className="mt-2 animate-fade-in">
                    <DeliveryChecker compact />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary with Dynamic Calculations */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-champagne/15 bg-obsidian-card/90 space-y-3.5">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-champagne/70" />
                <input
                  type="text"
                  placeholder="Promo Code (Try FOREVER10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-obsidian text-ivory text-xs border border-champagne/20 focus:outline-none uppercase font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-champagne/15 hover:bg-champagne text-champagne hover:text-obsidian text-xs font-semibold uppercase tracking-wider transition-colors border border-champagne/30"
              >
                Apply
              </button>
            </form>

            {/* Promo Feedback */}
            {appliedPromo && (
              <div className="flex items-center justify-between text-[11px] text-champagne bg-champagne/10 p-2 rounded-lg border border-champagne/25">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5" /> Code {appliedPromo} applied (-10%)
                </span>
                <button
                  onClick={handleRemovePromo}
                  className="text-ivory-muted hover:text-red-400 text-[10px] underline ml-2"
                >
                  Remove
                </button>
              </div>
            )}
            {promoMessage && !appliedPromo && (
              <p className={`text-[11px] ${isPromoError ? 'text-red-400' : 'text-champagne'}`}>
                {promoMessage}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-ivory-soft pt-1 border-t border-champagne/10 font-sans">
              <div className="flex justify-between">
                <span>Product Subtotal</span>
                <span className="font-semibold text-ivory">{formatINR(cartSubtotal)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-champagne">
                  <span>Privilege Discount (10%)</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-ivory-muted text-[11px]">
                  <span>Discounted Subtotal</span>
                  <span>{formatINR(discountedSubtotal)}</span>
                </div>
              )}

              <div className="flex justify-between text-ivory-muted">
                <span>Applicable GST (18%)</span>
                <span>{formatINR(gstAmount)}</span>
              </div>

              <div className="flex justify-between text-ivory-muted">
                <span>Insured Armored Delivery</span>
                <span>{formatINR(deliveryCharge)}</span>
              </div>

              <div className="flex justify-between text-base font-semibold text-ivory pt-2 border-t border-champagne/15">
                <span>Final Total</span>
                <span className="text-champagne font-serif-luxury text-xl">
                  {formatINR(finalPayableTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={navigateToCheckout}
                className="w-full py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-glow flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-xs uppercase tracking-widest text-ivory-muted hover:text-champagne transition-colors py-1"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
