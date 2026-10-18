import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Check } from 'lucide-react';
import { BlurWipeText } from './TextAnimations';

export default function Footer() {
  const { navigateToCatalogue, setIsAboutOpen, setIsContactOpen } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const videoRef = useRef(null);

  // Performance-optimized video playback: play when near viewport, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: '300px 0px', threshold: 0.05 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-obsidian text-ivory border-t border-champagne/20 pt-16 pb-12 overflow-hidden">
      {/* Genuine Full-Width Background Video 5 (~90% visual visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-90 filter contrast-105 brightness-95"
        >
          <source src="/Video/Video%20(5).mp4" type="video/mp4" />
        </video>

        {/* Lightweight translucent overlay ensuring 90% video visibility while keeping text crisp */}
        <div className="absolute inset-0 bg-obsidian/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,11,12,0.45)_95%)] pointer-events-none" />

        {/* Soft edge seam transition preventing video from overflowing boundaries */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,0.85)_0%,transparent_12%,transparent_90%,rgba(11,11,12,0.85)_100%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter & Brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-champagne/15 items-center">
          <div className="lg:col-span-6">
            <span className="font-serif-luxury text-3xl sm:text-4xl tracking-[0.2em] font-normal text-ivory block drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <BlurWipeText text="HAMHOLD" />
            </span>
            <span className="text-[10px] tracking-[0.35em] text-champagne uppercase font-sans mt-1 block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              CRAFTED TO HOLD FOREVER.
            </span>
            <p className="text-ivory-soft text-xs sm:text-sm font-light mt-3 max-w-md font-sans leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Experience contemporary fine jewellery sculpted for life's unforgettable milestones. Handcrafted in solid 18K gold and certified diamonds.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-obsidian/65 border border-champagne/30 rounded-2xl p-6 backdrop-blur-md shadow-luxury">
              <span className="text-xs uppercase tracking-widest text-champagne font-semibold block mb-1">
                Atelier Gazette
              </span>
              <p className="text-xs text-ivory-muted mb-4 font-sans">
                Subscribe for private showcase invitations, new collection debuts, and bespoke curation.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3 bg-champagne/15 border border-champagne/40 rounded-xl text-champagne text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the HAMHOLD Atelier Circle.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-full bg-obsidian text-ivory text-xs border border-champagne/25 focus:outline-none focus:border-champagne"
                  />
                  <button
                    type="submit"
                    className="btn-3d px-6 py-2.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs uppercase tracking-widest font-semibold transition-all shrink-0 flex items-center gap-1.5 shadow-glow"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-champagne/15 text-xs">
          {/* 1. SHOP */}
          <div>
            <span className="text-[11px] uppercase tracking-widest text-champagne font-semibold block mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              SHOP
            </span>
            <ul className="space-y-2.5 text-ivory-soft/90 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              <li>
                <button
                  onClick={() => navigateToCatalogue({ category: 'rings' })}
                  className="hover:text-champagne transition-colors"
                >
                  Rings
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCatalogue({ category: 'earrings' })}
                  className="hover:text-champagne transition-colors"
                >
                  Earrings
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCatalogue({ category: 'necklaces' })}
                  className="hover:text-champagne transition-colors"
                >
                  Necklaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCatalogue({ category: 'bracelets' })}
                  className="hover:text-champagne transition-colors"
                >
                  Bracelets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCatalogue({ category: 'pendants' })}
                  className="hover:text-champagne transition-colors"
                >
                  Pendants
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCatalogue({ category: 'mens' })}
                  className="hover:text-champagne transition-colors font-medium text-champagne/90"
                >
                  Men's Jewellery
                </button>
              </li>
            </ul>
          </div>

          {/* 2. DISCOVER */}
          <div>
            <span className="text-[11px] uppercase tracking-widest text-champagne font-semibold block mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              DISCOVER
            </span>
            <ul className="space-y-2.5 text-ivory-soft/90 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              <li>
                <button
                  onClick={() => navigateToCatalogue({ isNew: true })}
                  className="hover:text-champagne transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCatalogue()}
                  className="hover:text-champagne transition-colors"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCatalogue({ isBestseller: true })}
                  className="hover:text-champagne transition-colors"
                >
                  Bestsellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('gift-finder');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else navigateToCatalogue({ category: 'gifts' });
                  }}
                  className="hover:text-champagne transition-colors"
                >
                  Gifts &amp; Milestones
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="hover:text-champagne transition-colors"
                >
                  About HamHold
                </button>
              </li>
            </ul>
          </div>

          {/* 3. SUPPORT */}
          <div>
            <span className="text-[11px] uppercase tracking-widest text-champagne font-semibold block mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              SUPPORT
            </span>
            <ul className="space-y-2.5 text-ivory-soft/90 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-champagne transition-colors"
                >
                  Client Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-champagne transition-colors"
                >
                  Insured Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-champagne transition-colors"
                >
                  15-Day Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="hover:text-champagne transition-colors"
                >
                  Jewellery Care Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-champagne transition-colors"
                >
                  Ring Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-champagne transition-colors"
                >
                  FAQ &amp; Certification
                </button>
              </li>
            </ul>
          </div>

          {/* 4. CONNECT */}
          <div>
            <span className="text-[11px] uppercase tracking-widest text-champagne font-semibold block mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              CONNECT
            </span>
            <p className="text-ivory-soft/90 text-xs mb-3 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              Follow the Midnight Atelier on official brand channels:
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#hamhold-instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="HAMHOLD Instagram"
                className="w-9 h-9 rounded-full bg-obsidian border border-champagne/20 flex items-center justify-center text-ivory hover:text-champagne hover:border-champagne transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#hamhold-facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="HAMHOLD Facebook"
                className="w-9 h-9 rounded-full bg-obsidian border border-champagne/20 flex items-center justify-center text-ivory hover:text-champagne hover:border-champagne transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="#hamhold-pinterest"
                onClick={(e) => e.preventDefault()}
                aria-label="HAMHOLD Pinterest"
                className="w-9 h-9 rounded-full bg-obsidian border border-champagne/20 flex items-center justify-center text-ivory hover:text-champagne hover:border-champagne transition-all text-xs font-serif font-bold"
              >
                P
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-ivory-soft/80 gap-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
          <p>© {new Date().getFullYear()} HAMHOLD. All rights reserved. Crafted to hold forever.</p>
          <div className="flex items-center gap-4 text-[10px] tracking-wider uppercase">
            <span>The Midnight Atelier Experience</span>
            <span>•</span>
            <span>100% BIS Hallmarked Standards</span>
            <span>•</span>
            <span>ISO 9001 Certified Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
