import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Mail, Phone, MapPin, Clock, Check } from 'lucide-react';

export default function ContactModal() {
  const { isContactOpen, setIsContactOpen } = useShop();
  const [isSent, setIsSent] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setIsContactOpen(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex justify-center animate-fade-in">
      <div className="w-full max-w-2xl bg-obsidian-surface border border-champagne/25 rounded-2xl shadow-2xl p-6 sm:p-10 relative my-auto">
        <button
          onClick={() => setIsContactOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-obsidian/60 hover:bg-obsidian border border-champagne/20 text-ivory hover:text-champagne transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="text-center pb-6 border-b border-champagne/15 mb-6">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-champagne font-medium block mb-2">
              Atelier Concierge
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivory font-normal">
              CONNECT WITH HAMHOLD
            </h2>
            <p className="text-xs text-ivory-muted mt-2 font-sans">
              For bespoke commissions, private viewings, or size consultations.
            </p>
          </div>

          {/* Fictional Business Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="p-4 rounded-xl bg-obsidian-card border border-champagne/15 flex items-start gap-3">
              <Mail className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div>
                <span className="text-champagne font-semibold block uppercase tracking-wider text-[10px]">
                  Concierge Email
                </span>
                <span className="text-ivory-soft font-mono">hello@hamhold.example</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-card border border-champagne/15 flex items-start gap-3">
              <Phone className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div>
                <span className="text-champagne font-semibold block uppercase tracking-wider text-[10px]">
                  Atelier Phone
                </span>
                <span className="text-ivory-soft font-mono">+91 00000 00000</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-card border border-champagne/15 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div>
                <span className="text-champagne font-semibold block uppercase tracking-wider text-[10px]">
                  Flagship Atelier
                </span>
                <span className="text-ivory-soft">
                  The Boulevard, Level 3, Fictional District, Mumbai 400051
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-card border border-champagne/15 flex items-start gap-3">
              <Clock className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div>
                <span className="text-champagne font-semibold block uppercase tracking-wider text-[10px]">
                  Visiting Hours
                </span>
                <span className="text-ivory-soft">Mon – Sat: 11:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Concierge Inquiry Form */}
          {isSent ? (
            <div className="text-center py-8 bg-obsidian-card rounded-xl border border-champagne/25 p-6">
              <Check className="w-8 h-8 text-champagne mx-auto mb-2" />
              <h4 className="font-serif-luxury text-lg text-ivory">Message Received</h4>
              <p className="text-xs text-ivory-muted mt-1">Our concierge team will respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Your Name"
                  className="px-3.5 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="px-3.5 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Inquire about a piece, custom ring size, or appointment..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian text-ivory border border-champagne/20 focus:outline-none focus:border-champagne"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs uppercase tracking-widest font-semibold transition-all shadow-glow"
              >
                SEND CONCIERGE MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
