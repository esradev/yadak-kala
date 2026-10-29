import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQ_ITEMS } from '../data/mockData';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  PhoneCall, 
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard
} from 'lucide-react';
import { normalizePersian } from '../utils/persianUtils';

export const FAQPage: React.FC = () => {
  const { setPage, setChatOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = Array.from(new Set(FAQ_ITEMS.map((f) => f.category)));

  const filteredFaqs = FAQ_ITEMS.filter((f) => {
    if (selectedCategory && f.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = normalizePersian(searchQuery);
      return normalizePersian(f.question).includes(q) || normalizePersian(f.answer).includes(q);
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
          <HelpCircle className="w-4 h-4" />
          مرکز پاسخگویی به سوالات متداول
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          چگونه می‌توانیم به شما کمک کنیم؟
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          پاسخ پرتکرارترین پرسش‌ها درباره سفارش، استعلام اصالت، گارانتی و رهگیری مرسولات
        </p>

        {/* Search input */}
        <div className="max-w-lg mx-auto pt-2 relative">
          <input
            type="text"
            placeholder="جستجو در سوالات متداول (مثال: مرجوعی، اصالت، تیپاکس)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:border-amber-400 focus:bg-white focus:text-slate-900 rounded-2xl py-3.5 pr-11 pl-4 text-xs sm:text-sm focus:outline-none transition-all"
          />
          <Search className="w-5 h-5 text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-2xl font-bold transition-all ${
            selectedCategory === null
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          همه پرسش‌ها
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ؟
                    </span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40 animate-fade-in text-justify">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">موردی برای این جستجو پیدا نشد.</p>
          </div>
        )}
      </div>

      {/* Still need help CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-white">پاسخ سوال خود را پیدا نکردید؟</h3>
          <p className="text-xs text-slate-400 mt-0.5">کارشناسان پشتیبانی و مکانیک یدک‌کالا آماده پاسخگویی هستند.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setChatOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            گفتگوی زنده
          </button>
          <button
            onClick={() => setPage('contact')}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs"
          >
            تماس با ما
          </button>
        </div>
      </div>

    </div>
  );
};
