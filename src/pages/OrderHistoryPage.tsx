import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { formatToman, toPersianDigits } from '../utils/persianUtils';
import { 
  FileText, 
  Truck, 
  RotateCcw, 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  Package, 
  Printer, 
  X,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';

export const OrderHistoryPage: React.FC = () => {
  const { orders, setPage, setActiveTrackingOrder, setTrackingQueryCode, addToCart } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const handleTrack = (order: Order) => {
    setActiveTrackingOrder(order);
    setTrackingQueryCode(order.orderNumber);
    setPage('order-tracking', { trackingCode: order.orderNumber });
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    setPage('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-7 h-7 text-amber-500" />
            تاریخچه و پیگیری سفارشات
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مشاهده سوابق خرید، چاپ پیش‌فاکتور رسمی و رهگیری بلادرنگ
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'همه سفارش‌ها' },
            { id: 'in_transit', label: 'در حال ارسال' },
            { id: 'delivered', label: 'تحویل شده' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterStatus === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isDelivered = order.status === 'delivered';
            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-black text-base text-slate-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      ثبت: {order.createdAt}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isDelivered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {isDelivered ? 'تحویل داده شده' : 'در مسیر ارسال به مقصد'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      مشاهده فاکتور
                    </button>

                    <button
                      onClick={() => handleTrack(order)}
                      className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      رهگیری زنده
                    </button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-xl object-cover bg-white"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex justify-between">
                          <span>{toPersianDigits(item.quantity)} عدد</span>
                          <span className="font-bold text-slate-800">{formatToman(item.product.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom details */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-3">
                    <span>روش ارسال: <strong className="text-slate-800">{order.shippingMethodTitle}</strong></span>
                    <span>کد رهگیری: <strong className="text-sky-700 font-mono">{order.trackingCode}</strong></span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-left">
                      <span>مبلغ کل پرداخت شده: </span>
                      <strong className="text-sm text-slate-900 font-black">{formatToman(order.finalTotal)}</strong>
                    </div>

                    <button
                      onClick={() => handleReorder(order)}
                      className="text-xs text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      خرید مجدد
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <Package className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="font-bold text-slate-800 text-sm">سفارشی در این وضعیت یافت نشد.</h3>
        </div>
      )}

      {/* Invoice Modal Simulation */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  یدک
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">صورت‌حساب رسمی فروش کالا و خدمات</h3>
                  <p className="text-[10px] text-slate-400">شرکت بازرگانی یدک‌کالا ایرانیان (شماره ثبت ۵۹۲۸۴)</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">شماره فاکتور:</span>
                <span className="font-mono font-bold text-slate-800">{selectedInvoiceOrder.orderNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">تاریخ صدور:</span>
                <span className="font-bold text-slate-800">{selectedInvoiceOrder.createdAt}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">نام خریدار:</span>
                <span className="font-bold text-slate-800">{selectedInvoiceOrder.shippingAddress.receiverName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">وضعیت مالی:</span>
                <span className="font-bold text-emerald-600">تسویه شده (شاپرک)</span>
              </div>
            </div>

            {/* Invoice Table */}
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2.5 rounded-r-xl">شرح کالا / قطعه</th>
                  <th className="p-2.5 text-center">تعداد</th>
                  <th className="p-2.5">قیمت واحد</th>
                  <th className="p-2.5 rounded-l-xl text-left">مبلغ کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoiceOrder.items.map((item) => (
                  <tr key={item.product.id}>
                    <td className="p-2.5">
                      <div className="font-bold text-slate-800">{item.product.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.product.partNumber}</div>
                    </td>
                    <td className="p-2.5 text-center font-bold">{toPersianDigits(item.quantity)}</td>
                    <td className="p-2.5">{formatToman(item.product.price)}</td>
                    <td className="p-2.5 text-left font-bold">{formatToman(item.product.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="pt-3 border-t border-slate-200 text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span>جمع اقلام:</span>
                <span>{formatToman(selectedInvoiceOrder.itemsTotal)}</span>
              </div>
              {selectedInvoiceOrder.discountAmount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>تخفیف:</span>
                  <span>- {formatToman(selectedInvoiceOrder.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>هزینه حمل و نقل:</span>
                <span>{selectedInvoiceOrder.shippingFee === 0 ? 'رایگان' : formatToman(selectedInvoiceOrder.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t">
                <span>مبلغ کل پرداخت شده:</span>
                <span className="text-amber-600">{formatToman(selectedInvoiceOrder.finalTotal)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" />
                چاپ یا ذخیره PDF فاکتور
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
