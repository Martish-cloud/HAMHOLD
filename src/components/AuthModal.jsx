import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, User, Phone, ArrowRight, Check } from 'lucide-react';

export default function AuthModal({ onSuccess = null }) {
  const { isAuthModalOpen, setIsAuthModalOpen, customer, signInCustomer } = useShop();

  const [step, setStep] = useState('details'); // 'details' | 'verify'
  const [name, setName] = useState(customer?.name || '');
  const [contact, setContact] = useState(customer?.contact || '');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!contact.trim()) {
      setError('Please enter your mobile number or email address.');
      return;
    }
    setError('');
    setStep('verify');
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    const cleanCode = code.trim();
    if (cleanCode.length < 4 || cleanCode.length > 6 || !/^\d+$/.test(cleanCode)) {
      setError('Please enter a valid 4 to 6 digit verification code.');
      return;
    }

    const newCustomer = signInCustomer(name, contact, cleanCode);
    setStep('details');
    setCode('');
    setError('');
    if (onSuccess) onSuccess(newCustomer);
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setStep('details');
    setError('');
    setCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div
        className="relative w-full max-w-md bg-obsidian-surface border border-champagne/30 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden my-8"
        style={{
          transform: 'perspective(1000px) translateZ(10px)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian/70 hover:bg-obsidian border border-champagne/20 text-ivory hover:text-champagne transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-champagne/15">
          <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne mx-auto mb-3 shadow-glow">
            <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-champagne font-semibold block mb-1">
            Client Atelier Access
          </span>
          <h3 className="font-serif-luxury text-2xl text-ivory font-normal">
            {step === 'details' ? 'Sign In to HAMHOLD' : 'Verify Your Account'}
          </h3>
          <p className="text-xs text-ivory-muted/80 mt-1 font-sans font-light">
            {step === 'details'
              ? 'Access bespoke jewellery curation, private orders, and express checkout.'
              : `Enter your verification code to confirm ${contact}`}
          </p>
        </div>

        {/* Step 1: Details */}
        {step === 'details' ? (
          <form onSubmit={handleDetailsSubmit} className="space-y-4 pt-6 text-xs">
            <div>
              <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                Full Name <span className="text-champagne">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-champagne/60 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Kapoor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-obsidian text-ivory text-xs border border-champagne/20 focus:outline-none focus:border-champagne"
                />
              </div>
            </div>

            <div>
              <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                Mobile Number or Email <span className="text-champagne">*</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-champagne/60 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or name@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-obsidian text-ivory text-xs border border-champagne/20 focus:outline-none focus:border-champagne font-mono"
                />
              </div>
            </div>

            {error && (
              <p className="text-[11px] text-red-400 pt-1">{error}</p>
            )}

            <button
              type="submit"
              className="btn-3d w-full py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-glow flex items-center justify-center gap-2 mt-4"
            >
              <span>Continue to Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Step 2: Verification Code */
          <form onSubmit={handleVerifySubmit} className="space-y-4 pt-6 text-xs">
            <div>
              <label className="block text-ivory-muted uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                4 to 6-Digit Verification Code
              </label>
              <input
                type="text"
                autoFocus
                maxLength={6}
                placeholder="Enter 4–6 digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center tracking-[0.4em] text-lg font-mono py-3 rounded-lg bg-obsidian text-champagne border border-champagne/30 focus:outline-none focus:border-champagne"
              />
              <p className="text-[10px] text-ivory-muted/70 text-center mt-2 font-sans">
                Enter any 4–6 digit code to confirm your private client verification.
              </p>
            </div>

            {error && (
              <p className="text-[11px] text-red-400 text-center pt-1">{error}</p>
            )}

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="btn-3d-secondary flex-1 py-3 rounded-full bg-obsidian-surface hover:bg-obsidian border border-champagne/25 text-ivory-soft text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Change Details
              </button>

              <button
                type="submit"
                className="btn-3d flex-1 py-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian text-xs tracking-wider uppercase font-semibold transition-all shadow-glow flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Verify &amp; Sign In</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
