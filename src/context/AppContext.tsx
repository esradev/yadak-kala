import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageType, 
  Product, 
  CartItem, 
  UserVehicle, 
  Order, 
  Address, 
  ChatMessage 
} from '../types';
import { PRODUCTS, INITIAL_ORDERS } from '../data/mockData';
import { normalizePersian } from '../utils/persianUtils';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  // Navigation
  page: PageType;
  setPage: (page: PageType, extra?: { productId?: string; blogId?: string; trackingCode?: string; categoryId?: string; brandId?: string }) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBlogPostId: string | null;
  setSelectedBlogPostId: (id: string | null) => void;
  trackingQueryCode: string;
  setTrackingQueryCode: (code: string) => void;
  
  // Search and Filter global sync
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brandId: string | null) => void;
  selectedCarModelFilter: string | null;
  setSelectedCarModelFilter: (modelId: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, warranty?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Garage & Vehicle Compatibility
  isCarModalOpen: boolean;
  setIsCarModalOpen: (open: boolean) => void;
  userVehicle: UserVehicle | null;
  setUserVehicle: (v: UserVehicle | null) => void;
  savedVehicles: UserVehicle[];
  addSavedVehicle: (v: UserVehicle) => void;
  removeSavedVehicle: (id: string) => void;
  isCarCompatible: (product: Product, vehicle?: UserVehicle | null) => boolean | null;

  // Wishlist
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Orders & Tracking
  orders: Order[];
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  searchOrder: (trackingOrOrderNumber: string) => Order | null;
  createOrder: (orderData: Partial<Order>) => Order;

  // User Profile & Addresses
  user: {
    name: string;
    phone: string;
    nationalCode: string;
    walletBalance: number;
  };
  updateUserProfile: (data: Partial<{ name: string; phone: string; nationalCode: string }>) => void;
  userAddresses: Address[];
  addAddress: (addr: Address) => void;
  deleteAddress: (id: string) => void;

  // Live Chat
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isAgentTyping: boolean;
  unreadChatCount: number;
  resetUnreadChat: () => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPageState] = useState<PageType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('p-101');
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>('blog-1');
  const [trackingQueryCode, setTrackingQueryCode] = useState<string>('YK-849201');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCarModelFilter, setSelectedCarModelFilter] = useState<string | null>(null);

  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState({
    name: 'امیرحسین کاظمی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    nationalCode: '۰۰۱۲۳۴۵۶۷۸',
    walletBalance: 450000
  });

  const updateUserProfile = (data: Partial<{ name: string; phone: string; nationalCode: string }>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  // Cart with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('yadakkala_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { product: PRODUCTS[0], quantity: 1, selectedWarranty: '۱۲ ماه ضمانت کتبی خسارت موتور' },
      { product: PRODUCTS[1], quantity: 1, selectedWarranty: 'ضمانت تعویض در صورت سوت کشیدن' }
    ];
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Garage / User Vehicles
  const [savedVehicles, setSavedVehicles] = useState<UserVehicle[]>([
    {
      id: 'veh-1',
      brandId: 'ikco',
      brandName: 'ایران خودرو',
      modelId: 'peugeot-206-tu5',
      modelName: 'پژو ۲۰۶ (تیپ ۵ و ۶ موتور TU5)',
      year: '۱۳۹۸',
      plateNumber: 'ایران ۵۵ - ۷۲۹ ب ۱۲'
    },
    {
      id: 'veh-2',
      brandId: 'saipa',
      brandName: 'سایپا',
      modelId: 'quick',
      modelName: 'کوییک (ساده / R / اتوماتیک / S / GX)',
      year: '۱۴۰۱',
      plateNumber: 'ایران ۳۳ - ۴۱۵ ل ۸۸'
    }
  ]);

  const [userVehicle, setUserVehicle] = useState<UserVehicle | null>(savedVehicles[0]);

  // Wishlist
  const [favorites, setFavorites] = useState<string[]>(['p-101', 'p-103', 'p-106']);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('yadakkala_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[0]);

  // Addresses
  const [userAddresses, setUserAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      title: 'منزل شخصی',
      receiverName: 'امیرحسین کاظمی',
      receiverPhone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      postalCode: '۱۹۸۴۷۵۶۳۲۱',
      fullAddress: 'تهران، سعادت‌آباد، میدان کاج، خیابان سرو غربی، کوچه مروارید، پلاک ۱۲، واحد ۴',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'تعمیرگاه مجاز',
      receiverName: 'امیرحسین کاظمی (مکانیکی پارس)',
      receiverPhone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      postalCode: '۱۴۵۸۹۷۳۲۱۰',
      fullAddress: 'تهران، خیابان آزادی، تقاطع بهبودی، پلاک ۳۸۰',
      isDefault: false
    }
  ]);

  // Live Chat
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [unreadChatCount, setUnreadChatCount] = useState<number>(1);
  const [isAgentTyping, setIsAgentTyping] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'سلام! روزتون بخیر. من مهندس قاسمی، کارشناس فنی یدک‌کالا هستم. در انتخاب قطعه مناسب یا استعلام اصالت چطور می‌تونم راهنماییتون کنم؟',
      time: 'هم‌اکنون',
      actionButtons: [
        { label: 'استعلام قطعه بر اساس شماره شاسی / مدل', action: 'ask_part_compatibility' },
        { label: 'پیگیری زمان ارسال سفارش', action: 'ask_order_status' },
        { label: 'نحوه تشخیص قطعه اصل از تقلبی', action: 'ask_genuine_parts' }
      ]
    }
  ]);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('yadakkala_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('yadakkala_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setPage = (
    targetPage: PageType, 
    extra?: { productId?: string; blogId?: string; trackingCode?: string; categoryId?: string; brandId?: string }
  ) => {
    if (extra?.productId) setSelectedProductId(extra.productId);
    if (extra?.blogId) setSelectedBlogPostId(extra.blogId);
    if (extra?.categoryId) setSelectedCategory(extra.categoryId);
    if (extra?.brandId) setSelectedBrand(extra.brandId);
    if (extra?.trackingCode) {
      setTrackingQueryCode(extra.trackingCode);
      const found = searchOrder(extra.trackingCode);
      if (found) setActiveTrackingOrder(found);
    }
    setPageState(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, warranty?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedWarranty: warranty || product.warranty
        }
      ];
    });
    showToast(`«${product.title}» به سبد خرید اضافه شد.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('کالا از سبد خرید حذف شد.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'YADAK10' || cleanCode === 'OFF10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setCouponCode(cleanCode);
      setCouponDiscount(discount);
      showToast('کد تخفیف ۱۰ درصدی با موفقیت اعمال شد!', 'success');
      return { success: true, message: 'کد تخفیف ۱۰٪ اعمال شد' };
    }
    if (cleanCode === 'NOWRUZ' || cleanCode === 'YADAK200') {
      const discount = 200000;
      setCouponCode(cleanCode);
      setCouponDiscount(discount);
      showToast('کد تخفیف ۲۰۰ هزار تومانی اعمال شد!', 'success');
      return { success: true, message: 'کد تخفیف ۲۰۰ هزار تومانی اعمال شد' };
    }
    showToast('کد تخفیف وارد شده معتبر نیست یا منقضی شده است.', 'error');
    return { success: false, message: 'کد تخفیف نامعتبر است' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    showToast('کد تخفیف حذف شد.', 'info');
  };

  // Car Compatibility check
  const isCarCompatible = (product: Product, vehicle = userVehicle): boolean | null => {
    if (!vehicle) return null;
    return product.compatibleCars.some(
      (c) => c.modelId === vehicle.modelId || c.brandId === vehicle.brandId
    );
  };

  // Garage vehicles
  const addSavedVehicle = (v: UserVehicle) => {
    setSavedVehicles((prev) => [...prev, v]);
    setUserVehicle(v);
    showToast(`خودروی «${v.modelName}» به گاراژ شما افزوده شد.`, 'success');
  };

  const removeSavedVehicle = (id: string) => {
    setSavedVehicles((prev) => prev.filter((v) => v.id !== id));
    if (userVehicle?.id === id) {
      setUserVehicle(savedVehicles.find((v) => v.id !== id) || null);
    }
    showToast('خودرو از گاراژ حذف شد.', 'info');
  };

  // Favorites
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('از لیست علاقه‌مندی‌ها حذف شد.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('به لیست علاقه‌مندی‌ها اضافه شد.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Address
  const addAddress = (addr: Address) => {
    setUserAddresses((prev) => [...prev, addr]);
    showToast('آدرس جدید ذخیره شد.', 'success');
  };

  const deleteAddress = (id: string) => {
    setUserAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('آدرس حذف گردید.', 'info');
  };

  // Orders
  const searchOrder = (query: string): Order | null => {
    const clean = query.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        o.trackingCode?.toUpperCase() === clean ||
        o.orderNumber.includes(clean) ||
        (o.trackingCode && o.trackingCode.includes(clean))
    );
    return found || null;
  };

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrderNumber = `YK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTrackingCode = `TPX-${Math.floor(100000000 + Math.random() * 900000000)}`;
    
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      createdAt: 'هم‌اکنون (لحظاتی پیش)',
      items: orderData.items || [...cart],
      itemsTotal: orderData.itemsTotal || cartSubtotal,
      shippingFee: orderData.shippingFee || 0,
      discountAmount: orderData.discountAmount || couponDiscount,
      finalTotal: orderData.finalTotal || Math.max(0, cartSubtotal - couponDiscount + (orderData.shippingFee || 0)),
      status: 'registered',
      shippingAddress: orderData.shippingAddress || userAddresses[0],
      shippingMethod: orderData.shippingMethod || 'tipax',
      shippingMethodTitle: orderData.shippingMethodTitle || 'ارسال اکسپرس تیپاکس',
      trackingCode: newTrackingCode,
      paymentMethod: orderData.paymentMethod || 'online_gateway',
      paymentGateway: orderData.paymentGateway || 'shaparak',
      paymentStatus: 'paid',
      courierDetails: {
        driverName: 'در حال تخصیص به سفیر',
        driverPhone: '۰۲۱-۸۸۹۹۰۰۰۰',
        vehiclePlate: 'در انتظار پردازش انبار',
        estimatedDelivery: 'فردا بین ساعت ۱۰:۰۰ الی ۱۶:۰۰'
      },
      trackingTimeline: [
        {
          status: 'registered',
          title: 'ثبت سفارش و تایید پرداخت بانکی',
          description: 'سفارش شما با موفقیت ثبت و فاکتور فروش صادر گردید.',
          timestamp: 'هم‌اکنون',
          isCompleted: true,
          isCurrent: true,
          location: 'سامانه مرکزی یدک‌کالا',
          officerName: 'سیستم هوشمند'
        },
        {
          status: 'confirmed',
          title: 'بررسی کنترل کیفیت و اصالت پارت نامبر',
          description: 'قطعات انتخابی توسط کارشناس فنی جهت اصالت هولوگرام بررسی می‌شود.',
          timestamp: 'در نوبت پردازش',
          isCompleted: false,
          isCurrent: false,
          location: 'انبار مرکزی شماره ۱'
        },
        {
          status: 'packing',
          title: 'بسته‌بندی ضربه‌گیر ویژه قطعات حساس',
          description: 'کالاها در بسته‌بندی ضدضربه مهر و موم می‌شوند.',
          timestamp: 'در نوبت',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'handed_to_post',
          title: 'تحویل به ناوگان حمل و نقل',
          description: 'مرسوله با بارکد رسمی تحویل پست/تیپاکس خواهد شد.',
          timestamp: 'در نوبت',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'in_transit',
          title: 'در مسیر ارسال به آدرس مشتری',
          description: 'سفیر در حال حمل مرسوله به سمت مقصد می‌باشد.',
          timestamp: 'پیش‌بینی: فردا',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'delivered',
          title: 'تحویل به گیرنده',
          description: 'تحویل به مشتری و تایید نهایی.',
          timestamp: 'پیش‌بینی: فردا عصر',
          isCompleted: false,
          isCurrent: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    setTrackingQueryCode(newOrder.orderNumber);
    clearCart();
    return newOrder;
  };

  // Live Chat AI / Auto-reply Simulation
  const resetUnreadChat = () => setUnreadChatCount(0);

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: 'هم‌اکنون'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAgentTyping(true);

    const norm = normalizePersian(text);
    setTimeout(() => {
      let replyText = 'پیام شما دریافت شد. در حال حاضر همکاران فنی ما در انبار مرکزی پاسخگوی شما هستند.';
      let actionButtons: { label: string; action: string }[] | undefined;

      if (norm.includes('لنت') || norm.includes('ترمز')) {
        replyText = 'برای سیستم ترمز، لنت‌های تکستار (Textar) آلمان جعبه زرد و لنت الیگ کره سرامیکی بیشترین رضایت را دارند. برای خودروی شما (مثل ۲۰۶ یا سمند) لنت بدون سوت و با گارانتی تعویض ۳۰ روزه موجود است.';
        actionButtons = [
          { label: 'مشاهده لنت ترمز تکستار اصل', action: 'view_p102' },
          { label: 'تفاوت لنت سرامیکی و متالیک', action: 'faq_brakes' }
        ];
      } else if (norm.includes('تسمه') || norm.includes('تایم')) {
        replyText = 'کیت تسمه تایم کنتیننتال آلمان با گارانتی کتبی خسارت موتور و هرزگردهای اصل INA در انبار موجود و با تخفیف ویژه قابل سفارش است. برای اکثر خودروهای TU5 و EF7 تعویض در هر ۶۰ هزار کیلومتر توصیه می‌شود.';
        actionButtons = [
          { label: 'مشاهده کیت تسمه تایم کنتیننتال', action: 'view_p101' },
          { label: 'مقاله نشانه‌های خرابی تسمه تایم', action: 'view_blog_timing' }
        ];
      } else if (norm.includes('ارسال') || norm.includes('رهگیری') || norm.includes('کی میرسه') || norm.includes('تیپاکس')) {
        replyText = 'ارسال در شهر تهران ظرف ۲ تا ۴ ساعت با پیک موتوری فوری انجام می‌شود. سفارشات شهرستان نیز با تیپاکس ۲۴ تا ۴۸ ساعته تحویل می‌گردند. با وارد کردن شماره سفارش در بخش رهگیری زنده، می‌توانید موقعیت دقیق بسته را روی نقشه ببینید.';
        actionButtons = [
          { label: 'ورود به صفحه رهگیری زنده سفارش', action: 'nav_tracking' }
        ];
      } else if (norm.includes('اصل') || norm.includes('گارانتی') || norm.includes('تقلبی') || norm.includes('ایساکو')) {
        replyText = 'کلیه محصولات یدک‌کالا ۱۰۰٪ دارای هولوگرام شرکتی و شناسه استعلام سامانه جامع تجارت هستند. در صورت کوچکترین عدم تطابق، وجه پرداختی فوراً و بی قید و شرط عودت داده می‌شود.';
      } else if (norm.includes('کلاچ') || norm.includes('والئو') || norm.includes('دیسک')) {
        replyText = 'کیت کلاچ والئو فرانسه جعبه سبز با فنرهای دوبل پری دمپر پریمیوم برای رفع کامل لرزش در دنده یک و نرمی کلاچ در ترافیک موجود است.';
        actionButtons = [
          { label: 'مشاهده کیت کلاچ والئو فرانسه', action: 'view_p103' }
        ];
      } else {
        replyText = `ممنون از پیامتان درباره «${text}». اگر شماره شاسی (VIN) یا پارت‌نامبر قطعه را دارید بفرمایید تا دقیق‌ترین سازگاری را استعلام کنیم.`;
      }

      const agentMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: replyText,
        time: 'هم‌اکنون',
        actionButtons
      };

      setChatMessages((prev) => [...prev, agentMsg]);
      setIsAgentTyping(false);
      if (!chatOpen) {
        setUnreadChatCount((prev) => prev + 1);
      }
    }, 1200);
  };

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        selectedProductId,
        setSelectedProductId,
        selectedBlogPostId,
        setSelectedBlogPostId,
        trackingQueryCode,
        setTrackingQueryCode,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        selectedCarModelFilter,
        setSelectedCarModelFilter,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        userVehicle,
        setUserVehicle,
        isCarModalOpen,
        setIsCarModalOpen,
        savedVehicles,
        addSavedVehicle,
        removeSavedVehicle,
        isCarCompatible,
        favorites,
        toggleFavorite,
        isFavorite,
        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        searchOrder,
        createOrder,
        user,
        updateUserProfile,
        userAddresses,
        addAddress,
        deleteAddress,
        chatOpen,
        setChatOpen,
        chatMessages,
        sendChatMessage,
        isAgentTyping,
        unreadChatCount,
        resetUnreadChat,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
