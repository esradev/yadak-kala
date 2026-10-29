import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, INITIAL_REVIEWS } from '../data/mockData';
import { ProductReview, ProductQA } from '../types';
import { formatToman, toPersianDigits } from '../utils/persianUtils';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Minus, 
  ChevronLeft,
  ThumbsUp,
  MessageSquare,
  Wrench,
  Car,
  FileCheck,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    setPage, 
    addToCart, 
    userVehicle, 
    isCarCompatible, 
    toggleFavorite, 
    isFavorite,
    showToast 
  } = useApp();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedWarranty, setSelectedWarranty] = useState(product.warranty);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'compatibility' | 'reviews' | 'qa'>('specs');

  // Reviews state
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newPro, setNewPro] = useState('');
  const [prosList, setProsList] = useState<string[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Q&A state
  const [qaList, setQaList] = useState<ProductQA[]>([
    {
      id: 'qa-1',
      question: 'آیا برای نصب این تسمه تایم نیازی به تعویض واترپمپ هم هست؟',
      askerName: 'کیوان رحیمی',
      date: '۳ روز پیش',
      answer: 'سلام و احترام. طبق دستورالعمل پژو، بهتر است هر دو بار تعویض تسمه تایم یا در صورتی که واترپمپ لقی یا نشتی آب دارد، همزمان با کیت تسمه تایم تعویض گردد تا نیاز به باز و بست مجدد موتور نباشد.',
      answeredBy: 'مهندس قاسمی (کارشناس ارشد مکانیک)',
      answerDate: '۲ روز پیش'
    },
    {
      id: 'qa-2',
      question: 'کد اصالت این قطعه در کدام سامانه قابل استعلام است؟',
      askerName: 'حامد صادقی',
      date: '۱ هفته پیش',
      answer: 'شناسه ۱۶ رقمی اصالت کالا را می‌توانید به سامانه پیامکی ۱۰۰۰۴۳۷۰ (سامانه جامع تجارت و ایساکو) ارسال نمایید تا بلافاصله پیامک تاییدیه کارخانه سازنده را دریافت کنید.',
      answeredBy: 'پشتیبانی فنی یدک‌کالا',
      answerDate: '۶ روز پیش'
    }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  const compatible = isCarCompatible(product, userVehicle);
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWarranty);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedWarranty);
    setPage('cart');
  };

  const handleAddPro = () => {
    if (newPro.trim()) {
      setProsList([...prosList, newPro.trim()]);
      setNewPro('');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      showToast('لطفاً متن نظر خود را وارد کنید.', 'error');
      return;
    }

    const reviewItem: ProductReview = {
      id: `rev-${Date.now()}`,
      userId: 'user-current',
      userName: 'کاربر یدک‌کالا',
      rating: newRating,
      date: 'هم‌اکنون',
      carModelUsed: userVehicle?.modelName || 'ثبت شده در گاراژ',
      title: newTitle || 'تجربه خرید قطعه',
      comment: newComment,
      pros: prosList.length > 0 ? prosList : undefined,
      isVerifiedBuyer: true,
      likesCount: 0
    };

    setReviews([reviewItem, ...reviews]);
    showToast('نظر شما با موفقیت ثبت شد و پس از بازبینی تایید می‌گردد.', 'success');
    setNewComment('');
    setNewTitle('');
    setProsList([]);
    setShowReviewForm(false);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newQa: ProductQA = {
      id: `qa-${Date.now()}`,
      question: newQuestion.trim(),
      askerName: 'کاربر مهمان',
      date: 'هم‌اکنون',
      answer: 'پرسش شما دریافت شد و کارشناسان فنی ظرف ۲ ساعت پاسخ را ثبت خواهند کرد.',
      answeredBy: 'در انتظار پاسخ کارشناس',
      answerDate: 'هم‌اکنون'
    };

    setQaList([newQa, ...qaList]);
    setNewQuestion('');
    showToast('پرسش شما با موفقیت ثبت شد.', 'success');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
        <button onClick={() => setPage('home')} className="hover:text-amber-600">خانه</button>
        <ChevronLeft className="w-3.5 h-3.5" />
        <button onClick={() => setPage('catalog')} className="hover:text-amber-600">فروشگاه قطعات</button>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-bold truncate">{product.title}</span>
      </nav>

      {/* Main Product Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.discountPercent && product.discountPercent > 0 ? (
              <span className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                {toPersianDigits(product.discountPercent)}٪ تخفیف
              </span>
            ) : null}

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:text-rose-500 shadow-md transition-colors"
                title="علاقه‌مندی"
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('لینک محصول در کلیپ‌بورد کپی شد.', 'info');
                }}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:text-amber-600 shadow-md transition-colors"
                title="اشتراک‌گذاری"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImageIndex === idx ? 'border-amber-500 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>ضمانت اصالت ۱۰۰٪ فیزیکی و تاییدیه بارکد کارخانه</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>۷ روز مهلت تست و امکان تعویض و بازگشت وجه</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>ارسال فوری با بسته‌بندی ضدضربه مخصوص قطعات حساس</span>
            </div>
          </div>
        </div>

        {/* Center & Right Col: Details & Purchasing */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                برند: {product.brand}
              </span>
              <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-lg font-mono">
                کد فنی: {product.partNumber}
              </span>
              <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                اصالت: {product.brandOrigin}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900">{toPersianDigits(product.rating)}</span>
                <span className="text-slate-400">از ۵</span>
              </div>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('reviews')}
                className="hover:text-amber-600 font-semibold underline underline-offset-4"
              >
                {toPersianDigits(product.reviewsCount)} نظر خریداران
              </button>
              <span>•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                {product.inStock ? `موجود در انبار (${toPersianDigits(product.stockCount)} عدد)` : 'ناموجود'}
              </span>
            </div>
          </div>

          {/* Vehicle Compatibility Banner */}
          <div className="p-4 rounded-2xl border transition-all">
            {userVehicle ? (
              compatible ? (
                <div className="flex items-start gap-3 bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">
                      سازگار با خودروی شما ({userVehicle.modelName})
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">
                      این قطعه دقیقاً با مشخصات شاسی، سال ساخت ({userVehicle.year}) و موتور خودروی شما مطابقت دارد.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 bg-rose-50 text-rose-900 p-3 rounded-xl border border-rose-200">
                  <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">
                      هشدار عدم سازگاری با {userVehicle.modelName}
                    </div>
                    <div className="text-[11px] text-rose-700 mt-0.5">
                      طبق بررسی بانک اطلاعاتی، این قطعه برای اتومبیل شما مناسب نیست. جهت بررسی مدل مناسب با پشتیبانی فنی چت کنید.
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Car className="w-4 h-4 text-amber-500" />
                  <span>آیا این قطعه برای ماشین شما مناسب است؟</span>
                </div>
                <button
                  onClick={() => setPage('catalog')}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700"
                >
                  انتخاب خودرو در گاراژ
                </button>
              </div>
            )}
          </div>

          {/* Warranty Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              گارانتی و خدمات پس از فروش:
            </label>
            <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-slate-900">{product.warranty}</span>
              </div>
              <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                رایگان
              </span>
            </div>
          </div>

          {/* Price and Add to Cart Section */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">قیمت نهایی برای مشتری:</span>
              <div className="text-left">
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-xs text-slate-400 line-through">
                    {formatToman(product.originalPrice)}
                  </div>
                )}
                <div className="text-2xl font-black text-amber-400">
                  {formatToman(product.price * quantity)}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              
              {/* Quantity Counter */}
              <div className="flex items-center justify-between bg-slate-800 rounded-2xl p-1.5 border border-slate-700 w-full sm:w-36">
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="font-black text-base px-3">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-3.5 px-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                افزودن به سبد خرید
              </button>

              {/* Buy Now Direct */}
              <button
                onClick={handleBuyNow}
                className="bg-white hover:bg-slate-100 active:scale-95 text-slate-950 font-bold py-3.5 px-5 rounded-2xl transition-all text-xs whitespace-nowrap"
              >
                تسویه فوری
              </button>

            </div>
          </div>

          {/* Quick Specifications preview */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 mb-2">مشخصات کلیدی قطعه:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {product.technicalSpecs.slice(0, 4).map((spec, i) => (
                <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">{spec.label}:</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Navigation: Specs / Description / Compatibility / Reviews / Q&A */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Tab Header Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'specs', label: 'مشخصات فنی', icon: Wrench },
            { id: 'desc', label: 'توضیحات تخصصی', icon: FileCheck },
            { id: 'compatibility', label: 'خودروهای سازگار', icon: Car },
            { id: 'reviews', label: `نظرات خریداران (${toPersianDigits(reviews.length)})`, icon: Star },
            { id: 'qa', label: `پرسش و پاسخ (${toPersianDigits(qaList.length)})`, icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-bold text-slate-900 text-sm">مشخصات فنی و استانداردها</h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {product.technicalSpecs.map((spec, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs">
                  <div className="font-bold text-slate-500">{spec.label}</div>
                  <div className="sm:col-span-2 font-medium text-slate-900 mt-1 sm:mt-0">{spec.value}</div>
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs bg-slate-50/50">
                <div className="font-bold text-slate-500">وزن مرسوله</div>
                <div className="sm:col-span-2 font-medium text-slate-900">{toPersianDigits(product.weightKg || 1)} کیلوگرم</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Description */}
        {activeTab === 'desc' && (
          <div className="space-y-4 animate-fade-in text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-base">بررسی تخصصی و راهنمای نصب</h3>
            <p className="text-justify">{product.description}</p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 mt-4">
              <h4 className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                توصیه کارشناس مکانیک برای تعویض این قطعه:
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                پیشنهاد می‌شود قبل از جاگذاری قطعه جدید، محل نشیمنگاه و قطعات مجاور به دقت تمیزکاری و گریس‌کاری گردند تا عملکرد قطعه با بالاترین راندمان و بدون نویز یا لرزش حفظ شود.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Compatibility Table */}
        {activeTab === 'compatibility' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-bold text-slate-900 text-sm">لیست خودروهای سازگار با این پارت‌نامبر</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.compatibleCars.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{c.modelName}</div>
                      <div className="text-[11px] text-slate-500">سال ساخت: {c.yearRange}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    سازگاری کامل
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Reviews Summary & Write CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-slate-900">{toPersianDigits(product.rating)}</div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    بر اساس {toPersianDigits(reviews.length)} دیدگاه ثبت شده خریداران
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                {showReviewForm ? 'بستن فرم نظر' : 'ثبت نظر و تجربه خرید شما'}
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 animate-fade-in">
                <h4 className="font-bold text-slate-900 text-sm">ثبت تجربه خرید برای این کالا:</h4>
                
                {/* Star rating selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">امتیاز شما:</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">عنوان نظر:</label>
                  <input
                    type="text"
                    placeholder="مثال: کیفیت فوق‌العاده و بدون صدا..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">متن نظر شما:</label>
                  <textarea
                    rows={3}
                    placeholder="تجربه نصب، کیفیت ساخت، سازگاری با خودرو..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Pros Tag */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نقاط قوت (اختیاری):</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="مثال: نرمی پدال، بسته‌بندی عالی"
                      value={newPro}
                      onChange={(e) => setNewPro(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddPro}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl"
                    >
                      افزودن
                    </button>
                  </div>
                  {prosList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {prosList.map((p, idx) => (
                        <span key={idx} className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg">
                          + {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md transition-colors"
                >
                  ارسال و تایید دیدگاه
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                        {rev.userName[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                          {rev.userName}
                          {rev.isVerifiedBuyer && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              خریدار تایید شده
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {rev.carModelUsed} • {rev.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h5 className="font-bold text-slate-900 text-xs">{rev.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                  {rev.pros && rev.pros.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {rev.pros.map((pro, idx) => (
                        <span key={idx} className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          + {pro}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 5: Q&A */}
        {activeTab === 'qa' && (
          <div className="space-y-6 animate-fade-in">
            {/* Ask form */}
            <form onSubmit={handleAskQuestion} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="سوال فنی خود را درباره این قطعه بپرسید..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
              >
                ثبت سوال
              </button>
            </form>

            <div className="space-y-4">
              {qaList.map((qa) => (
                <div key={qa.id} className="p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                      ؟
                    </span>
                    <span>{qa.question}</span>
                    <span className="text-[10px] text-slate-400 mr-auto">{qa.askerName} ({qa.date})</span>
                  </div>

                  {qa.answer && (
                    <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 text-xs text-slate-700 space-y-1">
                      <div className="font-bold text-amber-900 text-[11px] flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-amber-700" />
                        پاسخ {qa.answeredBy}:
                      </div>
                      <p className="leading-relaxed">{qa.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900">
            قطعات مکمل و پیشنهادی مرتبط
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
