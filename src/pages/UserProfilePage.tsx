import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { formatToman, toPersianDigits } from '../utils/persianUtils';
import { ProductCard } from '../components/ProductCard';
import { 
  User, 
  Car, 
  MapPin, 
  Heart, 
  Bell, 
  Wallet, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { 
    user, 
    updateUserProfile,
    savedVehicles, 
    userVehicle, 
    setUserVehicle, 
    removeSavedVehicle, 
    setIsCarModalOpen,
    userAddresses, 
    deleteAddress, 
    favorites, 
    setPage,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'garage' | 'addresses' | 'favorites' | 'notifications' | 'info'>('garage');

  // Edit user state
  const [userName, setUserName] = useState(user.name);
  const [userPhone, setUserPhone] = useState(user.phone);
  const [userNationalCode, setUserNationalCode] = useState(user.nationalCode);

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  const handleUpdateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: userName,
      phone: userPhone,
      nationalCode: userNationalCode
    });
    showToast('اطلاعات کاربری با موفقیت ویرایش شد.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-600 border-2 border-white/30 flex items-center justify-center text-white text-2xl font-black shadow-lg">
              {user.name[0]}
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl font-black text-white">{user.name}</h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  کاربر ویژه باشگاه مشتریان
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">{user.phone} • عضو از ۱۴۰۲/۰۶/۱۵</p>
            </div>
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-slate-300 block">موجودی کیف پول اعتباری:</span>
              <span className="text-lg font-black text-amber-400">{formatToman(user.walletBalance)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Tabs sidebar + Active Tab panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          {[
            { id: 'garage', label: 'گاراژ من (خودروها)', icon: Car, count: savedVehicles.length },
            { id: 'addresses', label: 'آدرس‌های تحویل', icon: MapPin, count: userAddresses.length },
            { id: 'favorites', label: 'لیست علاقه‌مندی‌ها', icon: Heart, count: favorites.length },
            { id: 'notifications', label: 'پیام‌ها و اعلان‌ها', icon: Bell, count: 2 },
            { id: 'info', label: 'اطلاعات حساب کاربری', icon: User }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-right p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {toPersianDigits(tab.count)}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Panel */}
        <main className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm min-h-[420px]">
          
          {/* TAB 1: GARAGE */}
          {activeTab === 'garage' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <Car className="w-5 h-5 text-amber-500" />
                    گاراژ هوشمند خودروهای من
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    خودروهای ثبت شده شما جهت فیلتر و تطبیق خودکار پارت‌نامبر قطعات
                  </p>
                </div>

                <button
                  onClick={() => setIsCarModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  افزودن خودرو به گاراژ
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedVehicles.map((car) => {
                  const isCurrent = userVehicle?.id === car.id;
                  return (
                    <div
                      key={car.id}
                      className={`p-5 rounded-2xl border-2 transition-all space-y-3 flex flex-col justify-between ${
                        isCurrent
                          ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                            مدل {car.year}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              خودروی فعال فروشگاه
                            </span>
                          )}
                        </div>

                        <h4 className="font-black text-slate-900 text-base mt-2">
                          {car.modelName}
                        </h4>
                        <div className="text-xs text-slate-500 mt-1">
                          نوع پیشرانه / شاسی: استاندارد فابریک
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        {!isCurrent ? (
                          <button
                            onClick={() => {
                              setUserVehicle(car);
                              showToast(`خودروی فعال به ${car.modelName} تغییر یافت.`, 'info');
                            }}
                            className="text-xs font-bold text-amber-600 hover:text-amber-700"
                          >
                            انتخاب به عنوان خودروی پیش‌فرض
                          </button>
                        ) : (
                          <button
                            onClick={() => setPage('catalog')}
                            className="text-xs font-bold text-emerald-700 hover:underline"
                          >
                            مشاهده قطعات سازگار در کاتالوگ ←
                          </button>
                        )}

                        <button
                          onClick={() => removeSavedVehicle(car.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="حذف از گاراژ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-500" />
                    آدرس‌های تحویل سفارش
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    مدیریت نشانی‌ها جهت تسویه سریع هنگام سفارش
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                          {addr.title}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            پیش‌فرض
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                        {addr.fullAddress}
                      </p>

                      <div className="text-[11px] text-slate-500 mt-2">
                        گیرنده: {addr.receiverName} ({addr.receiverPhone})
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-400">کدپستی: {toPersianDigits(addr.postalCode)}</span>
                      {userAddresses.length > 1 && (
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          حذف
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  لیست علاقه‌مندی‌ها و نشان‌شده‌ها
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  قطعاتی که برای بررسی یا خرید آینده ذخیره کرده‌اید
                </p>
              </div>

              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-xs text-slate-500">شما هنوز قطعه‌ای را نشان نکرده‌اید.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" />
                  اعلان‌ها و رویدادهای کاربری
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-sky-950">سفارش شماره YK-849201 در مسیر ارسال قرار گرفت.</h5>
                    <p className="text-[11px] text-sky-800 mt-0.5">سفیر ناوگان تیپاکس مرسوله را تحویل گرفته و تا پایان وقت اداری تقدیم خواهد شد.</p>
                    <span className="text-[10px] text-sky-600 block mt-1">امروز - ساعت ۱۴:۱۵</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-amber-950">تخفیف ویژه قطعات پژو ۲۰۶</h5>
                    <p className="text-[11px] text-amber-800 mt-0.5">تسمه تایم پاورگریپ و لنت تکستار با تخفیف ۱۵ درصدی در کاتالوگ فعال گردید.</p>
                    <span className="text-[10px] text-amber-600 block mt-1">دیروز</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EDIT INFO */}
          {activeTab === 'info' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-500" />
                  ویرایش اطلاعات هویتی و شماره تماس
                </h3>
              </div>

              <form onSubmit={handleUpdateInfo} className="max-w-xl space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شماره همراه (شناسه ورود):</label>
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">کد ملی (جهت صدور فاکتور رسمی مالیاتی):</label>
                  <input
                    type="text"
                    value={userNationalCode}
                    onChange={(e) => setUserNationalCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md transition-colors"
                >
                  ذخیره تغییرات
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
