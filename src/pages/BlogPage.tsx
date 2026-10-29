import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/mockData';
import { toPersianDigits } from '../utils/persianUtils';
import { 
  BookOpen, 
  Clock, 
  User, 
  ChevronLeft, 
  Search, 
  Compass, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { setPage } = useApp();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const categories = Array.from(new Set(BLOG_POSTS.map((b) => b.category)));

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCat && post.category !== selectedCat) return false;
    if (search.trim()) {
      const q = search.trim();
      return post.title.includes(q) || post.summary.includes(q) || post.tags.some((t) => t.includes(q));
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
          <BookOpen className="w-4 h-4" />
          مجله تخصصی مکانیک و راهنمای خرید قطعات
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          مقالات و راهنماهای جامع فنی خودرو
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          نکات ضروری افزایش عمر قطعات، تشخیص علائم خرابی و راهنمای نصب قطعات اورجینال
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto pt-2 relative">
          <input
            type="text"
            placeholder="جستجو در مقالات (مثال: تسمه تایم، لنت، روغن)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:border-amber-400 focus:bg-white focus:text-slate-900 rounded-2xl py-3 pr-11 pl-4 text-xs focus:outline-none transition-all"
          />
          <Search className="w-4 h-4 text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        <button
          onClick={() => setSelectedCat(null)}
          className={`px-4 py-2 rounded-2xl font-bold transition-all ${
            selectedCat === null
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          همه مقالات
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-2xl font-bold transition-all ${
              selectedCat === cat
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setPage('blog-detail', { blogId: post.id })}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-slate-900/80 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {typeof post.author === 'object' ? post.author.name : post.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {toPersianDigits(post.readingTimeMinutes)} دقیقه
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>ادامه مطلب و قطعات پیشنهادی</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
