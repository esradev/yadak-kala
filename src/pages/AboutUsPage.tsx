import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  Users, 
  Car, 
  Clock, 
  CheckCircle2, 
  ChevronLeft,
  Wrench
} from 'lucide-react';
import { toPersianDigits } from '../utils/persianUtils';

export const AboutUsPage: React.FC = () => {
  const { setPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            درباره مجموعه تخصصی یدک‌کالا
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            بزرگترین پلتفرم تامین مستقیم <span className="text-amber-400">قطعات و لوازم یدکی خودرو</span> در ایران
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">
            سامانه یدک‌کالا از سال ۱۳۹۶ با هدف رفع دغدغه قطعات تقلبی و قیمت‌های نامتعارف در بازار لوازم یدکی ایران شکل گرفت. ما با حذف واسطه‌ها و اتصال مستقیم به خطوط تولید کارخانجات اصلی و واردکنندگان رسمی قطعات، خریدی شفاف، اصل و تضمین‌شده را برای مالکان خودرو و تعمیرکاران فراهم ساخته‌ایم.
          </p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'قطعه و پارت‌نامبر موجود', value: '۱۵,۰۰۰+', icon: Car },
          { label: 'سفارش موفق در سراسر کشور', value: '۱۲۰,۰۰۰+', icon: Truck },
          { label: 'تعمیرگاه و مکانیک همکار', value: '۲,۴۰۰+', icon: Wrench },
          { label: 'ضمانت اصالت و رضایت مشتری', value: '۱۰۰٪', icon: ShieldCheck }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Core Values */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900">چرا خریداران به یدک‌کالا اعتماد دارند؟</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">استانداردهای سخت‌گیرانه برای تضمین سلامت خودروی شما</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">اصالت قطعی با گواهی رسمی</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              تمامی قطعات دارای لیبل اصالت کالا، هولوگرام شرکتی و کد رهگیری سامانه جامع تجارت هستند تا با خیالی آسوده روی اتومبیل نصب شوند.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">بسته‌بندی ضربه‌گیر و ارسال سریع</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              قطعات حساس مانند چراغ‌ها، سنسورها و لنت‌ها در بسته‌بندی‌های چندلایه فوم و پلاستیک حبابدار ضدضربه به سراسر استان‌های ایران ارسال می‌شوند.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">تیم مشاوران فنی و مکانیک</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              پیش از خرید می‌توانید با کارشناسان مکانیک خودرو از طریق چت زنده یا تماس تلفنی گفتگو کرده و قطعه منطبق با شماره شاسی خود را بیابید.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-right">
          <h3 className="text-xl font-black text-white">آماده تجربه خریدی بی‌دغدغه هستید؟</h3>
          <p className="text-xs text-slate-400">کاتالوگ هزاران قطعه با قیمت منصفانه در اختیار شماست.</p>
        </div>
        <button
          onClick={() => setPage('catalog')}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-xs transition-colors whitespace-nowrap shadow-lg"
        >
          ورود به کاتالوگ قطعات
        </button>
      </section>

    </div>
  );
};
