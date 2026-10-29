export type PageType = 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-tracking' 
  | 'order-history' 
  | 'profile' 
  | 'contact' 
  | 'about' 
  | 'faq' 
  | 'blog' 
  | 'blog-detail';

export interface CarBrand {
  id: string;
  name: string; // e.g. ایران خودرو
  englishName: string; // e.g. Iran Khodro
  logo: string;
  models: CarModel[];
}

export interface CarModel {
  id: string;
  brandId: string;
  name: string; // e.g. پژو ۲۰۶ تیپ ۵
  years: string; // e.g. ۱۳۸۵ - ۱۴۰۲
  image: string;
}

export interface Category {
  id: string;
  name: string; // e.g. سیستم ترمز
  slug: string;
  iconName: string;
  description: string;
  itemCount: number;
  image: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  date: string;
  carModelUsed?: string;
  title: string;
  comment: string;
  pros?: string[];
  cons?: string[];
  isVerifiedBuyer: boolean;
  likesCount: number;
}

export interface ProductQA {
  id: string;
  question: string;
  askerName: string;
  date: string;
  answer?: string;
  answeredBy?: string;
  answerDate?: string;
}

export interface Product {
  id: string;
  title: string; // e.g. لنت ترمز جلو تکستار اصل آلمان
  partNumber: string; // OEM e.g. TEXTAR-2391401
  brand: string; // e.g. تکستار (Textar)
  brandOrigin: string; // e.g. آلمان / ایران
  category: string; // category id
  subCategory?: string;
  price: number; // in Tomans
  originalPrice?: number; // before discount
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  description: string;
  technicalSpecs: ProductSpecification[];
  compatibleCars: {
    brandId: string;
    modelId: string;
    modelName: string;
    yearRange: string;
  }[];
  isGenuine: boolean;
  warranty: string; // e.g. گارانتی ۱۲ ماهه بی قید و شرط
  tags: string[]; // e.g. ["پرفروش", "اصل شرکتی", "لنت جلو", "گارانتی اصالت"]
  featured?: boolean;
  bestSeller?: boolean;
  specialOffer?: boolean;
  weightKg?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWarranty?: string;
}

export interface Address {
  id: string;
  title: string; // e.g. منزل، محل کار
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  isDefault: boolean;
}

export interface UserVehicle {
  id: string;
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  year: string;
  vin?: string;
  plateNumber?: string;
}

export type OrderStatus = 
  | 'registered'      // ثبت شده
  | 'confirmed'       // تایید فنی و موجودی
  | 'packing'         // بسته‌بندی در انبار
  | 'handed_to_post'  // تحویل به پست/تیپاکس
  | 'in_transit'      // در مسیر ارسال
  | 'delivered'       // تحویل شده
  | 'cancelled';      // لغو شده

export interface TrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
  location?: string;
  officerName?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. YK-892104
  createdAt: string;
  items: CartItem[];
  itemsTotal: number;
  shippingFee: number;
  discountAmount: number;
  finalTotal: number;
  status: OrderStatus;
  shippingAddress: Address;
  shippingMethod: 'tipax' | 'post_express' | 'courier_instant' | 'freight';
  shippingMethodTitle: string;
  trackingCode?: string;
  paymentMethod: 'online_gateway' | 'cod' | 'wallet';
  paymentGateway?: 'zarinpal' | 'mellat' | 'saman' | 'shaparak';
  paymentStatus: 'paid' | 'pending' | 'failed';
  trackingTimeline: TrackingStep[];
  courierDetails?: {
    driverName: string;
    driverPhone: string;
    vehiclePlate: string;
    estimatedDelivery: string;
    currentCoords?: { lat: number; lng: number };
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  readingTimeMinutes: number;
  date: string;
  views: number;
  tags: string[];
  relatedProductIds: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'genuine' | 'shipping' | 'return' | 'payment' | 'compatibility';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  time: string;
  image?: string;
  actionButtons?: { label: string; action: string }[];
}
