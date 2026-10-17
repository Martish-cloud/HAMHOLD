import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { LOCATION_SUGGESTIONS } from '../data/deliveryLocations';
import { MapPin, CheckCircle2, AlertCircle, ArrowRight, Truck } from 'lucide-react';

export default function DeliveryChecker({ compact = false, onSelectLocation = null }) {
  const { checkDeliveryAvailability, selectedDelivery, setSelectedDelivery } = useShop();

  const [locationInput, setLocationInput] = useState(selectedDelivery?.location || '');
  const [pinInput, setPinInput] = useState(selectedDelivery?.pincode || '');
  const [result, setResult] = useState(selectedDelivery ? {
    searched: true,
    isAvailable: selectedDelivery.isAvailable,
    message: selectedDelivery.message,
    estimatedDays: selectedDelivery.estimatedDays
  } : null);

  const handleCheck = (e) => {
    if (e) e.preventDefault();
    const query = pinInput.trim() || locationInput.trim();
    if (!query) {
      setResult({
        searched: true,
        isAvailable: false,
        message: 'Please enter either a City/Location name or a 6-digit PIN code.'
      });
      return;
    }

    const res = checkDeliveryAvailability(query);
    setResult(res);

    if (res.isAvailable) {
      const deliveryObj = {
        location: res.location || locationInput.trim() || 'Selected Area',
        pincode: res.pincode || pinInput.trim(),
        estimatedDays: res.estimatedDays,
        message: res.message,
        isAvailable: true
      };
      setSelectedDelivery(deliveryObj);
      if (onSelectLocation) onSelectLocation(deliveryObj);
    }
  };

  const handleSuggestionClick = (sug) => {
    setLocationInput(sug.value);
    setPinInput('');
    const res = checkDeliveryAvailability(sug.value);
    setResult(res);
    if (res.isAvailable) {
      const deliveryObj = {
        location: sug.value,
        pincode: '',
        estimatedDays: res.estimatedDays,
        message: res.message,
        isAvailable: true
      };
      setSelectedDelivery(deliveryObj);
      if (onSelectLocation) onSelectLocation(deliveryObj);
    }
  };

  return (
    <div className={`p-4 rounded-xl bg-obsidian-card/80 border border-champagne/20 backdrop-blur-md shadow-luxury ${compact ? 'text-xs' : 'text-sm'}`}>
      <div className="flex items-center gap-2 mb-2.5">
        <Truck className="w-4 h-4 text-champagne" />
        <span className="font-semibold text-champagne uppercase tracking-widest text-[11px]">
          Check Insured Delivery Availability
        </span>
      </div>

      {/* Inputs (Either City/Location OR PIN Code) */}
      <form onSubmit={handleCheck} className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-champagne/60 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="City or State (e.g. Mumbai)"
              value={locationInput}
              onChange={(e) => {
                setLocationInput(e.target.value);
                if (e.target.value) setPinInput('');
              }}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-obsidian text-ivory text-xs border border-champagne/20 focus:outline-none focus:border-champagne"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              maxLength={6}
              placeholder="Or 6-Digit PIN Code"
              value={pinInput}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setPinInput(val);
                if (val) setLocationInput('');
              }}
              className="w-full px-3 py-2 rounded-lg bg-obsidian text-ivory text-xs border border-champagne/20 focus:outline-none focus:border-champagne font-mono"
            />
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-ivory-muted/70 uppercase tracking-wider mr-1">Quick Select:</span>
          {LOCATION_SUGGESTIONS.map((sug) => (
            <button
              key={sug.label}
              type="button"
              onClick={() => handleSuggestionClick(sug)}
              className="px-2.5 py-1 rounded-full text-[10px] bg-obsidian-surface hover:bg-champagne/15 border border-champagne/25 text-ivory-soft hover:text-champagne transition-colors"
            >
              {sug.label} {sug.isState && <span className="text-champagne/60 text-[9px]">(State)</span>}
            </button>
          ))}
        </div>

        {/* Check Button */}
        <button
          type="submit"
          className="btn-3d w-full py-2.5 rounded-lg bg-champagne hover:bg-champagne-light text-obsidian text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-glow flex items-center justify-center gap-2"
        >
          <span>Check Availability</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Result feedback */}
      {result && result.searched && (
        <div className={`mt-3 p-3 rounded-lg flex items-start gap-2.5 ${
          result.isAvailable
            ? 'bg-champagne/10 border border-champagne/30 text-champagne-light'
            : 'bg-red-500/10 border border-red-500/25 text-red-300'
        }`}>
          {result.isAvailable ? (
            <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-0.5">
            <div className="font-semibold text-ivory">
              {result.isAvailable ? 'Delivery available' : 'Serviceability Notice'}
            </div>
            <div className="text-ivory-soft/90">
              {result.message}
            </div>
            {result.location && (
              <div className="text-[11px] text-champagne font-mono pt-0.5">
                Location: {result.location} {result.pincode ? `(${result.pincode})` : ''}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
