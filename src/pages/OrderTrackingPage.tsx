import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { formatToman, toPersianDigits } from '../utils/persianUtils';
import { 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Package, 
  Car, 
  AlertCircle, 
  Headphones, 
  ChevronLeft,
  Navigation,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { 
    orders, 
    activeTrackingOrder, 
    setActiveTrackingOrder, 
    searchOrder, 
    trackingQueryCode, 
    setTrackingQueryCode,
    setPage,
    setChatOpen,
    sendChatMessage 
  } = useApp();

  const [inputCode, setInputCode] = useState(trackingQueryCode || (activeTrackingOrder?.orderNumber || 'YK-849201'));
  const [searchError, setSearchError] = useState(false);

  const currentOrder: Order = activeTrackingOrder || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(false);
    const found = searchOrder(inputCode);
    if (found) {
      setActiveTrackingOrder(found);
      setTrackingQueryCode(found.orderNumber);
    } else {
      setSearchError(true);
    }
  };

  const handleAskAgentAboutOrder = () => {
    sendChatMessage(`سلام، درباره سفارش شماره ${currentOrder.orderNumber} سوالی داشتم.`);
    setChatOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header & Search Bar */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-800 to-sky-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold">
            <Truck className="w-4 h-4 text-sky-400 animate-pulse" />
            سامانه رهگیری لحظه‌ای و آنلاین مرسولات
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            رهگیری زنده موقعیت سفارش و قطعات خودرو
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            شماره سفارش (مانند YK-849201) یا کد رهگیری تیپاکس را وارد کنید تا وضعیت دقیق را مشاهده نمایید.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto pt-2">
            <input
              type="text"
              placeholder="شماره سفارش (مثال: YK-849201 یا کد رهگیری)..."
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setSearchError(false);
              }}
              className="flex-1 bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:border-sky-400 focus:bg-white focus:text-slate-900 rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              استعلام
            </button>
          </form>

          {searchError && (
            <div className="text-xs text-rose-300 bg-rose-950/60 p-2.5 rounded-xl border border-rose-800 max-w-md mx-auto">
              سفارشی با این شماره یافت نشد. لطفاً کد را مجدداً بررسی فرمایید.
            </div>
          )}

          {/* Quick Select Buttons for demo */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>سفارش‌های نمونه شما:</span>
            {orders.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setInputCode(o.orderNumber);
                  setActiveTrackingOrder(o);
                  setSearchError(false);
                }}
                className={`px-3 py-1 rounded-xl text-[11px] font-mono transition-colors ${
                  currentOrder?.id === o.id
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {o.orderNumber}
              </button>
            ))}
          </div>

        </div>
      </div>

      {currentOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Timeline & Simulated Map */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Live Status Bar Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-lg font-mono">
                      {currentOrder.orderNumber}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                      {currentOrder.status === 'in_transit' ? 'در مسیر تحویل' : currentOrder.status === 'delivered' ? 'تحویل داده شده' : 'در حال پردازش'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    ثبت شده در: {currentOrder.createdAt}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAskAgentAboutOrder}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Headphones className="w-4 h-4 text-amber-600" />
                    گفتگو با پشتیبان سفارش
                  </button>
                </div>
              </div>

              {/* Simulated Live GPS Map Widget */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white relative h-64 flex items-center justify-center">
                {/* Visual Map Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Animated Route Line */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 120 180 Q 250 80 450 120 T 700 80"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeDasharray="8,8"
                    className="animate-pulse"
                  />
                </svg>

                {/* Origin Pin */}
                <div className="absolute bottom-8 right-12 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shadow-lg">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold mt-1 bg-slate-900/80 px-2 py-0.5 rounded">
                    انبار مرکزی یدک‌کالا
                  </span>
                </div>

                {/* Moving Courier Pin */}
                <div className="absolute top-20 right-1/2 translate-x-1/2 flex flex-col items-center animate-bounce">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 border-2 border-white flex items-center justify-center text-white shadow-xl">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold mt-1 bg-sky-950 text-sky-200 border border-sky-500/40 px-2.5 py-0.5 rounded-full whitespace-nowrap shadow">
                    سفیر در حال حرکت
                  </span>
                </div>

                {/* Destination Pin */}
                <div className="absolute top-10 left-12 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 border border-emerald-400 flex items-center justify-center text-white shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold mt-1 bg-slate-900/80 px-2 py-0.5 rounded">
                    آدرس تحویل شما
                  </span>
                </div>

                {/* Top Info overlay */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-700 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>موقعیت مکانی زنده (GPS فعال)</span>
                </div>
              </div>

              {/* Courier Driver Details */}
              {currentOrder.courierDetails && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-sky-950">
                        {currentOrder.courierDetails.driverName}
                      </div>
                      <div className="text-[11px] text-sky-700 mt-0.5 flex items-center gap-2">
                        <span>پلاک: {currentOrder.courierDetails.vehiclePlate}</span>
                        <span>•</span>
                        <span>{currentOrder.courierDetails.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${currentOrder.courierDetails.driverPhone}`}
                    className="bg-white hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    تماس با سفیر: {currentOrder.courierDetails.driverPhone}
                  </a>
                </div>
              )}

              {/* Detailed Step-by-Step Timeline */}
              <div className="pt-2">
                <h4 className="font-bold text-slate-900 text-sm mb-4">
                  مراحل پردازش و ارسال سفارش:
                </h4>

                <div className="space-y-6 relative">
                  <div className="absolute top-3 bottom-3 right-5 w-0.5 bg-slate-200 -z-0"></div>

                  {currentOrder.trackingTimeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 relative z-10">
                      
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors shadow-xs ${
                        step.isCompleted
                          ? 'bg-emerald-600 text-white'
                          : step.isCurrent
                          ? 'bg-sky-500 text-white ring-4 ring-sky-100 animate-pulse'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}>
                        {step.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : step.isCurrent ? (
                          <Clock className="w-5 h-5" />
                        ) : (
                          <span className="text-xs font-bold">{toPersianDigits(idx + 1)}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className={`font-bold text-xs sm:text-sm ${
                            step.isCurrent ? 'text-sky-700' : 'text-slate-900'
                          }`}>
                            {step.title}
                          </h5>
                          <span className="text-[11px] text-slate-400">{step.timestamp}</span>
                        </div>

                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>

                        {(step.location || step.officerName) && (
                          <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex flex-wrap items-center gap-3">
                            {step.location && <span>مکان: {step.location}</span>}
                            {step.officerName && <span>کارشناس: {step.officerName}</span>}
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Parcel Contents & Shipping Address */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            
            {/* Parcel Contents Box */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-500" />
                قطعات موجود در این مرسوله
              </h4>

              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-slate-100">
                {currentOrder.items.map((item) => (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {item.product.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex justify-between">
                        <span>تعداد: {toPersianDigits(item.quantity)} عدد</span>
                        <span className="font-bold text-slate-900">{formatToman(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-900">
                <span>مبلغ کل فاکتور:</span>
                <span className="text-amber-600 font-black">{formatToman(currentOrder.finalTotal)}</span>
              </div>
            </div>

            {/* Delivery Address Box */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-500" />
                مشخصات گیرنده و مقصد
              </h4>

              <div>
                <span className="text-slate-400 block text-[11px]">نام گیرنده:</span>
                <span className="font-bold text-slate-800">{currentOrder.shippingAddress.receiverName}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">شماره تماس:</span>
                <span className="font-bold text-slate-800">{currentOrder.shippingAddress.receiverPhone}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">نشانی پستی:</span>
                <span className="font-medium text-slate-700 leading-relaxed block mt-0.5">
                  {currentOrder.shippingAddress.fullAddress}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">کد رهگیری پستی / بارنامه:</span>
                <span className="font-mono font-bold text-sky-600 block mt-0.5">{currentOrder.trackingCode}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
