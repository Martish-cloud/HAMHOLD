import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, COLLECTIONS } from '../data/products';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw, Check } from 'lucide-react';

export default function ProductListingPage() {
  const { catalogueFilter, setCatalogueFilter } = useShop();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter options state
  const { category, gender, collection, metal, priceRange, sort, searchQuery } = catalogueFilter;

  const handleFilterChange = (key, value) => {
    setCatalogueFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setCatalogueFilter({
      category: 'all',
      gender: 'all',
      collection: 'all',
      metal: 'all',
      priceRange: 'all',
      sort: 'featured',
      searchQuery: '',
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.stone.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Gender
    if (gender !== 'all') {
      result = result.filter((p) => p.gender === gender);
    }

    // Collection
    if (collection !== 'all') {
      result = result.filter((p) => p.collection === collection);
    }

    // Metal
    if (metal !== 'all') {
      result = result.filter((p) => p.metal.toLowerCase().includes(metal.toLowerCase()));
    }

    // Price Range
    if (priceRange === 'under50k') {
      result = result.filter((p) => p.price < 50000);
    } else if (priceRange === '50k-100k') {
      result = result.filter((p) => p.price >= 50000 && p.price <= 100000);
    } else if (priceRange === '100k-200k') {
      result = result.filter((p) => p.price >= 100000 && p.price <= 200000);
    } else if (priceRange === 'above200k') {
      result = result.filter((p) => p.price > 200000);
    }

    // Sorting
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sort === 'bestselling') {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [category, gender, collection, metal, priceRange, sort, searchQuery]);

  const activeFiltersCount = [
    category !== 'all',
    gender !== 'all',
    collection !== 'all',
    metal !== 'all',
    priceRange !== 'all',
    Boolean(searchQuery),
  ].filter(Boolean).length;

  return (
    <div className="py-10 md:py-16 bg-obsidian min-h-screen text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left border-b border-champagne/15 pb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-champagne font-medium block mb-2">
            The Complete Atelier Catalogue
          </span>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-ivory tracking-[0.03em] font-normal">
              ALL JEWELLERY
            </h1>
            <span className="text-xs uppercase tracking-widest text-ivory-muted/70 font-sans">
              Showing {filteredProducts.length} of {PRODUCTS.length} Masterpieces
            </span>
          </div>
          {searchQuery && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/25 text-champagne text-xs">
              <span>Search query: "{searchQuery}"</span>
              <button
                onClick={() => handleFilterChange('searchQuery', '')}
                className="hover:text-ivory"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Desktop Controls Bar & Mobile Sticky Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Quick Category Chips (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
            <button
              onClick={() => handleFilterChange('category', 'all')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                category === 'all'
                  ? 'btn-3d bg-champagne text-obsidian font-semibold shadow-glow'
                  : 'btn-3d-secondary bg-obsidian-surface text-ivory-muted hover:text-champagne border border-champagne/15'
              }`}
            >
              All
            </button>
            {CATEGORIES.slice(0, 7).map((c) => (
              <button
                key={c.id}
                onClick={() => handleFilterChange('category', c.id)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap ${
                  category === c.id
                    ? 'btn-3d bg-champagne text-obsidian font-semibold shadow-glow'
                    : 'btn-3d-secondary bg-obsidian-surface text-ivory-muted hover:text-champagne border border-champagne/15'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort & Reset Actions */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn-3d-secondary lg:hidden flex-1 py-2.5 px-4 rounded-lg bg-obsidian-surface border border-champagne/20 text-ivory text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4 text-champagne" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <span className="hidden sm:inline text-xs uppercase tracking-wider text-ivory-muted whitespace-nowrap">
                Sort:
              </span>
              <select
                value={sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full sm:w-auto bg-obsidian-surface text-ivory text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-champagne/20 focus:outline-none focus:border-champagne"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="hidden lg:flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne hover:text-champagne-light p-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Layout (Desktop Filter Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 bg-obsidian-card/60 border border-champagne/15 rounded-xl p-6 sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-champagne/15">
              <span className="text-xs uppercase tracking-widest font-semibold text-champagne flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Refine Pieces
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] uppercase tracking-wider text-ivory-muted hover:text-champagne"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-semibold block mb-2">
                Gender / Recipient
              </span>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Collections' },
                  { id: 'women', label: "Women's Fine Jewellery" },
                  { id: 'men', label: "Men's Fine Jewellery" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleFilterChange('gender', g.id)}
                    className={`w-full text-left py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                      gender === g.id
                        ? 'bg-champagne/15 text-champagne font-semibold'
                        : 'text-ivory-soft hover:text-champagne hover:bg-champagne/5'
                    }`}
                  >
                    <span>{g.label}</span>
                    {gender === g.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-semibold block mb-2">
                Collection
              </span>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => handleFilterChange('collection', 'all')}
                  className={`w-full text-left py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                    collection === 'all'
                      ? 'bg-champagne/15 text-champagne font-semibold'
                      : 'text-ivory-soft hover:text-champagne hover:bg-champagne/5'
                  }`}
                >
                  <span>All Collections</span>
                  {collection === 'all' && <Check className="w-3.5 h-3.5" />}
                </button>
                {COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleFilterChange('collection', col.id)}
                    className={`w-full text-left py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                      collection === col.id
                        ? 'bg-champagne/15 text-champagne font-semibold'
                        : 'text-ivory-soft hover:text-champagne hover:bg-champagne/5'
                    }`}
                  >
                    <span>{col.name}</span>
                    {collection === col.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Filter */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-semibold block mb-2">
                Precious Metal
              </span>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Metals' },
                  { id: 'yellow gold', label: '18K Yellow Gold' },
                  { id: 'white gold', label: '18K White Gold' },
                  { id: 'rose gold', label: '18K Rose Gold' },
                  { id: 'platinum', label: 'Platinum 950' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleFilterChange('metal', m.id)}
                    className={`w-full text-left py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                      metal === m.id
                        ? 'bg-champagne/15 text-champagne font-semibold'
                        : 'text-ivory-soft hover:text-champagne hover:bg-champagne/5'
                    }`}
                  >
                    <span>{m.label}</span>
                    {metal === m.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Tier */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-semibold block mb-2">
                Price (₹ INR)
              </span>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Price Points' },
                  { id: 'under50k', label: 'Under ₹50,000' },
                  { id: '50k-100k', label: '₹50,000 – ₹1,00,000' },
                  { id: '100k-200k', label: '₹1,00,000 – ₹2,00,000' },
                  { id: 'above200k', label: 'Above ₹2,00,000' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleFilterChange('priceRange', p.id)}
                    className={`w-full text-left py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                      priceRange === p.id
                        ? 'bg-champagne/15 text-champagne font-semibold'
                        : 'text-ivory-soft hover:text-champagne hover:bg-champagne/5'
                    }`}
                  >
                    <span>{p.label}</span>
                    {priceRange === p.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="col-span-1 lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-obsidian-card/40 rounded-2xl border border-champagne/15 p-8 max-w-lg mx-auto">
                <span className="font-serif-luxury text-2xl text-ivory block mb-2 font-normal">
                  No Matching Masterpieces Found
                </span>
                <p className="text-ivory-muted text-xs sm:text-sm font-sans mb-6">
                  Try adjusting your filter parameters or search terms to explore other pieces from our catalogue.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 rounded-full bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-obsidian-surface border-l border-champagne/20 p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-champagne/15 mb-6">
                <span className="text-xs uppercase tracking-widest font-semibold text-champagne">
                  Refine Jewellery
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-ivory hover:text-champagne"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-semibold block mb-2">
                    Category
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <button
                      onClick={() => handleFilterChange('category', 'all')}
                      className={`p-2 rounded text-left ${
                        category === 'all' ? 'bg-champagne text-obsidian font-semibold' : 'bg-obsidian-card text-ivory'
                      }`}
                    >
                      All
                    </button>
                    {CATEGORIES.slice(0, 8).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleFilterChange('category', c.id)}
                        className={`p-2 rounded text-left ${
                          category === c.id ? 'bg-champagne text-obsidian font-semibold' : 'bg-obsidian-card text-ivory'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-semibold block mb-2">
                    Gender
                  </span>
                  <div className="flex gap-2 text-xs">
                    {['all', 'women', 'men'].map((g) => (
                      <button
                        key={g}
                        onClick={() => handleFilterChange('gender', g)}
                        className={`flex-1 py-2 rounded text-center capitalize ${
                          gender === g ? 'bg-champagne text-obsidian font-semibold' : 'bg-obsidian-card text-ivory'
                        }`}
                      >
                        {g === 'all' ? 'All' : g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-semibold block mb-2">
                    Price Range
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: 'under50k', label: 'Under ₹50,000' },
                      { id: '50k-100k', label: '₹50,000 – ₹1,00,000' },
                      { id: '100k-200k', label: '₹1,00,000 – ₹2,00,000' },
                      { id: 'above200k', label: 'Above ₹2,00,000' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleFilterChange('priceRange', p.id)}
                        className={`w-full p-2 rounded text-left ${
                          priceRange === p.id ? 'bg-champagne text-obsidian font-semibold' : 'bg-obsidian-card text-ivory'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-champagne/15 flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-lg border border-champagne/30 text-ivory text-xs uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-lg bg-champagne text-obsidian text-xs uppercase tracking-wider font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
