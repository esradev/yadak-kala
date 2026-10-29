import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatToman, toPersianDigits } from '../utils/persianUtils';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Ticket, 
  Check, 
  X, 
  ChevronLeft,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    setPage,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const FREE_SHIPPING_THRESHOLD = 2000000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const estimatedShippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 75000;
  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + estimatedShippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">سبد خرید شما خالی است!</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          می‌توانید با مراجعه به بخش کاتالوگ یا انتخاب مدل خودروی خود در گاراژ، قطعات مورد نیاز را به سبد خرید اضافه کنید.
        </p>
        <button
          onClick={() => setPage('catalog')}
          className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2 text-sm"
        >
          مشاهده کاتالوگ قطعات
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-amber-500" />
            سبد خرید شما ({toPersianDigits(cartCount)} قلم کالا)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            بررسی و ویرایش قطعات انتخابی قبل از ورود به درگاه پرداخت
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          خالی کردن سبد
        </button>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-amber-950">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600" />
            {remainingForFreeShipping > 0 ? (
              <span>
                تنها <strong>{formatToman(remainingForFreeShipping)}</strong> دیگر خرید کنید تا ارسال برای شما <strong>رایگان</strong> شود!
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                تبریک! سفارش شما مشمول ارسال رایگان شد.
              </span>
            )}
          </div>
          <span>{toPersianDigits(progressPercent)}٪</span>
        </div>

        <div className="w-full bg-amber-200/70 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-l from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Items List & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 group"
            >
              {/* Product Image */}
              <div 
                onClick={() => setPage('product-detail', { productId: item.product.id })}
                className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 cursor-pointer border border-slate-100"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 text-center sm:text-right space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                    {item.product.brand}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.product.partNumber}
                  </span>
                </div>

                <h3 
                  onClick={() => setPage('product-detail', { productId: item.product.id })}
                  className="font-bold text-slate-900 text-sm hover:text-amber-600 cursor-pointer transition-colors line-clamp-1"
                >
                  {item.product.title}
                </h3>

                <div className="text-[11px] text-slate-500 flex items-center justify-center sm:justify-start gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.selectedWarranty || item.product.warranty}</span>
                </div>
              </div>

              {/* Price & Quantity Operations */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-left sm:text-left">
                  <div className="text-xs text-slate-400">
                    قیمت واحد: {formatToman(item.product.price)}
                  </div>
                  <div className="text-base font-black text-slate-900">
                    {formatToman(item.product.price * item.quantity)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs transition-colors"
                      title="افزایش تعداد"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs">
                      {toPersianDigits(item.quantity)}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs transition-colors"
                      title="کاهش تعداد"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="حذف از سبد"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}

          {/* Continue Shopping CTA */}
          <div className="pt-2">
            <button
              onClick={() => setPage('catalog')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
              افزودن قطعات دیگر به سبد خرید
            </button>
          </div>
        </div>

        {/* Right Col: Price Summary & Discount Box */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          
          {/* Coupon Code Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Ticket className="w-4 h-4 text-amber-500" />
              کد تخفیف دارید؟
            </div>

            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                <div>
                  <div className="font-bold text-emerald-900 flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    کد «{couponCode}» فعال شد
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    تخفیف: {formatToman(couponDiscount)}
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600"
                  title="حذف کد تخفیف"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثال: YADAK10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
                >
                  اعمال
                </button>
              </form>
            )}

            <div className="text-[10px] text-slate-400">
              کدهای پیشنهادی: <strong className="text-amber-600">YADAK10</strong> (۱۰٪ تخفیف) یا <strong className="text-amber-600">NOWRUZ</strong> (۲۰۰ هزار تومان)
            </div>
          </div>

          {/* Invoice Summary Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 text-sm pb-3 border-b border-slate-100">
              صورت‌حساب نهایی
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>قیمت کالاها ({toPersianDigits(cartCount)} قلم):</span>
                <span className="font-bold text-slate-900">{formatToman(cartSubtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-rose-600">
                  <span>سود شما از تخفیف:</span>
                  <span className="font-bold">- {formatToman(couponDiscount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>هزینه بسته‌بندی و ارسال:</span>
                <span className="font-bold text-slate-900">
                  {estimatedShippingFee === 0 ? (
                    <span className="text-emerald-600 font-black">رایگان</span>
                  ) : (
                    formatToman(estimatedShippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-black text-slate-900">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-xl text-amber-600">{formatToman(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => setPage('checkout')}
              className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              ادامه فرآیند خرید و پرداخت
            </button>

            {/* Micro guarantees */}
            <div className="pt-2 text-[11px] text-slate-400 space-y-1 text-center">
              <p>تضمین بازگشت وجه در صورت عدم رضایت تا ۷ روز</p>
              <p>پرداخت امن از طریق شبکه شاپرک با کلیه کارت‌های بانکی</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
