import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { checkDeliveryAvailability } from '../data/deliveryLocations';

const ShopContext = createContext();

// Order tracking timeline stages
export const TRACKING_STAGES = [
  { id: 'placed', label: 'Order Placed', desc: 'Your fine jewellery order has been received.', elapsedSeconds: 0 },
  { id: 'confirmed', label: 'Order Confirmed', desc: 'Payment verified and bespoke requisition created.', elapsedSeconds: 5 },
  { id: 'preparing', label: 'Preparing Your Jewellery', desc: 'Master artisans allocated at the Midnight Atelier.', elapsedSeconds: 10 },
  { id: 'quality_checked', label: 'Quality Check Completed', desc: 'BIS Hallmark inspection & diamond verification certified.', elapsedSeconds: 15 },
  { id: 'packed', label: 'Packed', desc: 'Sealed inside tamper-evident luxury velvet vault packaging.', elapsedSeconds: 20 },
  { id: 'dispatched', label: 'Dispatched', desc: 'Handed over for high-value insured transit.', elapsedSeconds: 25 },
  { id: 'in_transit', label: 'In Transit', desc: 'Moving securely with specialized armored courier logistics.', elapsedSeconds: 30 },
  { id: 'out_for_delivery', label: 'Out for Delivery', desc: 'Courier representative dispatched to your doorstep.', elapsedSeconds: 35 },
  { id: 'delivered', label: 'Delivered', desc: 'Signature received. Welcome to the HAMHOLD family.', elapsedSeconds: 40 }
];

