import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQty,
    clearCart,
    cartSubtotal,
    cartCount
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Free shipping threshold ₹25,000
  const freeShippingThreshold = 25000;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Discount calculation
  const discountAmount = appliedPromo ? Math.round(cartSubtotal * 0.1) : 0;
  const finalTotal = cartSubtotal - discountAmount;

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FOREVER10') {
      setAppliedPromo('FOREVER10');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try FOREVER10 for 10% demo discount.');
    }
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D6C29A', '#A8875B', '#FFFFFF', '#1A1412']
    });
    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckingOut(false);
          setOrderComplete(false);
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-obsidian-surface border-l border-champagne/20 shadow-2xl flex flex-col justify-between animate-fade-in z-10">
        {/* Header */}
        <div className="p-6 border-b border-champagne/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-xl text-ivory tracking-wider font-normal">
              YOUR SHOPPING BAG
            </span>
            <span className="text-xs text-champagne font-mono font-bold">
              ({cartCount})
            </span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckingOut(false);
            }}
            className="p-1 text-ivory hover:text-champagne transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Normal Cart View */}
        {!isCheckingOut ? (
          <>
            {/* Free shipping bar */}
            <div className="bg-espresso-dark px-6 py-3 border-b border-champagne/10">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                {amountNeeded === 0 ? (
                  <span className="text-champagne flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Complimentary Insured Shipping Unlocked!
                  </span>
                ) : (
                  <span className="text-ivory-soft">
                    Add <strong className="text-champagne">{formatINR(amountNeeded)}</strong> for Free Insured Shipping
                  </span>
                )}
                <span className="text-champagne">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-1.5 bg-obsidian-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-champagne transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-ivory-muted text-sm mb-6">Your shopping bag is currently empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 rounded-full bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${idx}`}
                    className="flex gap-4 p-3.5 rounded-xl bg-obsidian-card/60 border border-champagne/15"
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
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif-luxury text-sm text-ivory font-normal line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-ivory-muted/60 hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[11px] text-ivory-muted mt-0.5">
                          Size: {item.selectedSize} • {item.product.metal.split(' ')[0]}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-champagne/20 rounded-md bg-obsidian">
                          <button
                            onClick={() => updateCartQty(item.product.id, item.selectedSize, -1)}
                            className="p-1 text-ivory-muted hover:text-champagne"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-medium text-ivory">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.product.id, item.selectedSize, 1)}
                            className="p-1 text-ivory-muted hover:text-champagne"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-sm font-semibold text-champagne">
                          {formatINR(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-champagne/15 bg-obsidian-card/80 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-champagne/70" />
                    <input
                      type="text"
                      placeholder="Promo Code (Try FOREVER10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
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
                {appliedPromo && (
                  <p className="text-[11px] text-champagne flex items-center gap-1">
                    <Check className="w-3 h-3" /> 10% Atelier Demo Privilege Applied (-{formatINR(discountAmount)})
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400">{promoError}</p>
                )}

                {/* Totals */}
                <div className="space-y-1.5 text-xs text-ivory-soft pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ivory">{formatINR(cartSubtotal)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-champagne">
                      <span>Privilege Discount</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured Pan-India Shipping</span>
                    <span className="text-champagne font-medium">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-semibold text-ivory pt-2 border-t border-champagne/15">
                    <span>Total Amount</span>
                    <span className="text-champagne font-serif-luxury text-xl">
                      {formatINR(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-glow flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs uppercase tracking-widest text-ivory-muted hover:text-champagne transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </>
        ) : (
          /* Checkout Demo Flow */
          <div className="p-6 flex-1 overflow-y-auto">
            {orderComplete ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-champagne/20 border border-champagne mx-auto flex items-center justify-center text-champagne">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-ivory">
                  DEMO ORDER CONFIRMED
                </h3>
                <p className="text-xs text-ivory-muted max-w-xs mx-auto leading-relaxed">
                  Thank you for experiencing the HAMHOLD Atelier demo. Your mock reservation has been created with simulated insured shipping.
                </p>
                <div className="p-4 rounded-xl bg-obsidian border border-champagne/20 text-xs font-mono text-champagne">
                  Demo Ref: HM-ORDER-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckingOut(false);
                    setOrderComplete(false);
                  }}
                  className="px-8 py-3 rounded-full bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold mt-4"
                >
                  Close &amp; Return to Atelier
                </button>
              </div>
            ) : (
              <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-champagne/15">
                  <span className="uppercase tracking-widest text-champagne font-semibold">
                    Delivery &amp; Payment Demo
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-ivory-muted hover:text-champagne underline"
                  >
                    Back to Bag
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      defaultValue="Priya Sharma"
                      className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1">
                      Phone Number (+91)
                    </label>
                    <input
                      required
                      defaultValue="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1">
                      Shipping Address
                    </label>
                    <input
                      required
                      defaultValue="Flat 14B, Signature Towers, Bandra West"
                      className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1">
                        City &amp; State
                      </label>
                      <input
                        required
                        defaultValue="Mumbai, Maharashtra"
                        className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1">
                        Pincode
                      </label>
                      <input
                        required
                        defaultValue="400050"
                        className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-champagne/15">
                  <span className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-2 font-semibold text-champagne">
                    Select Simulated Payment Option
                  </span>
                  <div className="space-y-2">
                    {['UPI (GooglePay / PhonePe / Paytm)', 'Luxury Credit Card (No-Cost EMI)', 'Netbanking / HDFC / ICICI', 'Insured Pay on Verification'].map((opt, i) => (
                      <label key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-obsidian border border-champagne/15 cursor-pointer hover:border-champagne">
                        <input type="radio" name="payment" defaultChecked={i === 0} className="text-champagne" />
                        <span className="text-ivory font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-champagne/15">
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span>Payable Total:</span>
                    <span className="text-champagne">{formatINR(finalTotal)}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-widest uppercase font-semibold transition-all shadow-glow"
                  >
                    COMPLETE DEMO PURCHASE
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
