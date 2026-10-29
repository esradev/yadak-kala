import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IRAN_PROVINCES, formatToman, toPersianDigits } from '../utils/persianUtils';
import { Address, Order } from '../types';
import confetti from 'canvas-confetti';
import { 
  Check, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  Plus, 
  ChevronLeft, 
  Sparkles, 
  FileText,
  Clock,
  PhoneCall,
  User,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    couponDiscount, 
    userAddresses, 
    addAddress, 
    createOrder, 
    setPage,
    showToast 
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'address_shipping' | 'payment_gateway' | 'completed'>('address_shipping');
  
  // Selected state
  const [selectedAddressId, setSelectedAddressId] = useState<string>(userAddresses[0]?.id || 'addr-1');
  const [shippingMethod, setShippingMethod] = useState<'tipax' | 'post_express' | 'courier_instant' | 'freight'>('tipax');
  const [paymentMethod, setPaymentMethod] = useState<'online_gateway' | 'cod' | 'wallet'>('online_gateway');
  const [selectedGateway, setSelectedGateway] = useState<'shaparak' | 'mellat' | 'saman' | 'zarinpal'>('shaparak');
  const [orderNotes, setOrderNotes] = useState('');

  // New Address Form Modal/State
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newTitle, setNewTitle] = useState('منزل');
  const [newName, setNewName] = useState('امیرحسین کاظمی');
  const [newPhone, setNewPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');
  const [newProvince, setNewProvince] = useState(IRAN_PROVINCES[0].name);
  const [newCity, setNewCity] = useState(IRAN_PROVINCES[0].cities[0]);
  const [newPostalCode, setNewPostalCode] = useState('۱۹۸۴۷۵۶۳۲۱');
  const [newFullAddress, setNewFullAddress] = useState('');

  // Payment simulator state
  const [cardNumber, setCardNumber] = useState('۶۰۳۷-۹۹۷۵-۸۸۳۴-۱۲۹۰');
  const [cvv2, setCvv2] = useState('۳۴۲');
  const [cardExpMonth, setCardExpMonth] = useState('۰۸');
  const [cardExpYear, setCardExpYear] = useState('۰۶');
  const [cardOtp, setCardOtp] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Created Order result
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const selectedAddress = userAddresses.find((a) => a.id === selectedAddressId) || userAddresses[0];

  const getShippingFee = () => {
    if (cartSubtotal >= 2000000) return 0;
    if (shippingMethod === 'courier_instant') return 95000;
    if (shippingMethod === 'tipax') return 65000;
    if (shippingMethod === 'post_express') return 45000;
    return 120000; // freight
  };

  const shippingFee = getShippingFee();
  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullAddress.trim() || !newName.trim() || !newPhone.trim()) {
      showToast('لطفاً کلیه فیلدهای الزامی آدرس را تکمیل فرمایید.', 'error');
      return;
    }

    const created: Address = {
      id: `addr-${Date.now()}`,
      title: newTitle,
      receiverName: newName,
      receiverPhone: newPhone,
      province: newProvince,
      city: newCity,
      postalCode: newPostalCode,
      fullAddress: `${newProvince}، ${newCity}، ${newFullAddress}`,
      isDefault: false
    };

    addAddress(created);
    setSelectedAddressId(created.id);
    setIsAddingNewAddress(false);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      showToast('لطفاً ابتدا یک آدرس تحویل انتخاب کنید.', 'error');
      return;
    }

    if (paymentMethod === 'cod') {
      // Direct complete for COD
      finishOrder('cod');
    } else {
      setCheckoutStep('payment_gateway');
    }
  };

  const handleSimulatePaymentSuccess = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      finishOrder('online_gateway');
    }, 1500);
  };

  const finishOrder = (payMethod: 'online_gateway' | 'cod' | 'wallet') => {
    let methodTitle = 'ارسال با تیپاکس';
    if (shippingMethod === 'courier_instant') methodTitle = 'پیک موتوری فوری تهران';
    if (shippingMethod === 'post_express') methodTitle = 'پست پیشتاز سراسر کشور';
    if (shippingMethod === 'freight') methodTitle = 'باربری اختصاصی قطعات سنگین';

    const newOrder = createOrder({
      items: [...cart],
      itemsTotal: cartSubtotal,
      shippingFee,
      discountAmount: couponDiscount,
      finalTotal,
      shippingAddress: selectedAddress,
      shippingMethod,
      shippingMethodTitle: methodTitle,
      paymentMethod: payMethod,
      paymentGateway: selectedGateway,
      paymentStatus: 'paid'
    });

    setCompletedOrder(newOrder);
    setCheckoutStep('completed');

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  // If cart empty and not completed
  if (cart.length === 0 && checkoutStep !== 'completed') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">سبد خرید شما خالی است.</h2>
        <button
          onClick={() => setPage('catalog')}
          className="bg-amber-500 text-white text-xs font-bold py-2.5 px-6 rounded-xl"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Checkout Progress Stepper */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 bg-slate-50 px-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              checkoutStep === 'address_shipping' || checkoutStep === 'payment_gateway' || checkoutStep === 'completed'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {checkoutStep === 'payment_gateway' || checkoutStep === 'completed' ? (
                <Check className="w-5 h-5" />
              ) : (
                '۱'
              )}
            </div>
            <span className="text-xs font-bold text-slate-900">آدرس و ارسال</span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 bg-slate-50 px-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              checkoutStep === 'payment_gateway' || checkoutStep === 'completed'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {checkoutStep === 'completed' ? <Check className="w-5 h-5" /> : '۲'}
            </div>
            <span className="text-xs font-bold text-slate-900">پرداخت شاپرک</span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 bg-slate-50 px-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              checkoutStep === 'completed' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-200 text-slate-600'
            }`}>
              {checkoutStep === 'completed' ? <Check className="w-5 h-5" /> : '۳'}
            </div>
            <span className="text-xs font-bold text-slate-900">رهگیری سفارش</span>
          </div>
        </div>
      </div>

      {/* STEP 1: ADDRESS & SHIPPING */}
      {checkoutStep === 'address_shipping' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Address Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  آدرس تحویل سفارش
                </h3>
                <button
                  onClick={() => setIsAddingNewAddress(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  افزودن آدرس جدید
                </button>
              </div>

              {/* Saved Address Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userAddresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                          {addr.title}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {addr.fullAddress}
                      </p>

                      <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>گیرنده: {addr.receiverName}</span>
                        <span>کدپستی: {toPersianDigits(addr.postalCode)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* New Address Form Inline Modal */}
              {isAddingNewAddress && (
                <form onSubmit={handleSaveNewAddress} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fade-in mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">ثبت آدرس تحویل جدید:</h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="text-xs text-slate-400 hover:text-slate-700"
                    >
                      انصراف
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">عنوان آدرس:</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="منزل، محل کار، تعمیرگاه..."
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">نام تحویل‌گیرنده:</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">شماره تماس همراه:</label>
                      <input
                        type="text"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">استان:</label>
                      <select
                        value={newProvince}
                        onChange={(e) => {
                          const pName = e.target.value;
                          setNewProvince(pName);
                          const provObj = IRAN_PROVINCES.find((p) => p.name === pName);
                          if (provObj) setNewCity(provObj.cities[0]);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      >
                        {IRAN_PROVINCES.map((p) => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">شهر:</label>
                      <select
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      >
                        {(IRAN_PROVINCES.find((p) => p.name === newProvince)?.cities || []).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">کد پستی ۱۰ رقمی:</label>
                      <input
                        type="text"
                        value={newPostalCode}
                        onChange={(e) => setNewPostalCode(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">نشانی دقیق پستی (خیابان، کوچه، پلاک، واحد):</label>
                    <textarea
                      rows={2}
                      value={newFullAddress}
                      onChange={(e) => setNewFullAddress(e.target.value)}
                      placeholder="مثال: سعادت‌آباد، میدان کاج، خیابان سرو غربی، پلاک ۱۲، واحد ۴"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-5 rounded-xl text-xs shadow-md transition-colors"
                  >
                    ذخیره و انتخاب این آدرس
                  </button>
                </form>
              )}
            </div>

            {/* 2. Shipping Method */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
                <Truck className="w-5 h-5 text-sky-500" />
                روش و زمان ارسال مرسوله
              </h3>

              <div className="space-y-3">
                {[
                  {
                    id: 'tipax',
                    title: 'تیپاکس اکسپرس (سراسر کشور)',
                    desc: 'تحویل ۲۴ الی ۴۸ ساعته با بسته‌بندی ضد ضربه مخصوص قطعات خودرو',
                    fee: cartSubtotal >= 2000000 ? 'رایگان' : '۶۵,۰۰۰ تومان',
                    badge: 'پیشنهادی'
                  },
                  {
                    id: 'courier_instant',
                    title: 'پیک فوری موتوری (ویژه شهر تهران)',
                    desc: 'تحویل در همان روز ظرف ۲ الی ۴ ساعت با هماهنگی تلفنی',
                    fee: cartSubtotal >= 2000000 ? 'رایگان' : '۹۵,۰۰۰ تومان',
                    badge: 'سریع‌ترین'
                  },
                  {
                    id: 'post_express',
                    title: 'پست پیشتاز سراسری',
                    desc: 'تحویل ۲ الی ۳ روز کاری از طریق شرکت ملی پست',
                    fee: cartSubtotal >= 2000000 ? 'رایگان' : '۴۵,۰۰۰ تومان',
                    badge: 'اقتصادی'
                  }
                ].map((item) => {
                  const isSelected = shippingMethod === item.id;
                  return (
                    <label
                      key={item.id}
                      onClick={() => setShippingMethod(item.id as any)}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                            {item.title}
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-normal">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-900">{item.fee}</div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Payment Method Choice */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                شیوه پرداخت
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentMethod('online_gateway')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'online_gateway'
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">پرداخت اینترنتی امن شاپرک</span>
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">با کلیه کارت‌های بانکی عضو شتاب + رمز پویا</p>
                </div>

                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">پرداخت در محل (کارتخوان پیک)</span>
                    <Truck className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">پرداخت هنگام تحویل قطعه درب منزل (فقط تهران)</p>
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  توضیحات و هماهنگی زمان تحویل (اختیاری):
                </label>
                <input
                  type="text"
                  placeholder="مثال: تماس قبل از حرکت پیک، زنگ طبقه ۴..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
              </div>
            </div>

          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm pb-3 border-b border-slate-100">
                خلاصه سفارش ({toPersianDigits(cartCount)} قلم)
              </h3>

              {/* Mini Item preview */}
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-2 flex items-center justify-between">
                    <div className="truncate max-w-[170px]">
                      <span className="font-bold text-slate-800">{item.product.title}</span>
                      <span className="text-slate-400 block text-[10px]">تعداد: {toPersianDigits(item.quantity)}</span>
                    </div>
                    <span className="font-bold text-slate-900 whitespace-nowrap">
                      {formatToman(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>جمع کل کالاها:</span>
                  <span className="font-bold text-slate-900">{formatToman(cartSubtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-rose-600 font-bold">
                    <span>تخفیف اعمال شده:</span>
                    <span>- {formatToman(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>هزینه حمل و نقل:</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-600">رایگان</span> : formatToman(shippingFee)}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between text-sm font-black text-slate-900">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-xl text-amber-600">{formatToman(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-lg shadow-amber-500/20 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {paymentMethod === 'cod' ? 'ثبت نهایی سفارش' : 'انتقال به درگاه بانکی شاپرک'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* STEP 2: PAYMENT GATEWAY SIMULATION */}
      {checkoutStep === 'payment_gateway' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl space-y-6 animate-fade-in">
          
          {/* Shaparak Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-black text-lg">
                ش
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">درگاه پرداخت الکترونیک شاپرک</h3>
                <p className="text-xs text-slate-400">اتصال امن به سامانه پرداخت مرکزی بانک مرکزی جمهوری اسلامی ایران</p>
              </div>
            </div>
            <div className="text-left">
              <span className="text-xs text-slate-400 block">مبلغ تراکنش:</span>
              <span className="text-lg font-black text-amber-600">{formatToman(finalTotal)}</span>
            </div>
          </div>

          {/* Payment Card Simulator */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">شماره کارت بانکی (۱۶ رقم):</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 tracking-wider text-left dir-ltr focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">کد امنیتی CVV2:</label>
                <input
                  type="password"
                  value={cvv2}
                  onChange={(e) => setCvv2(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">تاریخ انقضای کارت (ماه / سال):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ماه"
                    value={cardExpMonth}
                    onChange={(e) => setCardExpMonth(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-sm font-mono text-center"
                  />
                  <input
                    type="text"
                    placeholder="سال"
                    value={cardExpYear}
                    onChange={(e) => setCardExpYear(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-sm font-mono text-center"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">رمز دوم یکبار مصرف (رمز پویا):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="رمز پویا پیامک شده را وارد کنید..."
                  value={cardOtp}
                  onChange={(e) => setCardOtp(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-center"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCardOtp('849201');
                    showToast('رمز پویا برای کارت آزمایشی وارد شد.', 'info');
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
                >
                  دریافت خودکار رمز پویا
                </button>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCheckoutStep('address_shipping')}
                className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3.5 rounded-xl transition-colors"
              >
                انصراف و بازگشت
              </button>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleSimulatePaymentSuccess}
                className="w-2/3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-all flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    در حال تایید تراکنش بانکی...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    پرداخت امن و ثبت نهایی سفارش
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* STEP 3: ORDER COMPLETED & CELEBRATION */}
      {checkoutStep === 'completed' && completedOrder && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-fade-in">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Check className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              پرداخت با موفقیت انجام شد
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              سفارش شما با موفقیت ثبت و وارد چرخه پردازش انبار شد!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              پیامک تایید ثبت سفارش به همراه کد رهگیری به شماره همراه شما ارسال گردید.
            </p>
          </div>

          {/* Order Details Badge Box */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-right">
            <div>
              <span className="text-[11px] text-slate-400 block">شماره سفارش:</span>
              <span className="font-mono font-black text-slate-900 text-sm">{completedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">کد رهگیری پستی:</span>
              <span className="font-mono font-bold text-sky-600 text-xs">{completedOrder.trackingCode}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">مبلغ کل پرداخت شده:</span>
              <span className="font-bold text-slate-900 text-xs">{formatToman(completedOrder.finalTotal)}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">روش ارسال:</span>
              <span className="font-bold text-slate-900 text-xs">{completedOrder.shippingMethodTitle}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setPage('order-tracking', { trackingCode: completedOrder.orderNumber })}
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-sky-600/20 text-sm flex items-center justify-center gap-2"
            >
              <Truck className="w-5 h-5" />
              مشاهده رهگیری زنده سفارش
            </button>

            <button
              onClick={() => setPage('order-history')}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              مشاهده فاکتور در تاریخچه سفارشات
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
