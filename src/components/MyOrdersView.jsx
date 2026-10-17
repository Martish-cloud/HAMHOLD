import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatINR } from '../data/products';
import { Package, Truck, ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';

export default function MyOrdersView() {
  const { orders, navigateToTrackOrder, navigateToCatalogue, getOrderStatus, customer } = useShop();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-champagne/15">
        <div>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-champagne font-semibold block mb-1">
            Private Client Portfolio
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal">
            YOUR ORDERS &amp; ACQUISITIONS
          </h1>
          {customer?.isLoggedIn && (
            <p className="text-xs text-ivory-muted font-light mt-1">
              Account: {customer.name} ({customer.contact})
            </p>
          )}
        </div>

        <button
          onClick={() => navigateToCatalogue()}
          className="px-6 py-2.5 rounded-full border border-champagne/30 text-ivory hover:text-champagne hover:border-champagne text-xs uppercase tracking-widest font-semibold transition-all self-start sm:self-auto"
        >
          Discover More Pieces
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-2xl bg-obsidian-surface border border-champagne/20 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne mx-auto mb-4">
            <Package className="w-7 h-7" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-ivory mb-2">No Active Orders</h3>
          <p className="text-xs text-ivory-muted max-w-sm mx-auto mb-6 leading-relaxed">
            You haven't placed any fine jewellery orders in this session yet. Explore our bespoke catalog to select heirlooms.
          </p>
          <button
            onClick={() => navigateToCatalogue()}
            className="px-8 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-widest uppercase font-semibold transition-all shadow-glow"
          >
            START SHOPPING
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => {
            const statusInfo = getOrderStatus(ord);
            return (
              <div
                key={ord.orderId}
                className="p-6 rounded-2xl bg-obsidian-surface border border-champagne/25 shadow-luxury space-y-5 transition-all hover:border-champagne/45"
                style={{
                  transform: 'perspective(1000px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-champagne/15 text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-bold text-champagne text-sm">
                      {ord.orderId}
                    </span>
                    <span className="text-ivory-muted/40">•</span>
                    <span className="text-ivory-muted">
                      {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-ivory-muted/40">•</span>
                    <span className="text-ivory font-medium">
                      {ord.paymentMethod} ({ord.paymentStatus})
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/15 border border-champagne/30 text-champagne text-[11px] font-medium font-sans">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{statusInfo?.currentStage?.label || 'Processing'}</span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ord.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-obsidian border border-champagne/10 text-xs">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-12 h-12 rounded object-cover border border-champagne/15 bg-obsidian-card shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif-luxury text-sm text-ivory font-normal truncate">{it.name}</h5>
                        <div className="text-[11px] text-ivory-muted">Qty: {it.quantity} • Size: {it.selectedSize}</div>
                        <div className="text-champagne font-mono font-semibold">{formatINR(it.price * it.quantity)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-champagne/15">
                  <div className="text-xs">
                    <span className="text-ivory-muted">Total Amount: </span>
                    <span className="font-serif-luxury text-lg text-champagne font-semibold font-mono">
                      {formatINR(ord.totalAmount)}
                    </span>
                    <span className="text-[11px] text-ivory-muted/70 block">
                      Destination: {ord.deliveryAddress.city}, {ord.deliveryAddress.state} ({ord.deliveryAddress.pincode})
                    </span>
                  </div>

                  <button
                    onClick={() => navigateToTrackOrder(ord.orderId)}
                    className="px-6 py-2.5 rounded-full bg-champagne/20 hover:bg-champagne text-champagne hover:text-obsidian border border-champagne/30 text-xs tracking-wider uppercase font-semibold transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Order Live</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
