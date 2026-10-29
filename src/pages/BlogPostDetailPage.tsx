import React from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { toPersianDigits } from '../utils/persianUtils';
import { 
  Clock, 
  Calendar, 
  ChevronLeft, 
  Share2, 
  Wrench, 
  Car
} from 'lucide-react';

export const BlogPostDetailPage: React.FC = () => {
  const { selectedBlogPostId, setPage, showToast } = useApp();
  
  const post = BLOG_POSTS.find((b) => b.id === selectedBlogPostId) || BLOG_POSTS[0];
  const relatedParts = PRODUCTS.filter((p) => post.relatedProductIds.includes(p.id));

  const authorName = typeof post.author === 'object' ? post.author.name : post.author;
  const authorRole = typeof post.author === 'object' ? post.author.role : 'کارشناس مکانیک و تست فنی';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => setPage('home')} className="hover:text-amber-600">خانه</button>
        <ChevronLeft className="w-3.5 h-3.5" />
        <button onClick={() => setPage('blog')} className="hover:text-amber-600">مجله فنی</button>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-bold truncate">{post.title}</span>
      </nav>

      {/* Article Container */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
              {post.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {toPersianDigits(post.readingTimeMinutes)} دقیقه زمان مطالعه
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-[11px]">
                {authorName[0]}
              </div>
              <div>
                <span className="font-bold block text-slate-900">{authorName}</span>
                <span className="text-[10px] text-slate-400">{authorRole}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('لینک مقاله در حافظه کپی شد.', 'info');
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors flex items-center gap-1 text-xs"
            >
              <Share2 className="w-4 h-4" />
              اشتراک‌گذاری
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden max-h-[420px] bg-slate-100 border border-slate-200">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Summary Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed">
          <strong className="font-black block mb-1">خلاصه این مقاله:</strong>
          {post.summary}
        </div>

        {/* Rich Article Body Content */}
        <div className="text-xs sm:text-base text-slate-700 leading-loose space-y-4 text-justify pt-2">
          {Array.isArray(post.content) ? (
            post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          ) : (
            <p>{post.content}</p>
          )}
        </div>

        {/* Key Technician Tip Callout */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
          <h4 className="font-bold text-amber-400 text-xs sm:text-sm flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            توصیه فنی مهندسان یدک‌کالا:
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            همواره قبل از تعویض قطعه، بررسی کنید که علت خرابی از کدام بخش منشا گرفته است. نصب قطعه اصل روی خودرویی که تنظیمات سیستم برقی یا مکانیکی آن دچار نقص است، ممکن است باعث کاهش زودهنگام عمر قطعه گردد.
          </p>
        </div>

        {/* Tags */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">برچسب‌ها:</span>
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
              #{tag}
            </span>
          ))}
        </div>

      </article>

      {/* Embedded Related Products directly from article */}
      {relatedParts.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-500" />
              قطعات اصل معرفی‌شده در این مقاله
            </h3>
            <button
              onClick={() => setPage('catalog')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700"
            >
              مشاهده تمام کاتالوگ ←
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedParts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
