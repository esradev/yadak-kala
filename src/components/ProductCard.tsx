import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { formatToman, toPersianDigits } from '../utils/persianUtils';
import { Star, ShoppingBag, ShieldCheck, Heart, CheckCircle2, AlertTriangle, ChevronLeft } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { 
    setPage, 
    addToCart, 
    userVehicle, 
    isCarCompatible, 
    toggleFavorite, 
    isFavorite 
  } = useApp();

  const compatible = isCarCompatible(product, userVehicle);
  const favorite = isFavorite(product.id);

  const handleCardClick = () => {
    setPage('product-detail', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  if (layout === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-amber-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col sm:flex-row gap-4 items-center group relative"
      >
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 h-44 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="absolute top-2 right-2 bg-rose-600 text-white text-xs font-black px-2 py-0.5 rounded-full shadow">
              {toPersianDigits(product.discountPercent)}٪ تخفیف
            </span>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm"
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between w-full h-full">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {product.partNumber}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
              {product.title}
            </h3>

            {/* Compatibility Tag */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {userVehicle ? (
                compatible ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    سازگار با {userVehicle.modelName}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    عدم سازگاری با {userVehicle.modelName}
                  </span>
                )
              ) : (
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  تضمین ۱۰۰٪ اصالت و کارکرد
                </span>
              )}

              {product.isGenuine && (
                <span className="inline-flex items-center gap-1 text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  اصل شرکتی
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-800">{toPersianDigits(product.rating)}</span>
              <span>({toPersianDigits(product.reviewsCount)} نظر)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left">
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-xs text-slate-400 line-through">
                    {formatToman(product.originalPrice)}
                  </div>
                )}
                <div className="text-base font-black text-slate-900">
                  {formatToman(product.price)}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-xl shadow-md transition-all flex items-center gap-1 text-xs font-bold"
              >
                <ShoppingBag className="w-4 h-4" />
                خرید سریع
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Badges and Favorite */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 mb-3">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {product.discountPercent && product.discountPercent > 0 ? (
          <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md z-10">
            {toPersianDigits(product.discountPercent)}٪ تخفیف
          </span>
        ) : null}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm z-10"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Stock Badge if low */}
        {product.stockCount <= 5 && product.inStock && (
          <span className="absolute bottom-2 right-2 bg-amber-900/80 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
            تنها {toPersianDigits(product.stockCount)} عدد در انبار باقیست
          </span>
        )}
      </div>

      {/* Brand & Part Number */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
        <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
          {product.brand}
        </span>
        <span className="font-mono text-slate-400 text-[10px]">{product.partNumber}</span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-700 transition-colors line-clamp-2 h-10 mb-2">
        {product.title}
      </h3>

      {/* Vehicle Compatibility Banner */}
      <div className="mb-3">
        {userVehicle ? (
          compatible ? (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">سازگار با {userVehicle.modelName}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200/80">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              <span className="truncate">عدم سازگاری با {userVehicle.modelName}</span>
            </div>
          )
        ) : (
          <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
            <span className="truncate">گارانتی اصالت و سلامت فیزیکی</span>
          </div>
        )}
      </div>

      {/* Price and Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-end justify-between mt-auto">
        <div>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="text-xs text-slate-400 line-through">
              {formatToman(product.originalPrice)}
            </div>
          )}
          <div className="text-base font-black text-slate-900">
            {formatToman(product.price)}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white p-2.5 rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center"
          title="افزودن به سبد خرید"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
