import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Mic, 
  Sparkles, 
  Car, 
  Check, 
  ChevronRight,
  HelpCircle,
  Truck
} from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const { 
    chatOpen, 
    setChatOpen, 
    chatMessages, 
    sendChatMessage, 
    isAgentTyping, 
    unreadChatCount, 
    resetUnreadChat,
    setPage 
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      resetUnreadChat();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatOpen, chatMessages, isAgentTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    sendChatMessage(inputMsg);
    setInputMsg('');
  };

  const handleActionButton = (action: string) => {
    if (action === 'ask_part_compatibility') {
      sendChatMessage('می‌خواهم بدونم فلان قطعه با شماره شاسی خودرو من سازگاره یا نه.');
    } else if (action === 'ask_order_status') {
      sendChatMessage('سفارش من در چه وضعیتی قرار داره و کی تحویل میشه؟');
    } else if (action === 'ask_genuine_parts') {
      sendChatMessage('چطور از اصالت هولوگرام و سامانه شناسه کالا مطمئن بشم؟');
    } else if (action === 'view_p101') {
      setPage('product-detail', { productId: 'p-101' });
    } else if (action === 'view_p102') {
      setPage('product-detail', { productId: 'p-102' });
    } else if (action === 'view_p103') {
      setPage('product-detail', { productId: 'p-103' });
    } else if (action === 'nav_tracking') {
      setPage('order-tracking');
    } else if (action === 'view_blog_timing') {
      setPage('blog-detail', { blogId: 'blog-1' });
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
        aria-label="پشتیبانی آنلاین و مشاوره مکانیک"
      >
        <div className="relative">
          {chatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}

          {!chatOpen && unreadChatCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-rose-600 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {unreadChatCount}
            </span>
          )}
        </div>
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-l from-slate-900 via-slate-800 to-amber-950 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
                  <Car className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  کارشناس فنی یدک‌کالا
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    آنلاین
                  </span>
                </h4>
                <p className="text-[11px] text-slate-300">
                  پاسخگویی سریع به سوالات فنی و سفارشات
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ / Auto prompts banner */}
          <div className="bg-amber-50/70 p-2 border-b border-amber-100/70 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <span className="text-amber-800 font-bold flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              سوالات پرتکرار:
            </span>
            <button
              onClick={() => sendChatMessage('لنت ترمز مناسب و بدون سوت چی پیشنهاد می‌کنید؟')}
              className="bg-white border border-amber-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-amber-100 transition-colors flex-shrink-0"
            >
              لنت ترمز بدون سوت
            </button>
            <button
              onClick={() => sendChatMessage('زمان تعویض کیت تسمه تایم چقدره؟')}
              className="bg-white border border-amber-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-amber-100 transition-colors flex-shrink-0"
            >
              عمر تسمه تایم
            </button>
            <button
              onClick={() => sendChatMessage('نحوه رهگیری زنده سفارش با کد پیگیری چطوره؟')}
              className="bg-white border border-amber-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-amber-100 transition-colors flex-shrink-0"
            >
              رهگیری سفارش
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-amber-500 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Action Buttons if any */}
                    {msg.actionButtons && msg.actionButtons.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                        {msg.actionButtons.map((btn, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionButton(btn.action)}
                            className="w-full text-right bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold py-1.5 px-2.5 rounded-xl transition-colors flex items-center justify-between"
                          >
                            <span>{btn.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 rotate-180 text-amber-600" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              );
            })}

            {isAgentTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white p-2.5 rounded-2xl rounded-bl-none border border-slate-200 w-28 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] mr-1 text-slate-500">پاسخگویی...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-3 py-1.5 border border-slate-200 focus-within:border-amber-500 focus-within:bg-white transition-colors">
              <input
                type="text"
                placeholder="سوال فنی خود را بپرسید..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-transparent text-xs text-slate-900 focus:outline-none placeholder:text-slate-400 py-1.5"
              />
              
              <button
                type="button"
                onClick={() => sendChatMessage('تصویر قطعه ارسال شد (بررسی فیزیکی اصالت)')}
                className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-slate-200 transition-colors"
                title="ارسال عکس قطعه"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white p-2 rounded-xl transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      )}
    </>
  );
};
