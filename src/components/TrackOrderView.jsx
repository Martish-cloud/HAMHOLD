import React, { useState, useEffect } from 'react';
import { useShop, TRACKING_STAGES } from '../context/ShopContext';
import { formatINR } from '../data/products';
import { Search, Package, Check, Clock, Truck, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export default function TrackOrderView() {
  const { orders, activeTrackingOrderId, setActiveTrackingOrderId, getOrderStatus, navigateToCatalogue } = useShop();

  const [searchId, setSearchId] = useState(activeTrackingOrderId || (orders[0]?.orderId || ''));
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setTick] = useState(0);

  // Sync with activeTrackingOrderId or latest order
  useEffect(() => {
    if (activeTrackingOrderId) {
      const match = orders.find(o => o.orderId.toLowerCase() === activeTrackingOrderId.toLowerCase());
      if (match) {
        setSearchedOrder(match);
        setSearchId(match.orderId);
        setErrorMessage('');
      }
    } else if (orders.length > 0 && !searchedOrder) {
      setSearchedOrder(orders[0]);
      setSearchId(orders[0].orderId);
    }
  }, [activeTrackingOrderId, orders]);

  // Tick every second to smoothly update real-time progress
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const clean = searchId.trim().toUpperCase();
    if (!clean) {
      setErrorMessage('Please enter an order number.');
      setSearchedOrder(null);
      return;
    }

    const found = orders.find(o => o.orderId.toUpperCase() === clean);
    if (found) {
      setSearchedOrder(found);
      setActiveTrackingOrderId(found.orderId);
      setErrorMessage('');
    } else {
      setSearchedOrder(null);
      setErrorMessage("We couldn't find an order with that number. Please check your order ID and try again.");
    }
  };

  const statusData = searchedOrder ? getOrderStatus(searchedOrder) : null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-champagne font-semibold block mb-2">
          HAMHOLD Atelier Logistics
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal">
          TRACK YOUR ORDER
        </h1>
        <p className="text-xs text-ivory-muted/80 font-light mt-1.5 leading-relaxed">
          Follow your bespoke fine jewellery creation from the goldsmith atelier to armored delivery.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-champagne/70 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. HM-2026-000001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-obsidian-surface text-ivory text-xs border border-champagne/30 focus:outline-none focus:border-champagne font-mono shadow-luxury"
            />
          </div>
          <button
            type="submit"
            className="px-7 py-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-wider uppercase font-semibold transition-all shadow-glow flex items-center gap-1.5"
          >
            <span>Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Recent orders quick select if available */}
        {orders.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3 justify-center text-[11px] text-ivory-muted">
            <span>Recent Orders:</span>
            {orders.slice(0, 3).map((ord) => (
              <button
                key={ord.orderId}
                type="button"
                onClick={() => {
                  setSearchId(ord.orderId);
                  setSearchedOrder(ord);
                  setErrorMessage('');
                }}
                className={`px-2.5 py-1 rounded-full font-mono text-[10px] transition-colors ${
                  searchedOrder?.orderId === ord.orderId
                    ? 'bg-champagne text-obsidian font-bold'
                    : 'bg-obsidian-surface hover:bg-champagne/15 text-champagne border border-champagne/25'
                }`}
              >
                {ord.orderId}
              </button>
            ))}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs text-center animate-fade-in">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Tracking Details View */}
      {searchedOrder && statusData ? (
        <div
          className="p-6 sm:p-10 rounded-2xl bg-obsidian-surface border border-champagne/25 shadow-2xl space-y-8 animate-fade-in"
          style={{
            transform: 'perspective(1200px)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Status Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-champagne/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest text-champagne font-semibold font-mono">
                  {searchedOrder.orderId}
                </span>
                <span className="text-ivory-muted/40">•</span>
                <span className="text-xs text-ivory-muted">
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-ivory font-normal flex items-center gap-2.5">
                <span>Current Status:</span>
                <span className="text-gold-gradient font-medium">{statusData.currentStage.label}</span>
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-ivory-muted block">
                Estimated Delivery
              </span>
              <span className="font-serif-luxury text-xl text-champagne">
                {searchedOrder.estimatedDeliveryWindow}
              </span>
            </div>
          </div>

          {/* Visual Tracking Progress Bar (Flipkart-Style Stage Timeline) */}
          <div className="space-y-6">
            <h3 className="font-serif-luxury text-xl text-ivory">Atelier Fulfillment Timeline</h3>

            <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-[15px] sm:before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-champagne/20">
              {statusData.stages.map((stg, idx) => {
                const isCompleted = stg.isCompleted;
                const isCurrent = stg.isCurrent;

                return (
                  <div key={stg.id} className="relative flex items-start gap-4 sm:gap-6 group">
                    {/* Circle Indicator */}
                    <div
                      className={`absolute -left-[24px] sm:-left-[28px] top-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-champagne text-obsidian border-2 border-champagne shadow-glow'
                          : isCurrent
                          ? 'bg-obsidian border-2 border-champagne text-champagne animate-pulse shadow-glow'
                          : 'bg-obsidian-surface border border-champagne/25 text-ivory-muted/40'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : isCurrent ? (
                        <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <span className="text-[10px] font-mono">{idx + 1}</span>
                      )}
                    </div>

                    {/* Stage Details */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`text-sm sm:text-base font-serif-luxury tracking-wide ${
                          isCompleted || isCurrent ? 'text-ivory font-medium' : 'text-ivory-muted/60'
                        }`}>
                          {stg.label}
                        </h4>
                        {(isCompleted || isCurrent) && (
                          <span className="text-[11px] text-champagne/80 font-mono">
                            {stg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs font-sans mt-0.5 leading-relaxed ${
                        isCompleted || isCurrent ? 'text-ivory-muted' : 'text-ivory-muted/40'
                      }`}>
                        {stg.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Destination & Order Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-champagne/15 text-xs">
            {/* Delivery Address */}
            <div className="p-4 rounded-xl bg-obsidian-card/70 border border-champagne/15 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                Delivery Destination
              </span>
              <div className="text-ivory font-medium text-sm">{searchedOrder.customer.name}</div>
              <div className="text-ivory-muted">{searchedOrder.deliveryAddress.addressLine}</div>
              <div className="text-ivory-muted">
                {searchedOrder.deliveryAddress.city}, {searchedOrder.deliveryAddress.state} — {searchedOrder.deliveryAddress.pincode}
              </div>
              <div className="text-ivory-muted font-mono pt-1">Phone: {searchedOrder.customer.phone}</div>
            </div>

            {/* Payment & Security */}
            <div className="p-4 rounded-xl bg-obsidian-card/70 border border-champagne/15 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                Payment &amp; Authentication
              </span>
              <div className="text-ivory font-medium text-sm">
                Total Paid: {formatINR(searchedOrder.totalAmount)}
              </div>
              <div className="text-ivory-muted">Method: {searchedOrder.paymentMethod}</div>
              <div className="text-champagne font-medium flex items-center gap-1">
                <Check className="w-3 h-3 text-champagne" />
                Status: {searchedOrder.paymentStatus}
              </div>
              <div className="text-ivory-muted/70 text-[11px] pt-1">
                Includes tamper-evident seal and 100% BIS Hallmarking certificate.
              </div>
            </div>
          </div>

          {/* Items In Parcel */}
          <div className="space-y-3 pt-4 border-t border-champagne/15">
            <h4 className="font-serif-luxury text-lg text-ivory">Items in Transit</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {searchedOrder.items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-obsidian border border-champagne/10 text-xs">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-12 h-12 rounded object-cover border border-champagne/15 bg-obsidian-card"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif-luxury text-sm text-ivory font-normal truncate">{it.name}</h5>
                    <span className="text-ivory-muted text-[11px]">Size: {it.selectedSize} • Qty: {it.quantity}</span>
                  </div>
                  <div className="font-semibold text-champagne font-mono">
                    {formatINR(it.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
