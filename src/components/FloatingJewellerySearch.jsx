import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, X, Sparkles, ArrowRight, Layers, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, COLLECTIONS, CATEGORIES, formatINR } from '../data/products';

export default function FloatingJewellerySearch() {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, navigateToCatalogue } = useShop();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // Popular suggested searches for empty state
  const popularSuggestions = [
    'Necklace',
    'Diamond Solitaire',
    'Nose Ring',
    'Emerald Choker',
    "Men's Kada",
    'Tennis Bracelet',
    'Bridal Jewellery',
    'Gold Earrings'
  ];

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    setQuery('');
  }, [setIsSearchOpen]);

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Global Keyboard shortcuts (Escape, Cmd+K / Ctrl+K, Arrow navigation, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape' && isSearchOpen) {
        handleCloseSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen, handleCloseSearch]);

  // Lock body scroll when search panel overlay is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Live filter products
  const matchingProducts = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return [];

    const tokens = raw.split(/\s+/).filter(Boolean);
    const isWomensQuery = raw.includes('women') || raw.includes('her');
    const isMensQuery = raw.includes('men') || raw.includes('him');
    const isBridalQuery = raw.includes('bridal') || raw.includes('wedding');

    return PRODUCTS.filter((p) => {
      const pName = (p.name || '').toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      const pCatName = (p.categoryName || '').toLowerCase();
      const pMetal = (p.metal || '').toLowerCase();
      const pStone = (p.stone || '').toLowerCase();
      const pCol = (p.collection || '').toLowerCase();
      const pDesc = (p.description || '').toLowerCase();
      const pGender = (p.gender || '').toLowerCase();
      const pOccasion = (p.occasion || '').toLowerCase();
      const pTags = (p.giftingTags || []).join(' ').toLowerCase();

      if (isWomensQuery && pGender !== 'women') return false;
      if (isMensQuery && pGender !== 'men' && pCat !== 'mens') return false;

      if (isBridalQuery) {
        if (
          pOccasion.includes('bridal') ||
          pCat === 'bridal' ||
          pTags.includes('bridal') ||
          pDesc.includes('bridal') ||
          pName.includes('bridal')
        ) {
          return true;
        }
      }

      // Check matching for every token
      return tokens.every((token) => {
        const singularToken =
          token.endsWith('s') && token.length > 3 ? token.slice(0, -1) : token;

        return (
          pName.includes(token) ||
          pName.includes(singularToken) ||
          pCat.includes(token) ||
          pCat.includes(singularToken) ||
          pCatName.includes(token) ||
          pCatName.includes(singularToken) ||
          pMetal.includes(token) ||
          pStone.includes(token) ||
          pCol.includes(token) ||
          pDesc.includes(token) ||
          pTags.includes(token) ||
          pOccasion.includes(token)
        );
      });
    }).slice(0, 8);
  }, [query]);

  // Live filter collections
  const matchingCollections = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return [];
    return COLLECTIONS.filter((c) => {
      const cName = c.name.toLowerCase();
      const cTag = c.tagline.toLowerCase();
      return cName.includes(raw) || raw.includes(cName) || cTag.includes(raw);
    });
  }, [query]);

  // Live filter categories
  const matchingCategories = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return [];
    return CATEGORIES.filter((cat) => {
      const catName = cat.name.toLowerCase();
      const catId = cat.id.toLowerCase();
      return catName.includes(raw) || raw.includes(catId) || catId.includes(raw);
    });
  }, [query]);

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    handleCloseSearch();
  };

  const handleSelectCollection = (colId) => {
    navigateToCatalogue({ collection: colId });
    handleCloseSearch();
  };

  const handleSelectCategory = (catId) => {
    navigateToCatalogue({ category: catId });
    handleCloseSearch();
  };

  const handleViewAllResults = () => {
    navigateToCatalogue({ search: query });
    handleCloseSearch();
  };

  const handleKeyDownInInput = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < matchingProducts.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : matchingProducts.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (matchingProducts.length > 0 && selectedIndex >= 0 && matchingProducts[selectedIndex]) {
        handleSelectProduct(matchingProducts[selectedIndex]);
      } else if (query.trim()) {
        handleViewAllResults();
      }
    }
  };

  return (
    <>
      {/* 1. GLOBAL FLOATING SEARCH ICON TRIGGER BUTTON */}
      {/* Stays fixed at top-right, visible on all pages and while scrolling */}
      {!isSearchOpen && (
        <button
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search HAMHOLD fine jewellery"
          data-cursor="search"
          className="fixed top-24 right-4 sm:top-24 sm:right-6 lg:top-24 lg:right-8 z-[80] group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-obsidian-card/90 hover:bg-obsidian border border-champagne/30 hover:border-champagne text-champagne hover:text-champagne-light shadow-2xl hover:shadow-[0_0_20px_rgba(214,194,154,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8] group-hover:stroke-[2] transition-transform duration-300 group-hover:scale-110" />
        </button>
      )}

      {/* 2. EXPANDED FLOATING SEARCH PANEL OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[95] flex justify-center items-start pt-20 sm:pt-24 px-4 sm:px-6 pointer-events-auto">
          {/* Dimmed backdrop - click outside to close */}
          <div
            onClick={handleCloseSearch}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
          />

          {/* Elevated Search Panel with Continuous Animated Shimmer Border */}
          <div
            ref={panelRef}
            className="relative z-[100] w-full max-w-2xl p-[1.5px] rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(214,194,154,0.15)] animate-fade-in"
          >
            {/* Premium Animated Gold/Champagne Travelling Border Light Streak */}
            <div
              className="absolute -inset-[150%] pointer-events-none animate-[spin_6s_linear_infinite]"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 275deg, rgba(214, 194, 154, 0.25) 305deg, rgba(214, 194, 154, 0.95) 335deg, rgba(255, 250, 240, 1) 350deg, transparent 360deg)'
              }}
            />

            {/* Inner Luxury Container */}
            <div className="relative rounded-[15px] bg-obsidian-surface border border-champagne/30 backdrop-blur-2xl p-5 sm:p-7 text-ivory max-h-[82vh] flex flex-col overflow-hidden">
              {/* Top Search Input Row */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-champagne/20">
                <Search className="w-5 h-5 text-champagne shrink-0" />

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDownInInput}
                  placeholder={query ? '' : 'Search jewellery, collections or styles...'}
                  className="flex-1 bg-transparent text-base sm:text-lg text-ivory placeholder:text-ivory-muted/50 focus:outline-none font-serif-luxury"
                />

                {/* Clear Input Button */}
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="p-1.5 text-ivory-muted hover:text-champagne transition-colors"
                    aria-label="Clear search input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Close Button / ESC indicator */}
                <button
                  onClick={handleCloseSearch}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-champagne/80 hover:text-champagne border border-champagne/20 rounded-md font-mono transition-colors"
                  aria-label="Close search panel"
                >
                  ESC
                </button>
              </div>

              {/* Scrollable Results Area */}
              <div className="overflow-y-auto no-scrollbar pt-4 flex-1">
                {query.trim() === '' ? (
                  /* Empty State: Suggestions */
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-champagne/80 font-semibold mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-champagne" />
                      <span>Popular Atelier Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSuggestions.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setQuery(item);
                            inputRef.current?.focus();
                          }}
                          className="px-3.5 py-1.5 rounded-full text-xs bg-obsidian-card hover:bg-champagne/20 text-ivory-soft hover:text-champagne border border-champagne/15 transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Matching Collection & Category Chips */}
                    {(matchingCollections.length > 0 || matchingCategories.length > 0) && (
                      <div className="pb-3 mb-3 border-b border-champagne/15 space-y-2">
                        {matchingCollections.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] uppercase tracking-widest text-champagne/60 flex items-center gap-1 font-mono">
                              <Layers className="w-3 h-3" /> Collection:
                            </span>
                            {matchingCollections.map((col) => (
                              <button
                                key={col.id}
                                onClick={() => handleSelectCollection(col.id)}
                                className="px-2.5 py-1 rounded-full text-xs bg-champagne/15 text-champagne hover:bg-champagne hover:text-obsidian border border-champagne/30 transition-colors"
                              >
                                {col.name} Collection
                              </button>
                            ))}
                          </div>
                        )}

                        {matchingCategories.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] uppercase tracking-widest text-champagne/60 flex items-center gap-1 font-mono">
                              <Tag className="w-3 h-3" /> Category:
                            </span>
                            {matchingCategories.map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => handleSelectCategory(cat.id)}
                                className="px-2.5 py-1 rounded-full text-xs bg-obsidian-card text-ivory-soft hover:bg-champagne/20 hover:text-champagne border border-champagne/20 transition-colors"
                              >
                                {cat.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Matching Products List */}
                    {matchingProducts.length > 0 ? (
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-champagne/70 font-semibold mb-2.5 flex items-center justify-between">
                          <span>Matching Pieces ({matchingProducts.length})</span>
                          <button
                            onClick={handleViewAllResults}
                            className="text-champagne hover:underline inline-flex items-center gap-1 normal-case font-sans text-xs"
                          >
                            <span>Explore all</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="divide-y divide-champagne/10">
                          {matchingProducts.map((prod, index) => {
                            const isSelected = index === selectedIndex;
                            return (
                              <div
                                key={prod.id}
                                onClick={() => handleSelectProduct(prod)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={`group flex items-center gap-3.5 py-3 px-2.5 rounded-xl transition-colors cursor-pointer ${
                                  isSelected ? 'bg-champagne/15' : 'hover:bg-champagne/10'
                                }`}
                              >
                                {/* Thumbnail */}
                                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-lg bg-obsidian/70 border border-champagne/20 flex items-center justify-center shrink-0 overflow-hidden">
                                  <img
                                    src={prod.thumbImage || prod.primaryImage}
                                    alt={prod.name}
                                    loading="lazy"
                                    className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                                      (prod.thumbImage || prod.primaryImage)?.endsWith('.svg')
                                        ? 'object-contain p-1 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]'
                                        : 'object-cover object-center'
                                    }`}
                                  />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-serif-luxury text-sm sm:text-base text-ivory group-hover:text-champagne transition-colors truncate">
                                      {prod.name}
                                    </h4>
                                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-espresso-light/60 text-champagne/80 border border-champagne/20 font-mono shrink-0">
                                      {prod.collection}
                                    </span>
                                  </div>
                                  <p className="text-xs text-ivory-muted/70 truncate font-sans mt-0.5">
                                    {prod.categoryName} • {prod.stone} • {prod.metal}
                                  </p>
                                </div>

                                {/* Price */}
                                <div className="text-right shrink-0">
                                  <span className="font-semibold text-sm sm:text-base text-champagne">
                                    {formatINR(prod.price)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* View all in catalogue CTA */}
                        <div className="mt-4 pt-3.5 border-t border-champagne/15 text-center">
                          <button
                            onClick={handleViewAllResults}
                            className="text-xs uppercase tracking-widest text-champagne hover:text-champagne-light inline-flex items-center gap-2 font-medium"
                          >
                            <span>View All Results for "{query}"</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* No Results Found State */
                      <div className="py-12 text-center text-ivory-muted">
                        <p className="text-base sm:text-lg font-serif-luxury text-ivory mb-1">
                          No matching jewellery found.
                        </p>
                        <p className="text-xs sm:text-sm text-ivory-muted/70">
                          Try another jewellery name, category or collection.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
