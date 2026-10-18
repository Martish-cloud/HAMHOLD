import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../data/products';
import DeliveryChecker from './DeliveryChecker';
import {
  ShieldCheck,
  Check,
  CreditCard,
  Smartphone,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Tag,
  Building,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BackButton from './BackButton';

export default function CheckoutView() {
  const {
    cart,
    cartSubtotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    discountedSubtotal,
    gstAmount,
    deliveryCharge,
    finalPayableTotal,
    customer,
    signInCustomer,
    createOrder,
    navigateToCatalogue,
    navigateToTrackOrder,
    selectedDelivery
  } = useShop();

  // Steps: 'checkout' | 'confirmed'
  const [step, setStep] = useState('checkout');
  const [placedOrder, setPlacedOrder] = useState(null);

  // Form Fields
  const [fullName, setFullName] = useState(customer?.name || '');
  const [phone, setPhone] = useState(customer?.contact || '');
  const [email, setEmail] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState(selectedDelivery?.location?.split(',')[0] || '');
  const [state, setState] = useState(selectedDelivery?.location?.split(',')[1]?.trim() || '');
  const [pincode, setPincode] = useState(selectedDelivery?.pincode || '');
  const [landmark, setLandmark] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'EMI' | 'COD'
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('GPay');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedEmiTenure, setSelectedEmiTenure] = useState('6_months');

  // Verification if not logged in
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [formError, setFormError] = useState('');

  // Promo code in checkout
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage(res.message);
    if (res.success) setPromoInput('');
  };

  const handleLocationSelected = (loc) => {
    if (loc.location) {
      const parts = loc.location.split(',');
      setCity(parts[0].trim());
      if (parts[1]) setState(parts[1].trim());
    }
    if (loc.pincode) {
      setPincode(loc.pincode);
    }
  };

  const handleProceedToPlaceOrder = (e) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter your contact phone number.');
      return;
    }
    if (!addressLine.trim()) {
      setFormError('Please enter your delivery street address.');
      return;
    }
    if (!city.trim()) {
      setFormError('Please enter your city.');
      return;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      setFormError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    // If customer is not yet verified in session, trigger verification step
    if (!customer?.isLoggedIn) {
      setShowVerifyModal(true);
      return;
    }

    executeOrderCreation();
  };

  const executeOrderCreation = () => {
    const orderData = {
      customerDetails: {
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim()
      },
      deliveryAddress: {
        addressLine: addressLine.trim(),
        city: city.trim(),
        state: state.trim() || 'India',
        pincode: pincode.trim(),
        landmark: landmark.trim()
      },
      paymentMethod
    };

    const newOrder = createOrder(orderData);
    setPlacedOrder(newOrder);
    setStep('confirmed');

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D6C29A', '#A8875B', '#FFFFFF', '#E5D6B6']
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirmVerification = (e) => {
    e.preventDefault();
    if (verificationCode.trim().length < 4) {
      setFormError('Please enter your 4 to 6-digit verification code.');
      return;
    }
    signInCustomer(fullName, phone, verificationCode);
    setShowVerifyModal(false);
    executeOrderCreation();
  };

  // If bag is empty and no placed order, show empty state
  if (cart.length === 0 && step !== 'confirmed') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md p-8 rounded-2xl bg-obsidian-surface border border-champagne/25 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-serif-luxury text-2xl text-ivory mb-2">No Items in Checkout</h2>
          <p className="text-ivory-muted text-xs leading-relaxed mb-6">
            Your shopping bag is currently empty. Explore our fine jewellery collections to select pieces for bespoke creation.
          </p>
          <button
            onClick={() => navigateToCatalogue()}
            className="px-8 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-widest uppercase font-semibold transition-all shadow-glow"
          >
            DISCOVER CATALOGUE
          </button>
        </div>
      </div>
    );
  }

  // Confirmation View
  if (step === 'confirmed' && placedOrder) {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
        <div
          className="p-6 sm:p-10 rounded-2xl bg-obsidian-surface border border-champagne/30 shadow-2xl space-y-8 relative overflow-hidden"
          style={{
            transform: 'perspective(1200px)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Header */}
          <div className="text-center space-y-3 pb-8 border-b border-champagne/15">
            <div className="w-16 h-16 rounded-full bg-champagne/20 border-2 border-champagne mx-auto flex items-center justify-center text-champagne shadow-glow">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-champagne font-semibold block">
              HAMHOLD Midnight Atelier Requisition
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal">
              Your Order Has Been Placed Successfully
            </h1>
            <p className="text-xs text-ivory-muted max-w-lg mx-auto font-light leading-relaxed">
              Thank you for trusting HAMHOLD. Your bespoke order has been committed to our atelier masters. Tamper-evident vault packaging and insured transit are now being allocated.
            </p>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-obsidian-card/70 border border-champagne/15 text-xs">
            <div>
              <span className="text-ivory-muted uppercase tracking-wider text-[10px] block mb-1">
                Order Number
              </span>
              <span className="font-mono font-bold text-champagne text-sm">
                {placedOrder.orderId}
              </span>
            </div>
            <div>
              <span className="text-ivory-muted uppercase tracking-wider text-[10px] block mb-1">
                Total Amount
              </span>
              <span className="font-semibold text-ivory text-sm">
                {formatINR(placedOrder.totalAmount)}
              </span>
            </div>
            <div>
              <span className="text-ivory-muted uppercase tracking-wider text-[10px] block mb-1">
                Payment Method
              </span>
              <span className="font-medium text-ivory">
                {placedOrder.paymentMethod}
              </span>
            </div>
            <div>
              <span className="text-ivory-muted uppercase tracking-wider text-[10px] block mb-1">
                Payment Status
              </span>
              <span className="text-champagne font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-champagne" />
                {placedOrder.paymentStatus}
              </span>
            </div>
          </div>

          {/* Ordered Pieces Summary */}
          <div className="space-y-3">
            <h3 className="font-serif-luxury text-lg text-ivory">Bespoke Pieces Ordered</h3>
            <div className="space-y-2.5">
              {placedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-obsidian border border-champagne/10 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover border border-champagne/15 bg-obsidian-card"
                    />
                    <div>
                      <h5 className="font-serif-luxury text-sm text-ivory font-normal">{item.name}</h5>
                      <span className="text-ivory-muted text-[11px]">Size: {item.selectedSize} • Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="font-semibold text-champagne font-mono">
                    {formatINR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Address Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-obsidian-card/40 border border-champagne/15 text-xs">
            <div>
              <span className="text-ivory-muted uppercase tracking-wider text-[10px] block mb-1 font-semibold text-champagne">
                Delivery Address
              </span>
              <div className="text-ivory font-medium">{placedOrder.customer.name}</div>
              <div className="text-ivory-soft/90 font-light mt-0.5">{placedOrder.deliveryAddress.addressLine}</div>
              <div className="text-ivory-soft/90 font-light">
                {placedOrder.deliveryAddress.city}, {placedOrder.deliveryAddress.state} — {placedOrder.deliveryAddress.pincode}
              </div>
              <div className="text-ivory-muted font-mono mt-1">Phone: {placedOrder.customer.phone}</div>
            </div>

            <div>
              <span className="text-ivory-muted uppercase tracking-wider text-[10px] block mb-1 font-semibold text-champagne">
                Estimated Delivery Window
              </span>
              <div className="text-ivory font-medium">3–7 Business Days</div>
              <p className="text-ivory-muted text-[11px] font-light mt-1">
                Handled by specialized armored logistics with continuous tracking and door-step verification.
              </p>
            </div>
          </div>

          {/* Financial Breakdown Summary */}
          <div className="space-y-1.5 text-xs text-ivory-muted border-t border-champagne/15 pt-4 max-w-sm ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-ivory font-medium">{formatINR(placedOrder.subtotal)}</span>
            </div>
            {placedOrder.discount > 0 && (
              <div className="flex justify-between text-champagne">
                <span>Discount ({placedOrder.promoCode}):</span>
                <span>-{formatINR(placedOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span className="text-ivory font-medium">{formatINR(placedOrder.gst)}</span>
            </div>
            <div className="flex justify-between">
              <span>Insured Armored Delivery:</span>
              <span className="text-ivory font-medium">{formatINR(placedOrder.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-ivory pt-2 border-t border-champagne/15">
              <span>Total Paid:</span>
              <span className="text-champagne font-serif-luxury text-lg">{formatINR(placedOrder.totalAmount)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-champagne/15">
            <button
              onClick={() => navigateToTrackOrder(placedOrder.orderId)}
              className="flex-1 py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-widest uppercase font-semibold transition-all shadow-glow flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Order Live</span>
            </button>

            <button
              onClick={() => navigateToCatalogue()}
              className="flex-1 py-4 rounded-full bg-obsidian-surface hover:bg-obsidian border border-champagne/30 text-ivory hover:text-champagne text-xs tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Checkout Form View
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <BackButton fallbackView="catalogue" className="mb-4" />
        <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium block mb-2">
          Secure Luxury Checkout
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal">
          CONFIRM YOUR HEIRLOOM ACQUISITION
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form Details & Payment Selection (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Customer Details */}
          <div className="p-6 rounded-2xl bg-obsidian-surface border border-champagne/20 shadow-luxury space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-champagne/15">
              <span className="font-serif-luxury text-lg text-ivory font-medium flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-champagne/15 text-champagne text-xs font-mono flex items-center justify-center">1</span>
                Customer &amp; Delivery Details
              </span>
              {customer?.isLoggedIn && (
                <span className="text-[11px] text-champagne flex items-center gap-1 font-sans">
                  <Check className="w-3.5 h-3.5" /> Verified Account: {customer.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  Full Name <span className="text-champagne">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Kapoor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  Mobile Number (+91) <span className="text-champagne">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  Email Address (For Certificate &amp; Invoice)
                </label>
                <input
                  type="email"
                  placeholder="concierge@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  Street Address &amp; Suite / Flat <span className="text-champagne">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 14B, Royal Horizon Towers, Bandra West"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  City <span className="text-champagne">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>

              <div>
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  PIN Code <span className="text-champagne">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 400050"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne font-mono"
                />
              </div>

              <div>
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1 font-medium">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near St. Andrews"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>
            </div>

            {/* Delivery Availability Assistant in Checkout */}
            <div className="pt-3 border-t border-champagne/10">
              <DeliveryChecker compact onSelectLocation={handleLocationSelected} />
            </div>
          </div>

          {/* 2. Payment Selection */}
          <div className="p-6 rounded-2xl bg-obsidian-surface border border-champagne/20 shadow-luxury space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-champagne/15">
              <span className="font-serif-luxury text-lg text-ivory font-medium flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-champagne/15 text-champagne text-xs font-mono flex items-center justify-center">2</span>
                Payment Method Selection
              </span>
              <span className="text-[11px] text-ivory-muted flex items-center gap-1 font-sans">
                <Lock className="w-3.5 h-3.5 text-champagne" /> 256-Bit SSL Encrypted
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Option 1: Instant UPI */}
              <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'UPI'
                  ? 'bg-obsidian-card border-champagne shadow-glow'
                  : 'bg-obsidian border-champagne/15 hover:border-champagne/30'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="checkout_payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="text-champagne"
                    />
                    <span className="font-semibold text-ivory flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-champagne" />
                      Instant UPI (Google Pay / PhonePe / Paytm / BHIM)
                    </span>
                  </div>
                  <span className="text-[10px] text-champagne font-mono font-medium">Fastest</span>
                </div>
                {paymentMethod === 'UPI' && (
                  <div className="mt-3 pt-3 border-t border-champagne/10 space-y-2.5 animate-fade-in pl-7">
                    <div className="flex flex-wrap gap-2">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setSelectedUpiApp(app)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedUpiApp === app
                              ? 'bg-champagne text-obsidian font-bold shadow-sm'
                              : 'bg-obsidian-surface text-ivory-muted border border-champagne/20'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Or enter UPI ID (e.g. mobile@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none font-mono text-xs"
                    />
                  </div>
                )}
              </label>

              {/* Option 2: Credit / Debit Card */}
              <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'CARD'
                  ? 'bg-obsidian-card border-champagne shadow-glow'
                  : 'bg-obsidian border-champagne/15 hover:border-champagne/30'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="checkout_payment"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                      className="text-champagne"
                    />
                    <span className="font-semibold text-ivory flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-champagne" />
                      Luxury Credit / Debit Card (Visa, Mastercard, Amex, RuPay)
                    </span>
                  </div>
                </div>
                {paymentMethod === 'CARD' && (
                  <div className="mt-3 pt-3 border-t border-champagne/10 space-y-2.5 animate-fade-in pl-7">
                    <div>
                      <input
                        type="text"
                        placeholder="Card Number (e.g. 4532 •••• •••• 8892)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none font-mono text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none font-mono text-xs"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none font-mono text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on Card"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none text-xs"
                    />
                  </div>
                )}
              </label>

              {/* Option 3: No-Cost EMI */}
              <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'EMI'
                  ? 'bg-obsidian-card border-champagne shadow-glow'
                  : 'bg-obsidian border-champagne/15 hover:border-champagne/30'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="checkout_payment"
                      checked={paymentMethod === 'EMI'}
                      onChange={() => setPaymentMethod('EMI')}
                      className="text-champagne"
                    />
                    <span className="font-semibold text-ivory flex items-center gap-2">
                      <Building className="w-4 h-4 text-champagne" />
                      No-Cost EMI (0% Interest)
                    </span>
                  </div>
                  <span className="text-[10px] text-champagne">Up to 12 Months</span>
                </div>
                {paymentMethod === 'EMI' && (
                  <div className="mt-3 pt-3 border-t border-champagne/10 space-y-2 animate-fade-in pl-7">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { tenure: '3_months', label: '3 Months', amount: Math.round(finalPayableTotal / 3) },
                        { tenure: '6_months', label: '6 Months', amount: Math.round(finalPayableTotal / 6) },
                        { tenure: '12_months', label: '12 Months', amount: Math.round(finalPayableTotal / 12) }
                      ].map(emi => (
                        <button
                          key={emi.tenure}
                          type="button"
                          onClick={() => setSelectedEmiTenure(emi.tenure)}
                          className={`p-2 rounded-lg text-left transition-all ${
                            selectedEmiTenure === emi.tenure
                              ? 'bg-champagne text-obsidian border border-champagne'
                              : 'bg-obsidian text-ivory border border-champagne/20'
                          }`}
                        >
                          <div className="font-bold text-[11px]">{emi.label}</div>
                          <div className="text-[10px] font-mono">{formatINR(emi.amount)}/mo</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </label>

              {/* Option 4: Cash on Delivery */}
              <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'COD'
                  ? 'bg-obsidian-card border-champagne shadow-glow'
                  : 'bg-obsidian border-champagne/15 hover:border-champagne/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="checkout_payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="text-champagne"
                    />
                    <div>
                      <span className="font-semibold text-ivory flex items-center gap-2">
                        <Truck className="w-4 h-4 text-champagne" />
                        Cash on Delivery (Payment Due on Delivery)
                      </span>
                      <p className="text-[11px] text-ivory-muted/70 font-light mt-0.5">
                        Pay via Cash or UPI at your doorstep upon verification of tamper-proof packaging.
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {formError && (
            <p className="p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 text-xs">
              {formError}
            </p>
          )}

          {/* Place Order CTA with 3D Micro-interactions */}
          <button
            type="button"
            onClick={handleProceedToPlaceOrder}
            className="btn-3d w-full py-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-[0.22em] uppercase font-semibold transition-all duration-300 shadow-glow flex items-center justify-center gap-3"
          >
            <span>CONFIRM &amp; PLACE ORDER — {formatINR(finalPayableTotal)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: Order Summary & Item Snapshot (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className="card-hover-lift-fill preserve-3d p-6 rounded-2xl bg-obsidian-surface border border-champagne/20 shadow-luxury space-y-4 sticky top-24"
            style={{
              transform: 'perspective(1000px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-champagne/15">
              <span className="font-serif-luxury text-lg text-ivory font-medium">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
              <span className="text-[10px] uppercase tracking-wider text-champagne">Insured Transit</span>
            </div>

            {/* Line items list */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg bg-obsidian-card object-cover border border-champagne/15 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif-luxury text-sm text-ivory font-normal truncate">{item.product.name}</h5>
                    <div className="text-[11px] text-ivory-muted">Size: {item.selectedSize} • Qty: {item.quantity}</div>
                    <div className="text-champagne font-semibold font-mono mt-0.5">
                      {formatINR(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code input in summary */}
            <form onSubmit={handleApplyPromo} className="pt-3 border-t border-champagne/10 flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-champagne/70" />
                <input
                  type="text"
                  placeholder="Promo Code (FOREVER10)"
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

            {appliedPromo && (
              <div className="flex items-center justify-between text-[11px] text-champagne bg-champagne/10 p-2 rounded-lg border border-champagne/25">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5" /> Privilege Code {appliedPromo} applied (-10%)
                </span>
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="text-ivory-muted hover:text-red-400 text-[10px] underline"
                >
                  Remove
                </button>
              </div>
            )}
            {promoMessage && !appliedPromo && (
              <p className="text-[11px] text-champagne">{promoMessage}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-ivory-soft pt-3 border-t border-champagne/15 font-sans">
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
                <span>GST (18%)</span>
                <span>{formatINR(gstAmount)}</span>
              </div>

              <div className="flex justify-between text-ivory-muted">
                <span>Insured Armored Delivery</span>
                <span>{formatINR(deliveryCharge)}</span>
              </div>

              <div className="flex justify-between text-base font-semibold text-ivory pt-3 border-t border-champagne/15">
                <span>Payable Total</span>
                <span className="text-champagne font-serif-luxury text-xl">
                  {formatINR(finalPayableTotal)}
                </span>
              </div>
            </div>

            {/* Security Guarantee Pill */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-champagne/80 uppercase tracking-widest text-center">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>Includes 100% BIS Hallmark Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal for New / Guest Checkouts */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-obsidian-surface border border-champagne/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="text-center pb-4 border-b border-champagne/15">
              <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne mx-auto mb-2 shadow-glow">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-ivory">Verify Your Account</h3>
              <p className="text-xs text-ivory-muted font-light mt-1">
                Enter your 4 to 6-digit client verification code to confirm reservation for {phone}.
              </p>
            </div>

            <form onSubmit={handleConfirmVerification} className="space-y-4">
              <div>
                <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1.5 font-medium text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  autoFocus
                  maxLength={6}
                  placeholder="e.g. 1234"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-[0.4em] text-lg font-mono py-3 rounded-lg bg-obsidian text-champagne border border-champagne/30 focus:outline-none"
                />
              </div>

              {formError && (
                <p className="text-[11px] text-red-400 text-center">{formError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  className="flex-1 py-3 rounded-full bg-obsidian border border-champagne/25 text-ivory-muted text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-wider uppercase font-semibold shadow-glow"
                >
                  Verify &amp; Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
