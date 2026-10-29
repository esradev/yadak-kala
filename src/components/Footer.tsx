import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CAR_BRANDS } from '../data/mockData';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ChevronLeft,
  Send,
  CheckCircle2,
  Car
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, setSelectedCategory, setSelectedBrand, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('لطفاً یک آدرس ایمیل معتبر وارد کنید.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('عضویت شما در خبرنامه تخفیف‌های ویژه با موفقیت ثبت شد.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Value Proportions Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">ضمانت ۱۰۰٪ اصالت کالا</h4>
              <p className="text-xs text-slate-400 mt-0.5">ارائه با هولوگرام و فاکتور شرکتی معتبر</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">ارسال سریع سراسر کشور</h4>
              <p className="text-xs text-slate-400 mt-0.5">پیک فوری در تهران و تیپاکس به تمام ایران</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">۷ روز ضمانت بازگشت وجه</h4>
              <p className="text-xs text-slate-400 mt-0.5">امکان مرجوعی بی قید و شرط قطعات</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">مشاوره فنی رایگان</h4>
              <p className="text-xs text-slate-400 mt-0.5">پاسخگویی کارشناسان مکانیک خودرو</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800">
          
          {/* Col 1: About & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-black shadow-md">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white">یدک‌<span className="text-amber-500">کالا</span></span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed text-justify">
              یدک‌کالا، سامانه جامع و تخصصی خرید آنلاین لوازم یدکی و قطعات اورجینال خودروهای ایران خودرو، سایپا، رنو، هیوندای، کیا، جک و ام‌وی‌ام است. با حذف واسطه‌ها، تضمین قطعی اصالت، قیمت منصفانه و سامانه رهگیری زنده محموله، خریدی سریع و بدون دغدغه را تجربه کنید.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-bold text-white mb-2">عضویت در خبرنامه و اطلاع از تخفیف‌های ویژه:</h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="آدرس ایمیل خود را وارد کنید..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 flex-1 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  عضویت
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ایمیل شما با موفقیت ثبت شد.
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4 pb-2 border-b border-slate-800">
              دسترسی سریع
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setPage('catalog')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  کاتالوگ جامع قطعات
                </button>
              </li>
              <li>
                <button onClick={() => setPage('order-tracking')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  رهگیری زنده مرسولات
                </button>
              </li>
              <li>
                <button onClick={() => setPage('order-history')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  پیگیری فاکتور و سفارشات
                </button>
              </li>
              <li>
                <button onClick={() => setPage('blog')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  مجله فنی و نگهداری خودرو
                </button>
              </li>
              <li>
                <button onClick={() => setPage('faq')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  سوالات متداول
                </button>
              </li>
              <li>
                <button onClick={() => setPage('about')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  درباره یدک‌کالا
                </button>
              </li>
              <li>
                <button onClick={() => setPage('contact')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  اطلاعات تماس و نشانی
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4 pb-2 border-b border-slate-800">
              دسته‌بندی‌های پرطرفدار
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setPage('catalog', { categoryId: cat.id });
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3 h-3 text-slate-600" />
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Warehouse info */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4 pb-2 border-b border-slate-800">
              دفتر مرکزی و انبار
            </h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  تهران، خیابان امیرکبیر (چراغ برق)، خیابان ملت، برج بهار، طبقه همکف، پلاک ۲۴
                </span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:02188990000" className="hover:text-white dir-ltr text-right">
                  ۰۲۱ - ۸۸۹۹ ۰۰۰۰
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>شنبه تا پنج‌شنبه: ۸:۳۰ الی ۲۱:۰۰</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>support@yadakkala.ir</span>
              </li>
            </ul>

            {/* Trust Badges simulation */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center flex-1">
                <div className="text-[10px] font-bold text-amber-400">نماد اعتماد الکترونیکی</div>
                <div className="text-[9px] text-slate-500 mt-0.5">اینماد ۵ ستاره</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center flex-1">
                <div className="text-[10px] font-bold text-sky-400">درگاه امن بانکی</div>
                <div className="text-[9px] text-slate-500 mt-0.5">شبکه شاپرک</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت یدک‌کالا ایرانیان (سهامی خاص) می‌باشد.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>طراحی شده با استاندارد تجارت الکترونیک ایران</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
