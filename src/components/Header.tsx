import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, CAR_BRANDS } from '../data/mockData';
import { formatToman, toPersianDigits, normalizePersian } from '../utils/persianUtils';
import { CarSelectorModal } from './CarSelectorModal';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Car, 
  PhoneCall, 
  Truck, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown, 
  Trash2, 
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  Headphones
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    page, 
    setPage, 
    cart, 
    cartCount, 
    cartSubtotal, 
    removeFromCart,
    userVehicle,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedBrand,
    setChatOpen
  } = useApp();

  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isSearchSuggestionsOpen, setIsSearchSuggestionsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchSuggestionsOpen(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search preview items
  const searchResults = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return false;
    const query = normalizePersian(searchQuery);
    return (
      normalizePersian(p.title).includes(query) ||
      normalizePersian(p.brand).includes(query) ||
      normalizePersian(p.partNumber).includes(query) ||
      p.tags.some((t) => normalizePersian(t).includes(query))
    );
  }).slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchSuggestionsOpen(false);
    setPage('catalog');
  };

  const handleSelectSearchResult = (productId: string) => {
    setIsSearchSuggestionsOpen(false);
    setPage('product-detail', { productId });
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-right">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              ضمانت ۱۰۰٪ اصالت فیزیکی و بازگشت ۷ روزه وجه
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              ارسال فوری در تهران و سراسر کشور با تیپاکس
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="tel:02188990000" 
              className="hover:text-amber-400 flex items-center gap-1 font-semibold text-slate-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              مشاوره و پشتیبانی تلفنی: ۰۲۱-۸۸۹۹۰۰۰۰
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setChatOpen(true)}
              className="hover:text-amber-400 text-amber-300 font-bold transition-colors flex items-center gap-1"
            >
              <Headphones className="w-3.5 h-3.5" />
              چت آنلاین با کارشناس
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            
            {/* Mobile Hamburger & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="منوی دسترسی"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div 
                onClick={() => setPage('home')}
                className="flex items-center gap-2.5 cursor-pointer select-none group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1 font-sans">
                    یدک‌<span className="text-amber-600">کالا</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold tracking-wider">
                    فروشگاه تخصصی لوازم یدکی خودرو
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Search Bar */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="جستجوی نام قطعه، پارت‌نامبر، برند (مثلاً: لنت تکستار، تسمه تایم کنتیننتال)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchSuggestionsOpen(true);
                  }}
                  onFocus={() => setIsSearchSuggestionsOpen(true)}
                  className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 border border-slate-200 focus:border-amber-500 rounded-2xl py-2.5 pr-11 pl-20 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all placeholder:text-slate-400"
                />
                <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors shadow-sm"
                >
                  جستجو
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {isSearchSuggestionsOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-fade-in">
                  <div className="text-xs font-bold text-slate-400 mb-2 px-2">
                    نتایج مرتبط با «{searchQuery}»:
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectSearchResult(product.id)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50/70 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                                {product.title}
                              </div>
                              <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                                برند: {product.brand} | پارت‌نامبر: {product.partNumber}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs font-black text-slate-900 whitespace-nowrap mr-2">
                            {formatToman(product.price)}
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                        <button
                          onClick={() => {
                            setIsSearchSuggestionsOpen(false);
                            setPage('catalog');
                          }}
                          className="text-xs font-bold text-amber-600 hover:text-amber-700"
                        >
                          مشاهده همه نتایج جستجو ({toPersianDigits(searchResults.length)}+ کالا)
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500">
                      موردی یافت نشد. می‌توانید با کارشناس فنی چت کنید یا دسته‌بندی‌ها را بررسی کنید.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions: Garage, Order Track, Profile, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Garage Selector Button */}
              <button
                onClick={() => setIsCarModalOpen(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-bold transition-all ${
                  userVehicle
                    ? 'bg-amber-500/10 border-amber-400 text-amber-900 hover:bg-amber-500/20'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title="انتخاب خودرو در گاراژ"
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  userVehicle ? 'bg-amber-500 text-white' : 'bg-slate-300 text-slate-700'
                }`}>
                  <Car className="w-4 h-4" />
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-slate-500 font-normal">گاراژ من:</div>
                  <div className="truncate max-w-[110px] leading-none font-bold mt-0.5">
                    {userVehicle ? userVehicle.modelName : 'انتخاب خودرو'}
                  </div>
                </div>
              </button>

              {/* Order Track Quick Link */}
              <button
                onClick={() => setPage('order-tracking')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-colors ${
                  page === 'order-tracking'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200'
                }`}
              >
                <Truck className="w-4 h-4" />
                رهگیری زنده
              </button>

              {/* Profile Link */}
              <button
                onClick={() => setPage('profile')}
                className={`p-2 sm:px-3 sm:py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  page === 'profile'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
                title="حساب کاربری"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">پروفایل من</span>
              </button>

              {/* Cart Button & Dropdown */}
              <div ref={cartDropdownRef} className="relative">
                <button
                  onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-3 sm:px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                >
                  <div className="relative">
                    <ShoppingBag className="w-4 h-4" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                        {toPersianDigits(cartCount)}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">سبد خرید</span>
                </button>

                {/* Cart Quick Flyout */}
                {isCartDropdownOpen && (
                  <div className="absolute left-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-amber-500" />
                        سبد خرید ({toPersianDigits(cartCount)} کالا)
                      </h4>
                      <button
                        onClick={() => {
                          setIsCartDropdownOpen(false);
                          setPage('cart');
                        }}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                      >
                        نمایش سبد کامل
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    </div>

                    {cart.length > 0 ? (
                      <>
                        <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 py-2">
                          {cart.map((item) => (
                            <div key={item.product.id} className="py-2.5 flex items-center gap-3">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.title}
                                className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-slate-900 line-clamp-1">
                                  {item.product.title}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
                                  <span>{toPersianDigits(item.quantity)} × {formatToman(item.product.price)}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-slate-100 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">مجموع خرید:</span>
                            <span className="font-black text-slate-900">{formatToman(cartSubtotal)}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => {
                                setIsCartDropdownOpen(false);
                                setPage('cart');
                              }}
                              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl transition-colors"
                            >
                              مشاهده سبد
                            </button>
                            <button
                              onClick={() => {
                                setIsCartDropdownOpen(false);
                                setPage('checkout');
                              }}
                              className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-md"
                            >
                              تکمیل خرید
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center text-slate-500">
                        <ShoppingBag className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                        <p className="text-xs">سبد خرید شما در حال حاضر خالی است.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="جستجوی قطعه یا برند..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 text-slate-900 rounded-xl py-2 pr-9 pl-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="bg-slate-50 border-t border-slate-100 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              
              {/* Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button
                  onClick={() => setPage('catalog')}
                  className="flex items-center gap-2 py-3 px-4 text-xs font-black text-slate-900 hover:text-amber-700 transition-colors bg-amber-400/20 rounded-t-xl"
                >
                  <Menu className="w-4 h-4 text-amber-700" />
                  دسته‌بندی کلیه قطعات
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Mega Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div className="absolute right-0 top-full w-[650px] bg-white rounded-b-3xl rounded-tl-3xl shadow-2xl border border-slate-200/80 p-5 grid grid-cols-2 gap-4 z-50">
                    <div>
                      <h5 className="font-bold text-xs text-slate-400 mb-3 px-2">دسته‌بندی‌های اصلی قطعات:</h5>
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setPage('catalog', { categoryId: cat.id });
                              setIsMegaMenuOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors group"
                          >
                            <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700">
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                              {toPersianDigits(cat.itemCount)} کالا
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-r border-slate-100 pr-4">
                      <h5 className="font-bold text-xs text-slate-400 mb-3 px-2">بر اساس برند خودرو:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {CAR_BRANDS.map((brand) => (
                          <div
                            key={brand.id}
                            onClick={() => {
                              setSelectedBrand(brand.id);
                              setPage('catalog', { brandId: brand.id });
                              setIsMegaMenuOpen(false);
                            }}
                            className="p-2.5 rounded-xl border border-slate-100 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition-colors flex items-center gap-2"
                          >
                            <Car className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-slate-800">{brand.name}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
                        نیاز به راهنمایی در انتخاب پارت‌نامبر دارید؟ کارشناسان ما ۲۴ ساعته آماده پاسخگویی هستند.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Nav Items */}
              <button
                onClick={() => setPage('home')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'home' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                صفحه اصلی
              </button>

              <button
                onClick={() => setPage('catalog')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'catalog' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                کاتالوگ و فروشگاه
              </button>

              <button
                onClick={() => setPage('order-tracking')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'order-tracking' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                رهگیری زنده سفارش
              </button>

              <button
                onClick={() => setPage('order-history')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'order-history' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                تاریخچه سفارشات
              </button>

              <button
                onClick={() => setPage('blog')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'blog' || page === 'blog-detail' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                مجله فنی خودرو
              </button>

              <button
                onClick={() => setPage('faq')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'faq' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                سوالات متداول
              </button>

              <button
                onClick={() => setPage('about')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'about' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                درباره ما
              </button>

              <button
                onClick={() => setPage('contact')}
                className={`py-3 px-3.5 text-xs font-bold transition-colors ${
                  page === 'contact' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                تماس با ما
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-rose-600">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              تخفیف‌های ویژه امروز تا ۱۵٪
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-5 z-10 animate-slide-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold">
                    <Car className="w-5 h-5" />
                  </div>
                  <span className="font-black text-lg text-slate-900">یدک‌کالا</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Garage CTA in Mobile */}
              <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="text-xs text-amber-900 font-bold mb-1">گاراژ هوشمند:</div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCarModalOpen(true);
                  }}
                  className="w-full bg-amber-500 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Car className="w-4 h-4" />
                  {userVehicle ? userVehicle.modelName : 'انتخاب خودروی من'}
                </button>
              </div>

              {/* Mobile Links */}
              <div className="mt-5 space-y-1">
                {[
                  { name: 'صفحه اصلی', target: 'home', icon: Car },
                  { name: 'کاتالوگ و فروشگاه قطعات', target: 'catalog', icon: ShoppingBag },
                  { name: 'رهگیری زنده سفارش', target: 'order-tracking', icon: Truck },
                  { name: 'تاریخچه سفارشات', target: 'order-history', icon: FileText },
                  { name: 'پروفایل و آدرس‌ها', target: 'profile', icon: User },
                  { name: 'مجله فنی خودرو', target: 'blog', icon: Compass },
                  { name: 'سوالات متداول (FAQ)', target: 'faq', icon: HelpCircle },
                  { name: 'درباره ما', target: 'about', icon: ShieldCheck },
                  { name: 'تماس با ما', target: 'contact', icon: PhoneCall },
                ].map((item) => (
                  <button
                    key={item.target}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setPage(item.target as any);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-right transition-colors ${
                      page === item.target ? 'bg-amber-500 text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500" />
                <span>پشتیبانی: ۰۲۱-۸۸۹۹۰۰۰۰</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>شنبه تا پنج‌شنبه ۸ الی ۲۲</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Selector Modal */}
      <CarSelectorModal
        isOpen={isCarModalOpen}
        onClose={() => setIsCarModalOpen(false)}
      />
    </>
  );
};