export function ShopProvider({ children }) {
  // 1. Cart State (Fresh session starts empty: [])
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('hamhold_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Wishlist State (Fresh session starts empty: [])
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('hamhold_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Customer Identity (Persistent Sign-In)
  const [customer, setCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem('hamhold_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. Orders History (Persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('hamhold_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Promo Code State
  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      return localStorage.getItem('hamhold_applied_promo') || null;
    } catch {
      return null;
    }
  });

  // 6. Selected Delivery Location
  const [selectedDelivery, setSelectedDelivery] = useState(() => {
    try {
      const saved = localStorage.getItem('hamhold_delivery_location');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 7. Navigation & Active View Router
  // 'home' | 'catalogue' | 'story' | 'track-order' | 'orders' | 'checkout'
  const [activeView, setActiveView] = useState('home');
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(null);

  // 8. UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // 9. Catalogue Filters
  const [catalogueFilter, setCatalogueFilter] = useState({
    category: 'all',
    gender: 'all',
    collection: 'all',
    metal: 'all',
    priceRange: 'all',
    sort: 'featured',
    searchQuery: ''
  });

  // 10. Rich Toast Notification
  const [toastData, setToastData] = useState(null);

  // Synchronization with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hamhold_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('hamhold_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (customer) {
        localStorage.setItem('hamhold_customer', JSON.stringify(customer));
      } else {
        localStorage.removeItem('hamhold_customer');
      }
    } catch (e) {
      console.error(e);
    }
  }, [customer]);

  useEffect(() => {
    try {
      localStorage.setItem('hamhold_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('hamhold_applied_promo', appliedPromo);
      } else {
        localStorage.removeItem('hamhold_applied_promo');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedPromo]);

  useEffect(() => {
    try {
      if (selectedDelivery) {
        localStorage.setItem('hamhold_delivery_location', JSON.stringify(selectedDelivery));
      } else {
        localStorage.removeItem('hamhold_delivery_location');
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedDelivery]);

  // Show rich or simple toast
  const showToast = (messageOrData) => {
    if (typeof messageOrData === 'string') {
      setToastData({ message: messageOrData });
    } else {
      setToastData(messageOrData);
    }
    setTimeout(() => {
      setToastData(null);
    }, 3500);
  };

  // Cart Operations
  const addToCart = (product, selectedSize = null, qty = 1) => {
    const size = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + qty
        };
        return next;
      }
      return [...prev, { product, quantity: qty, selectedSize: size }];
    });

    // Elegant rich notification
    showToast({
      title: 'Added to Your Bag',
      productName: product.name,
      quantity: qty,
      image: product.primaryImage,
      price: product.price
    });
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize === selectedSize)
    ));
    showToast('Item removed from Bag');
  };

  const updateCartQty = (productId, selectedSize, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === selectedSize) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast(prod ? `Removed ${prod.name} from Wishlist` : 'Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast(prod ? `Saved ${prod.name} to Wishlist` : 'Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const moveWishlistToBag = (product, size = null) => {
    addToCart(product, size, 1);
    toggleWishlist(product.id);
  };

  // Financial Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Promo code FOREVER10: 10% discount on product subtotal
  const isPromoValid = appliedPromo === 'FOREVER10';
  const discountAmount = isPromoValid ? Math.round(cartSubtotal * 0.10) : 0;
  const discountedSubtotal = Math.max(0, cartSubtotal - discountAmount);

  // Configurable GST: 18% on discounted subtotal
  const gstRate = 0.18;
  const gstAmount = cart.length > 0 ? Math.round(discountedSubtotal * gstRate) : 0;

  // Configurable Flat Delivery: ₹499 per order
  const deliveryCharge = cart.length > 0 ? 499 : 0;

  // Final Payable Total
  const finalPayableTotal = cart.length > 0 ? (discountedSubtotal + gstAmount + deliveryCharge) : 0;

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FOREVER10') {
      setAppliedPromo('FOREVER10');
      showToast('10% Privilege Privilege Applied');
      return { success: true, message: '10% privilege discount applied successfully!' };
    }
    return { success: false, message: 'Invalid code. Use FOREVER10 for 10% privilege discount.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promotional code removed');
  };

  // Customer Authentication Operations
  const signInCustomer = (name, contact, verificationCode) => {
    const newCustomer = {
      name: name.trim() || 'Valued Guest',
      contact: contact.trim(),
      signedInAt: new Date().toISOString(),
      isLoggedIn: true
    };
    setCustomer(newCustomer);
    setIsAuthModalOpen(false);
    showToast(`Welcome, ${newCustomer.name}`);
    return newCustomer;
  };

  const signOutCustomer = () => {
    setCustomer(null);
    showToast('Signed out successfully');
  };

  // Order Creation & Progression
  const createOrder = ({ customerDetails, deliveryAddress, paymentMethod }) => {
    // Collision-resistant unique Order ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `HM-2026-${randomSuffix}`;

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: customerDetails.name,
        phone: customerDetails.phone,
        email: customerDetails.email || ''
      },
      deliveryAddress: {
        addressLine: deliveryAddress.addressLine,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        pincode: deliveryAddress.pincode,
        landmark: deliveryAddress.landmark || ''
      },
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        image: item.product.primaryImage,
        collection: item.product.collection,
        metal: item.product.metal
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      promoCode: appliedPromo,
      gst: gstAmount,
      deliveryFee: deliveryCharge,
      totalAmount: finalPayableTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Payment Due on Delivery' : 'Payment Confirmed',
      estimatedDeliveryWindow: '3–7 Business Days'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Get Order Progression Status from stored timestamp
  const getOrderStatus = (order) => {
    if (!order) return null;
    const now = new Date().getTime();
    const created = new Date(order.createdAt).getTime();
    const elapsedSeconds = Math.max(0, Math.floor((now - created) / 1000));

    // Find current stage index (each stage advances every 5s, stopping at Delivered at 40s)
    let currentStageIndex = 0;
    for (let i = 0; i < TRACKING_STAGES.length; i++) {
      if (elapsedSeconds >= TRACKING_STAGES[i].elapsedSeconds) {
        currentStageIndex = i;
      }
    }

    const currentStage = TRACKING_STAGES[currentStageIndex];
    return {
      currentStageIndex,
      currentStage,
      isDelivered: currentStage.id === 'delivered',
      elapsedSeconds,
      stages: TRACKING_STAGES.map((stg, idx) => ({
        ...stg,
        isCompleted: idx < currentStageIndex,
        isCurrent: idx === currentStageIndex,
        isPending: idx > currentStageIndex,
        timestamp: new Date(created + stg.elapsedSeconds * 1000)
      }))
    };
  };

  // View History Stack for seamless back navigation
  const [navigationHistory, setNavigationHistory] = useState([
    { view: 'home', scrollY: 0, filters: null }
  ]);

  const pushViewHistory = (currentViewSnapshot) => {
    const currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;
    setNavigationHistory(prev => [
      ...prev,
      {
        view: currentViewSnapshot || activeView,
        scrollY: currentScroll,
        filters: activeView === 'catalogue' ? { ...catalogueFilter } : null
      }
    ]);
  };

  // Navigation Helpers
  const navigateToCatalogue = (filterOverrides = {}) => {
    pushViewHistory();
    setCatalogueFilter(prev => ({
      ...prev,
      category: 'all',
      gender: 'all',
      collection: 'all',
      metal: 'all',
      priceRange: 'all',
      searchQuery: '',
      ...filterOverrides
    }));
    setActiveView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTrackOrder = (orderId = null) => {
    pushViewHistory();
    if (orderId) setActiveTrackingOrderId(orderId);
    setActiveView('track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOrders = () => {
    pushViewHistory();
    setActiveView('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOurStory = () => {
    pushViewHistory();
    setActiveView('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCheckout = () => {
    pushViewHistory();
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = (fallbackView = 'catalogue') => {
    if (selectedProduct) {
      setSelectedProduct(null);
      return;
    }

    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      const previousState = newHistory.pop();
      setNavigationHistory(newHistory);

      if (previousState) {
        if (previousState.filters) {
          setCatalogueFilter(previousState.filters);
        }
        setActiveView(previousState.view);
        setTimeout(() => {
          if (typeof window !== 'undefined' && previousState.scrollY !== undefined) {
            window.scrollTo({ top: previousState.scrollY, behavior: 'smooth' });
          }
        }, 60);
        return;
      }
    }

    // Default fallback
    if (activeView === 'catalogue') {
      setActiveView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveView(fallbackView || 'catalogue');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ShopContext.Provider
      value={{
        goBack,
        navigationHistory,
        // Cart
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToBag,
        isWishlistOpen,
        setIsWishlistOpen,

        // Promo & Pricing
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isPromoValid,
        discountAmount,
        discountedSubtotal,
        gstRate,
        gstAmount,
        deliveryCharge,
        finalPayableTotal,

        // Delivery
        selectedDelivery,
        setSelectedDelivery,
        checkDeliveryAvailability,

        // Customer Identity
        customer,
        signInCustomer,
        signOutCustomer,
        isAuthModalOpen,
        setIsAuthModalOpen,

        // Orders & Tracking
        orders,
        createOrder,
        getOrderStatus,
        activeTrackingOrderId,
        setActiveTrackingOrderId,

        // Routing & Views
        activeView,
        setActiveView,
        navigateToCatalogue,
        navigateToTrackOrder,
        navigateToOrders,
        navigateToOurStory,
        navigateToCheckout,

        // Modals & Navigation
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        selectedProduct,
        setSelectedProduct,
        isAboutOpen,
        setIsAboutOpen,
        isContactOpen,
        setIsContactOpen,

        // Catalogue Filters
        catalogueFilter,
        setCatalogueFilter,

        // Toast
        toastData,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
