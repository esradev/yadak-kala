import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Car, 
  Headphones,
  ShieldCheck
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast, setChatOpen } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('مشاوره فنی و استعلام قطعه');
  const [carModel, setCarModel] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('لطفاً کلیه فیلدهای الزامی را تکمیل کنید.', 'error');
      return;
    }

    setIsSent(true);
    showToast('پیام و درخواست مشاوره فنی شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس می‌گیرند.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
          <Headphones className="w-4 h-4" />
          پاسخگویی و پشتیبانی تخصصی
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          تماس با کارشناسان فنی و دفتر مرکزی یدک‌کالا
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          جهت استعلام پارت‌نامبرهای خاص، خرید عمده سازمانی، مشاوره مکانیک و پیگیری سفارشات با ما در ارتباط باشید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-base pb-3 border-b border-slate-100">
              اطلاعات تماس و نشانی
            </h3>

            <ul className="space-y-4 text-xs text-slate-700">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">دفتر مرکزی و انبار توزیع تهران:</strong>
                  <span className="text-slate-500 leading-relaxed">
                    تهران، خیابان امیرکبیر (چراغ برق)، تقاطع خیابان ملت، پاساژ کاخ، طبقه همکف، پلاک ۲۴
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">تلفن‌های واحد فروش و پشتیبانی:</strong>
                  <span className="text-slate-500 font-mono text-xs block dir-ltr text-right">۰۲۱ - ۸۸۹۹ ۰۰۰۰</span>
                  <span className="text-slate-500 font-mono text-xs block dir-ltr text-right">۰۲۱ - ۳۳۴۴ ۵۵۶۶</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">ساعات کاری و پاسخگویی:</strong>
                  <span className="text-slate-500 leading-relaxed">
                    شنبه تا چهارشنبه: ۸:۳۰ الی ۲۰:۳۰<br />
                    پنج‌شنبه‌ها: ۸:۳۰ الی ۱۶:۰۰ (پشتیبانی آنلاین همیشه فعال)
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">پست الکترونیک رسمی:</strong>
                  <span className="text-slate-500 font-mono text-xs">support@yadakkala.ir</span>
                </div>
              </li>
            </ul>

            {/* Direct Live Chat CTA */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="font-bold text-xs text-amber-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                نیاز به پاسخ فوری در کمتر از ۲ دقیقه دارید؟
              </div>
              <p className="text-[11px] text-amber-800">
                همین الان پنجره گفتگوی آنلاین را در گوشه صفحه باز کرده و با کارشناس فنی صحبت کنید.
              </p>
              <button
                onClick={() => setChatOpen(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-colors"
              >
                شروع چت با کارشناس مکانیک
              </button>
            </div>

          </div>

        </div>

        {/* Contact & Consultation Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-base">
              فرم ارسال پیام و درخواست استعلام قطعه
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              مشخصات خودرو و قطعه مد نظر خود را وارد فرمایید تا ظرف حداکثر ۲ ساعت بررسی و پاسخ داده شود.
            </p>
          </div>

          {isSent ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-fade-in">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-emerald-950 text-base">پیام شما با موفقیت دریافت شد!</h4>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                کارشناس فنی یدک‌کالا در اسرع وقت از طریق تماس یا پیامک با شماره {phone} پاسخگوی شما خواهد بود.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setMessage('');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی:*</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: رضا مرادی"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه:*</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">موضوع پیام:</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="مشاوره فنی و استعلام قطعه">مشاوره فنی و استعلام قطعه</option>
                    <option value="پیگیری مرسوله و سفارش">پیگیری مرسوله و سفارش</option>
                    <option value="درخواست مرجوعی و گارانتی">درخواست مرجوعی و گارانتی</option>
                    <option value="خرید عمده و همکاری تجاری">خرید عمده و همکاری تجاری</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">مدل و سال ساخت خودرو (اختیاری):</label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="مثال: پژو ۲۰۶ تیپ ۵ مدل ۹۸"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">متن پیام یا توضیحات قطعه:*</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="لطفاً شماره شاسی یا مشخصات دقیق قطعه خراب را بنویسید..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                ارسال درخواست به کارشناسان
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
