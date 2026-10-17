// HAMHOLD Fine Jewellery — Delivery Availability Configuration
// Supported serviced locations and Indian PIN code mappings

export const SUPPORTED_LOCATIONS = [
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    type: 'city',
    pinPrefixes: ['400', '401'],
    estimatedDays: '2–4 business days',
    expressEligible: true
  },
  {
    name: 'Delhi',
    state: 'Delhi NCR',
    type: 'city',
    pinPrefixes: ['110', '121', '122', '201'],
    estimatedDays: '2–4 business days',
    expressEligible: true
  },
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    type: 'city',
    pinPrefixes: ['560', '561', '562'],
    estimatedDays: '3–5 business days',
    expressEligible: true
  },
  {
    name: 'Pune',
    state: 'Maharashtra',
    type: 'city',
    pinPrefixes: ['411', '412'],
    estimatedDays: '2–4 business days',
    expressEligible: true
  },
  {
    name: 'Kolkata',
    state: 'West Bengal',
    type: 'city',
    pinPrefixes: ['700', '701', '711', '712'],
    estimatedDays: '3–5 business days',
    expressEligible: true
  },
  {
    name: 'Punjab',
    state: 'Punjab',
    type: 'state',
    pinPrefixes: ['140', '141', '142', '143', '144', '145', '146', '147', '148', '151', '152', '160'],
    estimatedDays: '3–7 business days',
    expressEligible: true
  }
];

export const LOCATION_SUGGESTIONS = [
  { label: 'Mumbai', value: 'Mumbai', isState: false },
  { label: 'Delhi', value: 'Delhi', isState: false },
  { label: 'Bengaluru', value: 'Bengaluru', isState: false },
  { label: 'Pune', value: 'Pune', isState: false },
  { label: 'Kolkata', value: 'Kolkata', isState: false },
  { label: 'Punjab', value: 'Punjab', isState: true }
];

export function checkDeliveryAvailability(query = '') {
  const clean = query.trim().toLowerCase();
  if (!clean) {
    return {
      searched: false,
      isAvailable: false,
      message: 'Please enter a city, state, or 6-digit Indian PIN code.'
    };
  }

  // Check if query is a 6-digit PIN code
  const isPin = /^\d{6}$/.test(clean);
  const pinPrefix = clean.slice(0, 3);

  if (isPin) {
    const matchedLoc = SUPPORTED_LOCATIONS.find(loc =>
      loc.pinPrefixes.some(prefix => clean.startsWith(prefix))
    );

    if (matchedLoc) {
      return {
        searched: true,
        isAvailable: true,
        location: matchedLoc.type === 'state' ? matchedLoc.name : `${matchedLoc.name}, ${matchedLoc.state}`,
        pincode: clean,
        estimatedDays: matchedLoc.estimatedDays,
        message: `Delivery available • Estimated delivery: ${matchedLoc.estimatedDays}`
      };
    } else {
      return {
        searched: true,
        isAvailable: false,
        pincode: clean,
        message: 'Availability needs confirmation for this location.'
      };
    }
  }

  // Check by location name (city or state)
  const matchedLoc = SUPPORTED_LOCATIONS.find(loc =>
    loc.name.toLowerCase().includes(clean) ||
    loc.state.toLowerCase().includes(clean) ||
    clean.includes(loc.name.toLowerCase()) ||
    clean.includes(loc.state.toLowerCase())
  );

  if (matchedLoc) {
    return {
      searched: true,
      isAvailable: true,
      location: matchedLoc.type === 'state' ? matchedLoc.name : `${matchedLoc.name}, ${matchedLoc.state}`,
      estimatedDays: matchedLoc.estimatedDays,
      message: `Delivery available • Estimated delivery: ${matchedLoc.estimatedDays}`
    };
  }

  return {
    searched: true,
    isAvailable: false,
    message: 'Availability needs confirmation for this location.'
  };
}
