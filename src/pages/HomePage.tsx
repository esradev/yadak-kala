import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, CAR_BRANDS, BLOG_POSTS, INITIAL_REVIEWS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { toPersianDigits, formatToman } from '../utils/persianUtils';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Car, 
  Sparkles, 
  ChevronLeft, 
  ArrowLeft, 
  Search, 
  Star, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock,
  Compass,
  Wrench,
  Layers,
  Droplets,
  Disc,
  Cog,
  Zap,
  Sun,
  Wind
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    setPage, 
    userVehicle, 
    setSelectedCategory, 
    setSelectedBrand, 
    searchQuery, 
    setSearchQuery,
    setTrackingQueryCode
  } = useApp();

  const [heroSearch, setHeroSearch] = useState('');
  const [quickTrackCode, setQuickTrackCode] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch);
      setPage('catalog');
    }
  };

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackCode.trim()) {
      setTrackingQueryCode(quickTrackCode.trim());
      setPage('order-tracking', { trackingCode: quickTrackCode.trim() });
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Disc': return <Disc className="w-7 h-7 text-amber-500" />;
      case 'Cog': return <Cog className="w-7 h-7 text-amber-500" />;
      case 'Wrench': return <Wrench className="w-7 h-7 text-amber-500" />;
      case 'Droplets': return <Droplets className="w-7 h-7 text-amber-500" />;
      case 'Zap': return <Zap className="w-7 h-7 text-amber-500" />;
      case 'Layers': return <Layers className="w-7 h-7 text-amber-500" />;
      case 'Sun': return <Sun className="w-7 h-7 text-amber-500" />;
      case 'Wind': return <Wind className="w-7 h-7 text-amber-500" />;
      default: return <Wrench className="w-7 h-7 text-amber-500" />;
    }
  };

  const discountedProducts = PRODUCTS.filter((p) => p.specialOffer || (p.discountPercent && p.discountPercent > 0));
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl mx-4 lg:mx-auto max-w-7xl mt-4 p-6 sm:p-10 lg:p-14 shadow-2xl border border-slate-800">
        {/* Decorative Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              مرجع تخصصی قطعات یدکی اصل ایران خودرو، سایپا و خودروهای وارداتی
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
              خرید مطمئن <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">لوازم یدکی اصل</span> با ارسال فوری و رهگیری زنده
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
              تضمین قطعی اصالت، قیمت رقابتی، مشاوره فنی رایگان و امکان تعویض و بازگشت ۷ روزه کالا. قطعه متناسب با اتومبیل خود را تنها با چند کلیک پیدا کنید.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="نام قطعه، مدل ماشین یا شماره فنی (مثال: لنت تکستار، تسمه ۲۰۶)..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-400 rounded-2xl py-3.5 pr-11 pl-4 text-sm border border-white/20 focus:border-amber-400 focus:outline-none transition-all"
                />
                <Search className="w-5 h-5 text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 whitespace-nowrap text-sm"
              >
                جستجوی قطعه
                <ArrowLeft className="w-4 h-4" />
              </button>
            </form>

            {/* Trust Pills */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ضمانت اصالت با هولوگرام</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>تحویل ۲ تا ۴ ساعته در تهران</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>گارانتی تعویض کتبی</span>
              </div>
            </div>
          </div>

          {/* Hero Garage Widget / Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">گاراژ هوشمند قطعات</h3>
                    <p className="text-[11px] text-slate-400">فیلتر دقیق لوازم خودروی شما</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  سازگاری قطعی
                </span>
              </div>

              {userVehicle ? (
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <div className="text-xs text-slate-400">خودروی فعال شما در سیستم:</div>
                  <div className="text-base font-black text-amber-400 mt-1 flex items-center gap-2">
                    {userVehicle.modelName}
                    <span className="text-xs text-slate-300 font-normal">({userVehicle.year})</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    تمامی محصولات فروشگاه بر اساس موتور و شاسی خودروی شما فیلتر شده‌اند.
                  </p>
                  <button
                    onClick={() => setPage('catalog')}
                    className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    مشاهده قطعات سازگار با ماشین من
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center space-y-3">
                  <p className="text-xs text-slate-300">
                    با انتخاب مدل خودرو، از خرید اشتباه قطعات جلوگیری کنید و فقط کالاهای ۱۰۰٪ سازگار را ببینید.
                  </p>
                  <button
                    onClick={() => setPage('catalog')}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Car className="w-4 h-4" />
                    انتخاب مدل خودرو در گاراژ
                  </button>
                </div>
              )}

              {/* Fast Track Input in Hero */}
              <div className="pt-3 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-400" />
                  رهگیری زنده موقعیت سفارش:
                </div>
                <form onSubmit={handleQuickTrack} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="کد پیگیری یا شماره سفارش (مثال: YK-849201)..."
                    value={quickTrackCode}
                    onChange={(e) => setQuickTrackCode(e.target.value)}
                    className="flex-1 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                  />
                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
                  >
                    رهگیری
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Car Brands Quick Selector */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              انتخاب قطعات بر اساس برند خودرو
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              قطعات شرکتی و وارداتی اصل برای پرطرفدارترین برندهای بازار ایران
            </p>
          </div>
          <button
            onClick={() => setPage('catalog')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            مشاهده همه برندها
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CAR_BRANDS.map((brand) => (
            <div
              key={brand.id}
              onClick={() => {
                setSelectedBrand(brand.id);
                setPage('catalog', { brandId: brand.id });
              }}
              className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-amber-50 flex items-center justify-center p-2 mb-2 transition-colors">
                <Car className="w-8 h-8 text-slate-600 group-hover:text-amber-600" />
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-amber-700">
                {brand.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{brand.englishName}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Deals Banner & Carousel */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <Flame className="w-7 h-7 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  پیشنهادهای شگفت‌انگیز و تخفیف‌دار
                  <span className="text-xs font-bold bg-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                    محدود
                  </span>
                </h3>
                <p className="text-xs text-rose-100 mt-0.5">
                  تخفیف ویژه روی کیت‌های تسمه تایم، لنت‌های ترمز و دیسک و صفحه کلاچ
                </p>
              </div>
            </div>

            <button
              onClick={() => setPage('catalog')}
              className="bg-white hover:bg-slate-100 text-rose-700 font-bold px-4 py-2.5 rounded-2xl text-xs transition-colors shadow-md flex items-center gap-1"
            >
              مشاهده تمام تخفیف‌ها
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {discountedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-black text-slate-900">
            دسته‌بندی تخصصی قطعات خودرو
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            دسترسی سریع به سیستم‌های فنی و قطعات مصرفی خودروهای داخلی و خارجی
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setPage('catalog', { categoryId: cat.id });
              }}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-colors">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {toPersianDigits(cat.itemCount)} قطعه
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>مشاهده قطعات</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                پرفروش‌ترین قطعات یدکی
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              محبوب‌ترین قطعات با بالاترین رضایت مشتریان و مکانیک‌های متخصص
            </p>
          </div>

          <button
            onClick={() => setPage('catalog')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Real-time Order Tracking Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                سامانه زنده و بلادرنگ
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                سفارش شما کجاست؟ رهگیری لحظه‌ای از انبار تا درب منزل
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                با وارد کردن شماره سفارش یا کد رهگیری پستی/تیپاکس، موقعیت بسته، نام سفیر، وضعیت بسته‌بندی در انبار و زمان تقریبی رسیدن را مشاهده کنید.
              </p>
            </div>
            <div className="lg:col-span-4">
              <button
                onClick={() => setPage('order-tracking')}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-colors shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
              >
                <Truck className="w-5 h-5" />
                ورود به سامانه رهگیری زنده
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-black text-slate-900">
            تجربه خریداران و مکانیک‌های معتمد
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            نظرات واقعی خریداران قطعات خودرو از سراسر ایران
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                      {rev.userName[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{rev.userName}</div>
                      <div className="text-[10px] text-slate-400">{rev.carModelUsed}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1.5">{rev.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  خریدار تایید شده
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Technical Blog Articles */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-500" />
              مجله تخصصی و راهنمای فنی نگهداری خودرو
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              آموزش‌های کاربردی مکانیک، بررسی علائم خرابی و راهنمای تعویض قطعات
            </p>
          </div>

          <button
            onClick={() => setPage('blog')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            مشاهده همه مقالات
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setPage('blog-detail', { blogId: post.id })}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {toPersianDigits(post.readingTimeMinutes)} دقیقه مطالعه
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>مطالعه مقاله و قطعات مرتبط</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
