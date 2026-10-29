import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, CAR_BRANDS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { toPersianDigits, formatToman, normalizePersian } from '../utils/persianUtils';
import { 
  Filter, 
  Search, 
  Grid, 
  List, 
  Check, 
  X, 
  Car, 
  Sparkles, 
  SlidersHorizontal, 
  ChevronDown,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedBrand, 
    setSelectedBrand,
    userVehicle,
    isCarCompatible
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [onlyCompatible, setOnlyCompatible] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyGenuine, setOnlyGenuine] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'cheapest' | 'expensive' | 'newest' | 'discount'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(6000000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Filter and sort
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search text query
      if (searchQuery.trim()) {
        const q = normalizePersian(searchQuery);
        const matchTitle = normalizePersian(product.title).includes(q);
        const matchBrand = normalizePersian(product.brand).includes(q);
        const matchPartNo = normalizePersian(product.partNumber).includes(q);
        const matchTag = product.tags.some((t) => normalizePersian(t).includes(q));
        if (!matchTitle && !matchBrand && !matchPartNo && !matchTag) return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Car Brand filter
      if (selectedBrand) {
        const hasBrand = product.compatibleCars.some((c) => c.brandId === selectedBrand);
        if (!hasBrand) return false;
      }

      // Garage Vehicle compatibility filter
      if (onlyCompatible && userVehicle) {
        if (!isCarCompatible(product, userVehicle)) return false;
      }

      // In stock
      if (onlyInStock && (!product.inStock || product.stockCount <= 0)) {
        return false;
      }

      // Genuine
      if (onlyGenuine && !product.isGenuine) {
        return false;
      }

      // Tag filter
      if (selectedTag && !product.tags.includes(selectedTag)) {
        return false;
      }

      // Price range
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.price - b.price;
      if (sortBy === 'expensive') return b.price - a.price;
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating); // popular
    });
  }, [
    searchQuery, 
    selectedCategory, 
    selectedBrand, 
    onlyCompatible, 
    userVehicle, 
    isCarCompatible, 
    onlyInStock, 
    onlyGenuine, 
    selectedTag, 
    maxPrice, 
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrand(null);
    setOnlyCompatible(false);
    setOnlyInStock(false);
    setOnlyGenuine(false);
    setSelectedTag(null);
    setMaxPrice(6000000);
    setSortBy('popular');
  };

  const activeFiltersCount = [
    searchQuery.trim(),
    selectedCategory,
    selectedBrand,
    onlyCompatible,
    onlyInStock,
    onlyGenuine,
    selectedTag,
    maxPrice < 6000000
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            کاتالوگ و فروشگاه تخصصی لوازم یدکی
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مجموعه کامل قطعات یدکی استاندارد با ضمانت اصالت و سلامت فیزیکی
          </p>
        </div>

        {/* Garage Compatibility Notice */}
        {userVehicle && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-4 py-2 rounded-2xl">
            <Car className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="text-xs text-amber-900">
              خودروی فعال شما: <strong className="font-bold">{userVehicle.modelName}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar Filters + Products Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-6">
            
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                فیلترهای پیشرفته
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  حذف فیلترها
                </button>
              )}
            </div>

            {/* Garage Compatible Toggle */}
            {userVehicle && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-emerald-900">
                    فقط قطعات سازگار با خودرو من
                  </span>
                  <input
                    type="checkbox"
                    checked={onlyCompatible}
                    onChange={(e) => setOnlyCompatible(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
                <div className="text-[10px] text-emerald-700">
                  {userVehicle.modelName}
                </div>
              </div>
            )}

            {/* Categories Filter */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-3">دسته‌بندی قطعات:</h4>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-right p-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                    selectedCategory === null ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>همه دسته‌بندی‌ها</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">
                    {toPersianDigits(PRODUCTS.length)}
                  </span>
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                    className={`w-full text-right p-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id ? 'bg-amber-500 text-white font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {toPersianDigits(cat.itemCount)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Car Brand Filter */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-3">برند سازنده خودرو:</h4>
              <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`w-full text-right p-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                    selectedBrand === null ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>همه برندها</span>
                </button>
                {CAR_BRANDS.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id === selectedBrand ? null : brand.id)}
                    className={`w-full text-right p-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      selectedBrand === brand.id ? 'bg-amber-500 text-white font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{brand.name}</span>
                    <span className="text-[10px] font-sans opacity-75">{brand.englishName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                <span>حداکثر قیمت:</span>
                <span className="text-amber-600">{formatToman(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={300000}
                max={6000000}
                step={100000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>۳۰۰ هزار تومان</span>
                <span>۶ میلیون تومان</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800">
                <span>فقط کالاهای موجود در انبار</span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800">
                <span>فقط قطعات اصل شرکتی و OEM</span>
                <input
                  type="checkbox"
                  checked={onlyGenuine}
                  onChange={(e) => setOnlyGenuine(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                />
              </label>
            </div>

            {/* Tags Cloud */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-2.5">برچسب‌های پرتکرار:</h4>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      selectedTag === tag
                        ? 'bg-amber-500 text-white border-amber-500 font-bold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Products Grid / Listing Area */}
        <main className="lg:col-span-9 space-y-4">
          
          {/* Top Control Bar: Search Input, Sorting & View Toggle */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Mobile Filter Button */}
            <div className="flex items-center justify-between lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Filter className="w-4 h-4" />
                فیلترها {activeFiltersCount > 0 && `(${toPersianDigits(activeFiltersCount)})`}
              </button>

              <div className="text-xs text-slate-500">
                {toPersianDigits(filteredProducts.length)} کالا
              </div>
            </div>

            {/* Sorting Tabs */}
            <div className="flex items-center gap-1 text-xs overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              <span className="text-slate-400 font-bold ml-1 hidden md:inline">مرتب‌سازی:</span>
              
              {[
                { id: 'popular', label: 'محبوب‌ترین' },
                { id: 'cheapest', label: 'ارزان‌ترین' },
                { id: 'expensive', label: 'گران‌ترین' },
                { id: 'discount', label: 'بیشترین تخفیف' },
                { id: 'newest', label: 'جدیدترین' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSortBy(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    sortBy === tab.id
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode & Item Count */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-slate-500">
                نمایش <strong>{toPersianDigits(filteredProducts.length)}</strong> کالا
              </span>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-amber-600' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  aria-label="نمایش شبکه‌ای"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-amber-600' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  aria-label="نمایش لیستی"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400">فیلترهای فعال:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-xs bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg">
                  جستجو: «{searchQuery}»
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setSearchQuery('')} />
                </span>
              )}

              {selectedCategory && (
                <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg">
                  دسته: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setSelectedCategory(null)} />
                </span>
              )}

              {selectedBrand && (
                <span className="inline-flex items-center gap-1 text-xs bg-sky-100 text-sky-800 px-2.5 py-1 rounded-lg">
                  خودرو: {CAR_BRANDS.find((b) => b.id === selectedBrand)?.name}
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setSelectedBrand(null)} />
                </span>
              )}

              {onlyCompatible && (
                <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">
                  سازگار با گاراژ من
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setOnlyCompatible(false)} />
                </span>
              )}

              {selectedTag && (
                <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg">
                  برچسب: #{selectedTag}
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setSelectedTag(null)} />
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:underline font-bold mr-2"
              >
                پاک کردن همه
              </button>
            </div>
          )}

          {/* Product Items */}
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-3'
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout={viewMode} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                هیچ قطعه‌ای مطابق با فیلترهای انتخابی یافت نشد!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                می‌توانید فیلترها را ریست کنید یا با ارسال مشخصات و شماره شاسی خودرو به کارشناسان فنی در چت آنلاین، قطعه مد نظرتان را استعلام نمایید.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-md"
              >
                حذف همه فیلترها
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-5 z-10 animate-slide-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-amber-500" />
                  فیلترهای کاتالوگ
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                {userVehicle && (
                  <label className="flex items-center justify-between text-xs font-bold text-emerald-900 bg-emerald-50 p-2.5 rounded-xl">
                    <span>فقط سازگار با {userVehicle.modelName}</span>
                    <input
                      type="checkbox"
                      checked={onlyCompatible}
                      onChange={(e) => setOnlyCompatible(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>
                )}
                <label className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>فقط کالاهای موجود</span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                </label>
                <label className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>فقط قطعات اصل و شرکتی</span>
                  <input
                    type="checkbox"
                    checked={onlyGenuine}
                    onChange={(e) => setOnlyGenuine(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                </label>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                  <span>سقف قیمت:</span>
                  <span className="text-amber-600">{formatToman(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={300000}
                  max={6000000}
                  step={100000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2">دسته‌بندی:</h4>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                      className={`w-full text-right p-2 rounded-xl text-xs flex items-center justify-between ${
                        selectedCategory === cat.id ? 'bg-amber-500 text-white font-bold' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="w-1/2 bg-slate-100 text-slate-700 text-xs font-bold py-3 rounded-xl"
              >
                پاک کردن
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 bg-amber-500 text-white text-xs font-bold py-3 rounded-xl shadow-md"
              >
                اعمال فیلترها
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
