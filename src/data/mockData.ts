import { CarBrand, Category, Product, Order, BlogPost, FAQItem } from '../types';

export const CAR_BRANDS: CarBrand[] = [
  {
    id: 'ikco',
    name: 'ایران خودرو',
    englishName: 'IKCO',
    logo: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=100&auto=format&fit=crop&q=80',
    models: [
      { id: 'peugeot-206-tu5', brandId: 'ikco', name: 'پژو ۲۰۶ (تیپ ۵ و ۶ موتور TU5)', years: '۱۳۸۲ - ۱۴۰۲', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80' },
      { id: 'peugeot-206-tu3', brandId: 'ikco', name: 'پژو ۲۰۶ (تیپ ۲ و ۳ موتور TU3)', years: '۱۳۸۰ - ۱۴۰۱', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&auto=format&fit=crop&q=80' },
      { id: 'peugeot-207', brandId: 'ikco', name: 'پژو ۲۰۷i (دنده‌ای / اتوماتیک)', years: '۱۳۸۹ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80' },
      { id: 'peugeot-pars', brandId: 'ikco', name: 'پژو پارس (XU7P / TU5 / ELX)', years: '۱۳۷۹ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80' },
      { id: 'samand-ef7', brandId: 'ikco', name: 'سمند / سورن پلاس (موتور EF7)', years: '۱۳۸۷ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=300&auto=format&fit=crop&q=80' },
      { id: 'dena-plus', brandId: 'ikco', name: 'دنا و دنا پلاس (توربو / اتوماتیک)', years: '۱۳۹۵ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=80' },
      { id: 'tara', brandId: 'ikco', name: 'تارا (دنده‌ای / اتوماتیک V4)', years: '۱۴۰۰ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&auto=format&fit=crop&q=80' },
      { id: 'peugeot-405', brandId: 'ikco', name: 'پژو ۴۰۵ (GLX / SLX)', years: '۱۳۷۰ - ۱۳۹۹', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'saipa',
    name: 'سایپا',
    englishName: 'Saipa',
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100&auto=format&fit=crop&q=80',
    models: [
      { id: 'pride', brandId: 'saipa', name: 'پراید (۱۳۱ / ۱۳۲ / ۱۱۱ / صبا)', years: '۱۳۷۲ - ۱۳۹۹', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80' },
      { id: 'tiba', brandId: 'saipa', name: 'تیبا و تیبا ۲', years: '۱۳۸۸ - ۱۴۰۱', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80' },
      { id: 'quick', brandId: 'saipa', name: 'کوییک (ساده / R / اتوماتیک / S / GX)', years: '۱۳۹۷ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=80' },
      { id: 'saina', brandId: 'saipa', name: 'ساینا (EX / S / S دنده‌ای و اتومات)', years: '۱۳۹۵ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80' },
      { id: 'shahin', brandId: 'saipa', name: 'شاهین (G / GL / اتوماتیک CVT)', years: '۱۴۰۰ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'renault',
    name: 'رنو',
    englishName: 'Renault',
    logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=100&auto=format&fit=crop&q=80',
    models: [
      { id: 'l90', brandId: 'renault', name: 'تندر ۹۰ (ال۹۰ / پلاس / وانت)', years: '۱۳۸۶ - ۱۳۹۸', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80' },
      { id: 'sandero', brandId: 'renault', name: 'ساندرو و ساندرو استپ‌وی', years: '۱۳۹۴ - ۱۳۹۸', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=80' },
      { id: 'megane', brandId: 'renault', name: 'مگان (۱۶۰۰ و ۲۰۰۰)', years: '۱۳۸۷ - ۱۳۹۳', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'hyundai',
    name: 'هیوندای',
    englishName: 'Hyundai',
    logo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=100&auto=format&fit=crop&q=80',
    models: [
      { id: 'santafe-dm', brandId: 'hyundai', name: 'سانتافه (DM / گرند)', years: '۲۰۱۳ - ۲۰۱۸', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&auto=format&fit=crop&q=80' },
      { id: 'sonata-yf-lf', brandId: 'hyundai', name: 'سوناتا (YF و LF هیبرید)', years: '۲۰۱۱ - ۲۰۱۸', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80' },
      { id: 'tucson-ix35', brandId: 'hyundai', name: 'توسان (ix35 و TL)', years: '۲۰۱۰ - ۲۰۱۸', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80' },
      { id: 'elantra', brandId: 'hyundai', name: 'النترا (MD و AD)', years: '۲۰۱۳ - ۲۰۱۸', image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'kia',
    name: 'کیا',
    englishName: 'Kia',
    logo: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&auto=format&fit=crop&q=80',
    models: [
      { id: 'cerato', brandId: 'kia', name: 'سراتو (سایپایی ۲۰۰۰ و ۱۶۰۰ / وارداتی)', years: '۱۳۹۳ - ۱۳۹۸', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80' },
      { id: 'optima', brandId: 'kia', name: 'اپتیما (TF و JF)', years: '۲۰۱۲ - ۲۰۱۷', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&auto=format&fit=crop&q=80' },
      { id: 'sportage', brandId: 'kia', name: 'اسپورتیج (SL و QL)', years: '۲۰۱۱ - ۲۰۱۷', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'mvm-chery',
    name: 'مدیران خودرو (ام‌وی‌ام / فونیکس)',
    englishName: 'MVM / Chery',
    logo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
    models: [
      { id: 'mvm-315', brandId: 'mvm-chery', name: 'ام وی ام ۳۱۵ (هاچبک / پلاس)', years: '۱۳۹۱ - ۱۴۰۰', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80' },
      { id: 'mvm-x22', brandId: 'mvm-chery', name: 'ام وی ام X22 و X22 پرو', years: '۱۳۹۶ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=80' },
      { id: 'chery-arrizo5', brandId: 'mvm-chery', name: 'آریزو ۵ (توربو / IE / اسپرت)', years: '۱۳۹۶ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&auto=format&fit=crop&q=80' },
      { id: 'chery-tiggo7', brandId: 'mvm-chery', name: 'تیگو ۷ و تیگو ۷ پرو', years: '۱۳۹۶ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'jac',
    name: 'کرمان موتور (جک JAC)',
    englishName: 'JAC',
    logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=100&auto=format&fit=crop&q=80',
    models: [
      { id: 'jac-j5', brandId: 'jac', name: 'جک J5 (دنده‌ای / اتومات ۱.۸)', years: '۱۳۹۲ - ۱۳۹۷', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&auto=format&fit=crop&q=80' },
      { id: 'jac-s5', brandId: 'jac', name: 'جک S5 (دنده‌ای / اتوماتیک توربو)', years: '۱۳۹۴ - ۱۴۰۲', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=80' },
      { id: 'kmt-k7', brandId: 'jac', name: 'کی‌ام‌سی KMC K7 / J7', years: '۱۴۰۰ - ۱۴۰۳', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&auto=format&fit=crop&q=80' },
    ]
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'brake-system',
    name: 'سیستم ترمز و دیسک',
    slug: 'brake-system',
    iconName: 'Disc',
    description: 'انواع لنت ترمز سرامیکی و متالیک، دیسک چرخ، پمپ ترمز، بوستر و شیلنگ‌های ترمز با اصالت تضمین شده',
    itemCount: 142,
    image: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'engine-parts',
    name: 'قطعات موتوری و سیلندر',
    slug: 'engine-parts',
    iconName: 'Cog',
    description: 'کیت تسمه تایم، واشر سرسیلندر، سوپاپ، پیستون، یاتاقان، شمع و کوئل اصل و شرکتی',
    itemCount: 260,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'suspension-steering',
    name: 'جلوبندی و سیستم تعلیق',
    slug: 'suspension-steering',
    iconName: 'Wrench',
    description: 'کمک فنر گازی و روغنی، سیبک فرمان، طبق، میل موجگیر، جعبه فرمان و بلبرینگ چرخ',
    itemCount: 185,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'filters-fluids',
    name: 'فیلترها و روغن موتور',
    slug: 'filters-fluids',
    iconName: 'Droplets',
    description: 'روغن موتورهای فول سنتتیک، فیلتر روغن، فیلتر هوا، صافی بنزین و فیلتر کابین اصل',
    itemCount: 95,
    image: 'https://images.unsplash.com/photo-1527383418445-4714ff999ff8?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'electrical-sensors',
    name: 'برق، باتری و سنسورها',
    slug: 'electrical-sensors',
    iconName: 'Zap',
    description: 'باتری خودرو، استارت، دینام، سنسور اکسیژن، سنسور مپ، رله‌ها و کامپیوتر خودرو (ECU)',
    itemCount: 130,
    image: 'https://images.unsplash.com/photo-1558441719-58ae6a02932c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'transmission-clutch',
    name: 'گیربکس و دیسک و صفحه',
    slug: 'transmission-clutch',
    iconName: 'Layers',
    description: 'کیت کلاچ والئو و دایکن، دوشاخه کلاچ، دنده برنجی، فلایویل و کاسه‌نمدهای گیربکس',
    itemCount: 110,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'body-lighting',
    name: 'بدنه، چراغ و آینه‌ها',
    slug: 'body-lighting',
    iconName: 'Sun',
    description: 'چراغ‌های جلو و عقب کروز و مدرن، پروژکتور، آینه بغل برقی، سپر و جلوپنجره شرکتی',
    itemCount: 88,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cooling-heating',
    name: 'رادیاتور، کولر و بخاری',
    slug: 'cooling-heating',
    iconName: 'Wind',
    description: 'رادیاتور آب دو لول، کندانسور کولر، فن رادیاتور، واتر پمپ، ترموستات و ضد یخ اورجینال',
    itemCount: 75,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-101',
    title: 'کیت کامل تسمه تایم کنتیننتال Continental پژو ۲۰۶ تیپ ۵ و ۲۰۷ موتور TU5',
    partNumber: 'CONTITECH-CT1065K1',
    brand: 'کنتیننتال (Continental Contitech)',
    brandOrigin: 'آلمان (ساخت رومانی تحت لیسانس)',
    category: 'engine-parts',
    subCategory: 'تسمه تایم',
    price: 1850000,
    originalPrice: 2150000,
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    stockCount: 28,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'کیت کامل تسمه تایمینگ کنتیننتال اورجینال شامل یک عدد تسمه با ۱۳۴ دندانه تقویت شده با الیاف آرامید ضد پارگی و دو عدد هرزگرد (تسمه سفت‌کن بلبرینگ دار اینا INA). مناسب برای تمامی خودروهای خانواده موتور TU5 شامل ۲۰۶ تیپ ۵ و ۶، پژو ۲۰۷، پارس TU5، رانا، رانا پلاس و تارا. این کیت دارای برچسب شناسه رهگیری سامانه جامع تجارت و هولوگرام اصالت شرکتی می‌باشد.',
    technicalSpecs: [
      { label: 'تعداد دندانه‌ها', value: '۱۳۴ دندانه (پهنای تسمه ۲۵.۴ میلی‌متر)' },
      { label: 'متعلقات کیت', value: 'تسمه تایم + هرزگرد ثابت + هرزگرد ساعتی سفت‌کن' },
      { label: 'طول عمر مفید', value: '۶۰,۰۰۰ کیلومتر یا ۴ سال' },
      { label: 'مقاومت حرارتی', value: 'تا ۱۴۰ درجه سانتی‌گراد (HNBR)' },
      { label: 'استاندارد', value: 'OEM پژو فرانسه PSA B71 2290' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-206-tu5', modelName: 'پژو ۲۰۶ تیپ ۵ و ۶', yearRange: '۱۳۸۲ تا ۱۴۰۲' },
      { brandId: 'ikco', modelId: 'peugeot-207', modelName: 'پژو ۲۰۷i تمام مدل‌ها', yearRange: '۱۳۸۹ تا ۱۴۰۳' },
      { brandId: 'ikco', modelId: 'peugeot-pars', modelName: 'پژو پارس موتور TU5', yearRange: '۱۳۸۸ تا ۱۴۰۲' },
      { brandId: 'ikco', modelId: 'tara', modelName: 'تارا دنده‌ای و اتوماتیک', yearRange: '۱۴۰۰ تا ۱۴۰۳' }
    ],
    isGenuine: true,
    warranty: '۱۲ ماه یا ۵۰ هزار کیلومتر ضمانت کتبی پارگی و خسارت موتور',
    tags: ['پرفروش', 'اصل آلمان', 'کیت تسمه تایم', 'موتور TU5', 'تضمین خسارت موتور', 'تخفیف ویژه'],
    featured: true,
    bestSeller: true,
    specialOffer: true,
    weightKg: 1.2
  },
  {
    id: 'p-102',
    title: 'لنت ترمز جلو تکستار TEXTAR اصل آلمان جعبه زرد پژو ۲۰۶، ۲۰۷ و رانا',
    partNumber: 'TEXTAR-2391401',
    brand: 'تکستار (Textar / TMD Friction)',
    brandOrigin: 'آلمان (OEM اصلی خط تولید فرانسه)',
    category: 'brake-system',
    subCategory: 'لنت ترمز',
    price: 1390000,
    originalPrice: 1600000,
    discountPercent: 13,
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 45,
    images: [
      'https://images.unsplash.com/photo-1600790142055-619df03207e6?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'لنت ترمز چرخ‌های جلو برند مشهور آلمانی تکستار (Textar) با فرمولاسیون پیشرفته نیمه سرامیکی بدون ایجاد سوت، غبار سیاه و داغ کردن در ترمزگیری‌های پیاپی شهری و جاده‌ای. دارای صفحه ضد لرزش و شیار هدایت حرارت و گازهای داغ. سازگار با کلیه کالیپرهای لوکاس و بوش نصب شده روی خودروهای ۲۰۶، ۲۰۷، رانا و پژو پارس TU5.',
    technicalSpecs: [
      { label: 'موقعیت نصب', value: 'چرخ‌های جلو (دست کامل ۴ عددی)' },
      { label: 'نوع ترکیب مواد', value: 'Low-Metallic نیمه سرامیکی فاقد آزبست' },
      { label: 'ضریب سایش', value: 'فرمول اختصاصی با کمترین آسیب به دیسک چرخ' },
      { label: 'شناسه تاییدیه', value: 'ECE R90 اتحادیه اروپا' },
      { label: 'کشور سازنده', value: 'آلمان به سفارش ایساکو کد جعبه زرد' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-206-tu5', modelName: 'پژو ۲۰۶ تیپ ۵ و ۶', yearRange: '۱۳۸۴ تا ۱۴۰۲' },
      { brandId: 'ikco', modelId: 'peugeot-207', modelName: 'پژو ۲۰۷i دنده‌ای و اتومات', yearRange: '۱۳۸۹ تا ۱۴۰۳' },
      { brandId: 'ikco', modelId: 'peugeot-pars', modelName: 'پژو پارس موتور TU5 چرخ جلو', yearRange: '۱۳۹۲ تا ۱۴۰۲' }
    ],
    isGenuine: true,
    warranty: 'ضمانت تعویض در صورت ایجاد سوت و عدم رضایت تا ۳۰ روز',
    tags: ['پرفروش', 'بدون سوت', 'لنت جلو', 'تکستار اصل', 'تضمین اصالت'],
    featured: true,
    bestSeller: true,
    specialOffer: false,
    weightKg: 1.6
  },
  {
    id: 'p-103',
    title: 'کیت کلاچ والئو فرانسه جعبه سبز (دیسک، صفحه و بلبرینگ) پژو ۴۰۵، پارس و سمند',
    partNumber: 'VALEO-826360-GREEN',
    brand: 'والئو (Valeo)',
    brandOrigin: 'فرانسه (کد فنی والئو کلودیو)',
    category: 'transmission-clutch',
    subCategory: 'دیسک و صفحه کلاچ',
    price: 4950000,
    originalPrice: 5600000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 97,
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'دیسک و صفحه کلاچ والئو اصل فرانسه با جعبه سبز نمادین و هولوگرام کد ماتریس سه‌بعدی هرینگتون. طراحی شده با فنرهای دوبل تقویتی و لنت پری دمپر برای حذف کامل لرزش در نیم کلاچ و نرمی فوق‌العاده پدال کلاچ مانند خودروهای صفر کیلومتر اروپایی. مناسب موتورهای ۱۸۰۰ سی‌سی XU7 و XU7P و همچنین موتورهای EF7 بنزینی و پایه گازسوز.',
    technicalSpecs: [
      { label: 'قطر صفحه کلاچ', value: '۲۰۰ میلی‌متر با فنرهای دوبل تقویت شده' },
      { label: 'تعداد خار شفت', value: '۱۸ خار استاندارد جعبه دنده BE3' },
      { label: 'بلبرینگ کلاچ', value: 'بلبرینگ اصلی والئو فرانسه دور بالا' },
      { label: 'فناوری', value: 'Pre-Damper نرم‌کننده استارت حرکت' },
      { label: 'وزن بسته کامل', value: '۴.۸ کیلوگرم' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-405', modelName: 'پژو ۴۰۵ بنزینی و دوگانه‌سوز', yearRange: '۱۳۷۵ تا ۱۳۹۹' },
      { brandId: 'ikco', modelId: 'peugeot-pars', modelName: 'پژو پارس موتور سال و XU7P', yearRange: '۱۳۸۰ تا ۱۴۰۳' },
      { brandId: 'ikco', modelId: 'samand-ef7', modelName: 'سمند LX و سورن پلاس', yearRange: '۱۳۸۵ تا ۱۴۰۳' },
      { brandId: 'ikco', modelId: 'dena-plus', modelName: 'دنا و دنا پلاس تنفس طبیعی', yearRange: '۱۳۹۵ تا ۱۴۰۲' }
    ],
    isGenuine: true,
    warranty: '۱۸ ماه ضمانت بی قید و شرط تعویض با فاکتور رسمی',
    tags: ['والئو اصل', 'پدال کلاچ نرم', 'ضد لرزش', 'گارانتی ۱۸ ماهه', 'ارسال رایگان'],
    featured: true,
    bestSeller: true,
    specialOffer: true,
    weightKg: 4.8
  },
  {
    id: 'p-104',
    title: 'دست کامل شمع خودرو ایریدیوم بوش Bosch سوزنی پایه کوتاه اصل آلمان (۴ عددی)',
    partNumber: 'BOSCH-0242236564-FR7KI332S',
    brand: 'بوش (BOSCH)',
    brandOrigin: 'آلمان (German Engineering)',
    category: 'engine-parts',
    subCategory: 'شمع و سیستم جرقه‌زنی',
    price: 1250000,
    originalPrice: 1480000,
    discountPercent: 15,
    rating: 5.0,
    reviewsCount: 63,
    inStock: true,
    stockCount: 50,
    images: [
      'https://images.unsplash.com/photo-1558441719-58ae6a02932c?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'شمع سوزنی ایریدیوم پلاتینیوم بوش اصل آلمان پایه کوتاه با الکترود مرکزی ۰.۶ میلی‌متری از جنس ایریدیوم خالص. این شمع با ایجاد جرقه با ولتاژ متمرکز باعث احتراق کامل سوخت، کاهش محسوس مصرف بنزین، کاهش لرزش موتور در دور آرام و شتاب‌گیری روان‌تر خودرو می‌گردد. طول عمر مفید این شمع‌ها بیش از ۸۰,۰۰۰ کیلومتر می‌باشد.',
    technicalSpecs: [
      { label: 'نوع آلیاژ مغزی', value: 'سوزنی ایریدیوم-پلاتینیوم با نوک لیزری' },
      { label: 'طول رزوه و پایه', value: '۱۹ میلی‌متر (پایه کوتاه رزوه ۱۴)' },
      { label: 'سایز آچار', value: '۱۶ میلی‌متر استاندارد' },
      { label: 'گپ فیلر کارخانه', value: '۰.۹ میلی‌متر کالیبره شده' },
      { label: 'کارکرد مفید', value: '۸۰,۰۰۰ الی ۱۰۰,۰۰۰ کیلومتر' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-405', modelName: 'پژو ۴۰۵ و پارس موتور XU7', yearRange: '۱۳۷۵ تا ۱۴۰۳' },
      { brandId: 'saipa', modelId: 'pride', modelName: 'انواع پراید انژکتوری و یورو ۴', yearRange: '۱۳۸۴ تا ۱۳۹۹' },
      { brandId: 'saipa', modelId: 'tiba', modelName: 'تیبا ۱ و تیبا ۲', yearRange: '۱۳۸۹ تا ۱۴۰۱' },
      { brandId: 'saipa', modelId: 'quick', modelName: 'کوییک و ساینا موتور M15', yearRange: '۱۳۹۵ تا ۱۴۰۳' },
      { brandId: 'renault', modelId: 'l90', modelName: 'تندر ۹۰ و ساندرو موتور K4M', yearRange: '۱۳۸۶ تا ۱۳۹۸' }
    ],
    isGenuine: true,
    warranty: 'ضمانت اصالت فیزیکی مادام‌العمر و کارکرد ۸۰ هزار کیلومتر',
    tags: ['ایریدیوم', 'کاهش مصرف بنزین', 'افزایش شتاب', 'بوش اصل آلمان'],
    featured: true,
    bestSeller: false,
    specialOffer: true,
    weightKg: 0.3
  },
  {
    id: 'p-105',
    title: 'کمک فنر جلو راست و چپ گازی روغنی KDS کوشاوران مناسب تیبا، ساینا و کوییک',
    partNumber: 'KDS-SAIPA-GAS04',
    brand: 'کی دی اس (KDS / کوشاوران تحت لیسانس کره)',
    brandOrigin: 'کره جنوبی / تولید ایران',
    category: 'suspension-steering',
    subCategory: 'کمک فنر',
    price: 2480000,
    originalPrice: 2850000,
    discountPercent: 13,
    rating: 4.7,
    reviewsCount: 48,
    inStock: true,
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600790142055-619df03207e6?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'جفت کمک فنر چرخ‌های جلو هیدرولیک-گازی KDS مدل اسپرت و استاندارد با قابلیت جذب فوق‌العاده ناهمواری‌ها و دست‌اندازهای جاده‌ای و شهری. جلوگیری از کوبش اتاق خودرو در سرعت‌گیرها و افزایش پایداری و تعادل خودرو در پیچ‌ها. تولید شده با میله پیستون سخت‌کاری شده ضد خط و خش با آب‌بندی پیشرفته.',
    technicalSpecs: [
      { label: 'موقعیت نصب', value: 'محور جلو (یک جفت چپ و راست)' },
      { label: 'مکانیزم عملکرد', value: 'دو جداره هیدرولیک نیتروژن گازی' },
      { label: 'قطر شفت', value: '۲۰ میلی‌متر تقویت شده' },
      { label: 'تاییدیه کیفی', value: 'استاندارد ملی ایران و ایزو TS16949' }
    ],
    compatibleCars: [
      { brandId: 'saipa', modelId: 'tiba', modelName: 'تیبا و تیبا ۲', yearRange: '۱۳۸۹ تا ۱۴۰۱' },
      { brandId: 'saipa', modelId: 'saina', modelName: 'ساینا تمامی مدل‌ها', yearRange: '۱۳۹۵ تا ۱۴۰۳' },
      { brandId: 'saipa', modelId: 'quick', modelName: 'کوییک ساده، R و اتومات', yearRange: '۱۳۹۷ تا ۱۴۰۳' }
    ],
    isGenuine: true,
    warranty: '۱۲ ماه گارانتی تعویض بی قید و شرط شرکتی کوشاوران',
    tags: ['کمک فنر گازی', 'نرمی خودرو', 'ضد کوبش', 'کوییک و ساینا'],
    featured: false,
    bestSeller: true,
    specialOffer: false,
    weightKg: 8.5
  },
  {
    id: 'p-106',
    title: 'روغن موتور کاسترول مگناتک Castrol Magnatec ویسکوزیته 10W-40 حجم ۵ لیتر',
    partNumber: 'CASTROL-MAG-10W40-5L',
    brand: 'کاسترول (Castrol)',
    brandOrigin: 'انگلستان (تولید تحت لیسانس قشم)',
    category: 'filters-fluids',
    subCategory: 'روغن موتور',
    price: 1180000,
    originalPrice: 1350000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 140,
    inStock: true,
    stockCount: 65,
    images: [
      'https://images.unsplash.com/photo-1527383418445-4714ff999ff8?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'روغن موتور نیمه سنتتیک کاسترول مگناتک ۱۰W-۴۰ با مولکول‌های هوشمند مغناطیسی دوتایی که مانند آهنربا به سطوح فلزی موتور در زمان خاموش بودن می‌چسبند و از سایش اولیه هنگام استارت سرد تا ۷۵٪ محافظت می‌کنند. دارای سطح کیفیت API SN بالاترین استاندارد بنزینی انجمن نفت آمریکا مناسب انواع خودروهای توربوشارژ و تنفس طبیعی داخلی و وارداتی.',
    technicalSpecs: [
      { label: 'سطح گرانروی (Viscosity)', value: 'SAE 10W-40 نیمه سنتتیک' },
      { label: 'سطح کیفیت API', value: 'API SN / CF مناسب خودروهای بنزینی و دیزل سبک' },
      { label: 'حجم گالن', value: '۵ لیتر اقتصادی' },
      { label: 'تاییدیه خودروسازان', value: 'تاییدیه رسمی پژو سیتروئن و رنو فرانسه' },
      { label: 'کارکرد پیشنهادی', value: '۸,۰۰۰ تا ۱۰,۰۰۰ کیلومتر' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-206-tu5', modelName: 'پژو ۲۰۶ و ۲۰۷ موتور TU5', yearRange: '۱۳۸۲ تا ۱۴۰۳' },
      { brandId: 'ikco', modelId: 'samand-ef7', modelName: 'سمند و دنا موتور EF7', yearRange: '۱۳۸۸ تا ۱۴۰۳' },
      { brandId: 'ikco', modelId: 'peugeot-pars', modelName: 'پژو پارس و ۴۰۵ موتور XU7 و TU5', yearRange: '۱۳۸۰ تا ۱۴۰۳' },
      { brandId: 'renault', modelId: 'l90', modelName: 'ال ۹۰ و ساندرو موتور K4M', yearRange: '۱۳۸۶ تا ۱۳۹۸' },
      { brandId: 'jac', modelId: 'jac-s5', modelName: 'جک S5 و J5 دنده‌ای', yearRange: '۱۳۹۳ تا ۱۴۰۲' }
    ],
    isGenuine: true,
    warranty: 'تضمین صد در صد اصالت کالا و برچسب پلمپ شرکتی',
    tags: ['روغن موتور', 'کاسترول اصل', 'سطح SN', 'مولکول هوشمند', 'پرفروش'],
    featured: true,
    bestSeller: true,
    specialOffer: false,
    weightKg: 4.6
  },
  {
    id: 'p-107',
    title: 'چراغ جلو چپ و راست مدرن / کروز CROUSE فابریک پژو ۲۰۷ با موتور تنظیم ارتفاع',
    partNumber: 'CROUSE-P207-HL-PAIR',
    brand: 'کروز (CROUSE)',
    brandOrigin: 'ایران (تامین‌کننده اصلی خط تولید ایران خودرو)',
    category: 'body-lighting',
    subCategory: 'چراغ و روشنایی',
    price: 3650000,
    originalPrice: 4100000,
    discountPercent: 11,
    rating: 4.8,
    reviewsCount: 39,
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'جفت چراغ جلو فابریک شرکتی پژو ۲۰۷ تولید شرکت معتبر کروز با لنز شفاف پلی‌کربنات مقاوم در برابر مات شدن، زردی نور آفتاب و نفوذ آب. مجهز به موتور برقی فابریک تنظیم زاویه پرتاب نور از داخل کابین و دیلایت LED نئونی استاندارد روز. اتصال سوکت به سوکت بدون نیاز به سیم‌کشی اضافه.',
    technicalSpecs: [
      { label: 'محتویات جعبه', value: 'یک جفت چراغ کامل چپ (راننده) و راست (شاگرد)' },
      { label: 'موتور تنظیم ارتفاع', value: 'دارای موتور برقی فابریک داخلی' },
      { label: 'جنس طلق', value: 'پلی‌کربنات ضد خش و ضد اشعه UV آفتاب' },
      { label: 'استاندارد عایق‌بندی', value: 'IP67 کاملاً ضد آب و بخار' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-207', modelName: 'پژو ۲۰۷i کلیه مدل‌های هاچبک و سدان', yearRange: '۱۳۸۹ تا ۱۴۰۳' }
    ],
    isGenuine: true,
    warranty: 'گارانتی ۱۲ ماهه عدم کدری طلق و عملکرد موتور برقی',
    tags: ['چراغ فابریک', 'کروز شرکتی', 'پژو ۲۰۷', 'دیلایت دار', 'ضد آب'],
    featured: false,
    bestSeller: false,
    specialOffer: true,
    weightKg: 5.4
  },
  {
    id: 'p-108',
    title: 'رادیاتور آب دو لول آلومینیومی کوشش رادیاتور پژو ۴۰۵، پارس و سمند موتور XU7',
    partNumber: 'KOUSHESH-RAD-405-2ROW',
    brand: 'کوشش رادیاتور (Koushesh Radiator)',
    brandOrigin: 'ایران (دارنده نشان استاندارد ملی و گواهی ایزو)',
    category: 'cooling-heating',
    subCategory: 'رادیاتور و خنک‌کننده',
    price: 1980000,
    originalPrice: 2280000,
    discountPercent: 13,
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'رادیاتور آب دو لول پهن آلومینیومی با بالاترین راندمان انتقال حرارت، مناسب مناطق گرمسیری و جلوگیری از واشر زدن و بالا رفتن آمپر آب خودروهای پژو ۴۰۵، پارس سال و سمند. لوله‌های آلومینیومی با جوش فرکانس بالا و مخازن پلی‌آمیدی الیاف‌دار مقاوم در برابر فشارهای بالای سیستم خنک‌کننده.',
    technicalSpecs: [
      { label: 'تعداد ردیف لوله‌ها', value: 'دو لول پهن دابل (Double Row)' },
      { label: 'جنس پره‌ها و بدنه', value: 'آلومینیوم اکسترود با پوشش ضد رسوب' },
      { label: 'راندمان خنک‌کاری', value: 'تا ۳۵٪ خنک‌کاری بیشتر نسبت به تک لول معمولی' },
      { label: 'گارانتی شرکت سازنده', value: 'کارت طلایی ۲۴ ماه تعویض' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-405', modelName: 'پژو ۴۰۵ بنزین و دوگانه سوز', yearRange: '۱۳۷۸ تا ۱۳۹۹' },
      { brandId: 'ikco', modelId: 'peugeot-pars', modelName: 'پژو پارس موتور XU7', yearRange: '۱۳۸۰ تا ۱۴۰۲' },
      { brandId: 'ikco', modelId: 'samand-ef7', modelName: 'سمند موتور معمولی XU7', yearRange: '۱۳۸۳ تا ۱۳۹۸' }
    ],
    isGenuine: true,
    warranty: '۲۴ ماه ضمانت بی قید و شرط کوشش رادیاتور',
    tags: ['رادیاتور دو لول', 'ضد جوش', 'گارانتی ۲ ساله', 'پژو ۴۰۵ و پارس'],
    featured: true,
    bestSeller: false,
    specialOffer: false,
    weightKg: 3.9
  },
  {
    id: 'p-109',
    title: 'سنسور اکسیژن سوکت خاکستری بوش آلمان اصل پژو ۲۰۶، ۲۰۷ و رانا (موتور TU5)',
    partNumber: 'BOSCH-O2-0258006028',
    brand: 'بوش (BOSCH)',
    brandOrigin: 'آلمان (Original OEM)',
    category: 'electrical-sensors',
    subCategory: 'سنسورها و ECU',
    price: 1750000,
    originalPrice: 2050000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 71,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1558441719-58ae6a02932c?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600790142055-619df03207e6?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'سنسور اکسیژن بالا (پیش‌کاتالیست) بوش آلمان با سوکت طوسی/خاکستری ۴ فیش مخصوص ایسیوهای بوش ME7.4.4 و ME7.4.5 و Easy-U. حل مشکل خام‌سوزی، بوی بد اگزوز، کاهش دود سیاه و کپ کردن در شتاب‌گیری اولیه خودروهای موتور TU5. دارای المنت گرم‌کن سریع (Fast Heating).',
    technicalSpecs: [
      { label: 'موقعیت سنسور', value: 'بالا - روی منیفولد خروجی دود' },
      { label: 'رنگ سوکت', value: 'خاکستری / طوسی ۴ پین گرد' },
      { label: 'زمان گرم شدن', value: 'کمتر از ۱۰ ثانیه' },
      { label: 'سازگاری ECU', value: 'Bosch ME7.4.4 / ME7.4.5 / غرب استیل' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-206-tu5', modelName: 'پژو ۲۰۶ تیپ ۵ فرانسوی و ایرانی', yearRange: '۱۳۸۲ تا ۱۴۰۲' },
      { brandId: 'ikco', modelId: 'peugeot-207', modelName: 'پژو ۲۰۷i دستی و اتومات', yearRange: '۱۳۸۹ تا ۱۴۰۲' }
    ],
    isGenuine: true,
    warranty: '۱۲ ماه ضمانت دقت عملکرد و رفع خطای سنسور',
    tags: ['سنسور اکسیژن', 'بوش اصل', 'رفع خام سوزی', 'موتور TU5'],
    featured: false,
    bestSeller: false,
    specialOffer: false,
    weightKg: 0.25
  },
  {
    id: 'p-110',
    title: 'مجموعه جلوبندی کامل ۱۲ تکه امیرنیا AMIRNIA مناسب پراید، تیبا و کوییک',
    partNumber: 'AMIRNIA-SET-PRIDE12',
    brand: 'امیرنیا (Amirnia)',
    brandOrigin: 'ایران (برترین برند صادراتی قطعات تعلیق)',
    category: 'suspension-steering',
    subCategory: 'کیت کامل جلوبندی',
    price: 2150000,
    originalPrice: 2490000,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'پک اقتصادی کامل نوسازی سیستم تعلیق جلو شامل ۲ عدد سیبک طبق، ۲ عدد سیبک فرمان، ۲ عدد قرقری فرمان، لاستیک‌های تعادل چاکدار، بوش‌های جناقی و بوش لبه‌دار با متریال پلی‌اورتان تقویت شده مقاوم در برابر پارگی و پوسیدگی ناشی از روغن‌ریزی و رطوبت.',
    technicalSpecs: [
      { label: 'اقلام موجود در بسته', value: '۱۲ تکه شامل طبق، سیبک‌ها، قرقری و کلیه بوش‌ها' },
      { label: 'جنس بوش‌ها', value: 'لاستیک طبیعی تقویت شده با پلی‌آمید' },
      { label: 'مقاومت کششی', value: 'تحمل بار محوری فراتر از استاندارد ISIRI' },
      { label: 'گارانتی کارخانه', value: '۱۸ ماه ضمانت بی قید و شرط تعویض قطعه' }
    ],
    compatibleCars: [
      { brandId: 'saipa', modelId: 'pride', modelName: 'انواع پراید صبا، ۱۱۱، ۱۳۱ و ۱۳۲', yearRange: '۱۳۷۵ تا ۱۳۹۹' },
      { brandId: 'saipa', modelId: 'tiba', modelName: 'تیبا ۱ و تیبا ۲', yearRange: '۱۳۸۹ تا ۱۴۰۱' },
      { brandId: 'saipa', modelId: 'quick', modelName: 'کوییک دنده‌ای و اتومات', yearRange: '۱۳۹۷ تا ۱۴۰۳' }
    ],
    isGenuine: true,
    warranty: '۱۸ ماه ضمانت تعویض با فاکتور معتبر شرکتی امیرنیا',
    tags: ['جلوبندی کامل', 'امیرنیا', 'بی صدا سازی', 'پراید و کوییک', 'تخفیف ویژه'],
    featured: true,
    bestSeller: true,
    specialOffer: true,
    weightKg: 6.2
  },
  {
    id: 'p-111',
    title: 'کیت کامل تسمه دینام و هرزگردهای ایساکو پژو ۲۰۶ تیپ ۲ موتور TU3 و تیپ ۵',
    partNumber: 'ISACO-6PK1565-KIT',
    brand: 'ایساکو (ISACO شرکتی)',
    brandOrigin: 'ایران به سفارش ایران خودرو',
    category: 'engine-parts',
    subCategory: 'تسمه دینام',
    price: 890000,
    originalPrice: 1050000,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 34,
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'کیت اصلی شرکتی ایساکو شامل تسمه شیاردار دینام اورجینال سایز 6PK1565 به همراه هرزگرد ثابت و هرزگرد ساعتی فنردار اتوماتیک. تضمین بی صدا کار کردن سیستم هیدرولیک فرمان، دینام و کمپرسور کولر بدون سوت کشیدن در هوای بارانی.',
    technicalSpecs: [
      { label: 'سایز تسمه دینام', value: '۶ شیار طول ۱۵۶۵ میلی‌متر (6PK1565)' },
      { label: 'متعلقات کیت', value: 'تسمه دینام + هرزگرد ثابت + هرزگرد متحرک ساعتی' },
      { label: 'کیفیت بلبرینگ‌ها', value: 'بلبرینگ‌های دور بالا با گریس نسوز لیتیومی' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-206-tu5', modelName: 'پژو ۲۰۶ تیپ ۵ با کولر هیدرولیک', yearRange: '۱۳۸۲ تا ۱۴۰۲' },
      { brandId: 'ikco', modelId: 'peugeot-206-tu3', modelName: 'پژو ۲۰۶ تیپ ۲ و ۳', yearRange: '۱۳۸۰ تا ۱۴۰۱' },
      { brandId: 'ikco', modelId: 'peugeot-207', modelName: 'پژو ۲۰۷i تمام مدل‌ها', yearRange: '۱۳۸۹ تا ۱۴۰۳' }
    ],
    isGenuine: true,
    warranty: 'ضمانت اصالت شرکتی با هولوگرام امنیتی ایساکو',
    tags: ['تسمه دینام', 'ایساکو شرکتی', 'پژو ۲۰۶', 'بی صدا'],
    featured: false,
    bestSeller: false,
    specialOffer: false,
    weightKg: 1.1
  },
  {
    id: 'p-112',
    title: 'پک کامل فیلترهای سرکان (فیلتر روغن، فیلتر هوا، فیلتر کابین و صافی بنزین) پژو ۲۰۶ و ۲۰۷',
    partNumber: 'SERKAN-FILTERS-P206',
    brand: 'سرکان (Serkan Filter)',
    brandOrigin: 'ایران (دارای گواهینامه معتبر TUV آلمان)',
    category: 'filters-fluids',
    subCategory: 'پک فیلترها',
    price: 460000,
    originalPrice: 530000,
    discountPercent: 13,
    rating: 4.9,
    reviewsCount: 165,
    inStock: true,
    stockCount: 90,
    images: [
      'https://images.unsplash.com/photo-1527383418445-4714ff999ff8?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'پک اقتصادی فیلتراسیون ۴ تکه سرکان شامل فیلتر روغن المنتی استاندارد با کاغذ فیلتراسیون آلمانی، فیلتر هوای تزریقی با فوم نرم بدون نشتی گرد و غبار، فیلتر کابین کربن اکتیو ضد آلرژی و گرده گل و صافی بنزین آلومینیومی انژکتور.',
    technicalSpecs: [
      { label: 'محتویات پک', value: '۴ قلم (فیلتر هوا + فیلتر روغن + فیلتر کابین + صافی بنزین)' },
      { label: 'جنس کاغذ فیلتر', value: 'سلولز تقویت شده با رزین فنولیک Ahlstrom' },
      { label: 'دقت فیلتراسیون', value: 'جذب ذرات میکرونی تا ۱۰ میکرون' }
    ],
    compatibleCars: [
      { brandId: 'ikco', modelId: 'peugeot-206-tu5', modelName: 'پژو ۲۰۶ تیپ ۵ و ۶', yearRange: '۱۳۸۲ تا ۱۴۰۲' },
      { brandId: 'ikco', modelId: 'peugeot-207', modelName: 'پژو ۲۰۷i تمام نسخه‌ها', yearRange: '۱۳۸۹ تا ۱۴۰۳' },
      { brandId: 'ikco', modelId: 'tara', modelName: 'تارا دنده‌ای و اتوماتیک', yearRange: '۱۴۰۰ تا ۱۴۰۳' }
    ],
    isGenuine: true,
    warranty: 'ضمانت اصالت و سلامت فیزیکی سرکان',
    tags: ['پک سرویس دوره‌ای', 'سرکان اصل', 'ارزش خرید بالا', 'ارسال سریع'],
    featured: true,
    bestSeller: true,
    specialOffer: false,
    weightKg: 0.8
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    userId: 'u-1',
    userName: 'علیرضا حسینی',
    rating: 5,
    date: '۲ روز پیش',
    carModelUsed: 'پژو ۲۰۶ تیپ ۵ مدل ۹۸',
    title: 'تسمه تایم کنتیننتال فوق‌العاده باکیفیت و اصل',
    comment: 'من مکانیکم و همیشه این کیت کنتیننتال رو برای مشتری‌هام پیشنهاد میدم. کدهای اصالت روی جعبه با سامانه پیامکی ایساکو تایید شد و هرزگردهای اینا کاملاً بلبرینگ روان و فاقد لقی دارند. ممنون از بسته‌بندی عالی یدک‌کالا.',
    pros: ['اصالت صد در صدی قطعه', 'هرزگردهای اینا داخل کیت', 'ارسال بسیار سریع با تیپاکس'],
    cons: ['قیمتش نسبت به نمونه‌های بی‌کیفیت بالاتره ولی ارزش سلامت موتور رو داره'],
    isVerifiedBuyer: true,
    likesCount: 24
  },
  {
    id: 'rev-2',
    userId: 'u-2',
    userName: 'مهدی رضایی',
    rating: 5,
    date: 'هفته گذشته',
    carModelUsed: 'پژو ۲۰۷ دنده‌ای مدل ۱۴۰۱',
    title: 'لنت تکستار بدون کمترین صدا و سوت',
    comment: 'قبل از این لنت متفرقه انداخته بودم موقع ترمز کشیدن جیغ وحشتناکی میزد و رینگ چرخ‌ها هم پر از دوده سیاه میشد. این تکستار رو نصب کردم، پدال ترمز عالی شد و هیچ صدایی نمیده.',
    pros: ['ترمزگیری نرم و قوی', 'بدون داغ کردن و سوت', 'کیفیت ساخت بالا'],
    cons: [],
    isVerifiedBuyer: true,
    likesCount: 19
  },
  {
    id: 'rev-3',
    userId: 'u-3',
    userName: 'رضا کریمی',
    rating: 5,
    date: '۲ هفته پیش',
    carModelUsed: 'پژو پارس موتور XU7',
    title: 'کلاچ والئو سبز ماشین رو مثل روز اول نرم کرد',
    comment: 'پدال کلاچ ماشینم طوری سفت شده بود که پای چپم تو ترافیک تهران فلج میشد! با تعویض این کیت والئو، کلاچ با نوک انگشت پایین میره و لرزش دنده یک کاملاً از بین رفت.',
    pros: ['نرمی باورنکردنی پدال کلاچ', 'شتاب‌گیری عالی بدون بکسواد', 'گارانتی ۱۸ ماهه'],
    cons: ['نیاز به تراشکاری دقیق فلایویل قبل نصب داره'],
    isVerifiedBuyer: true,
    likesCount: 31
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'YK-849201',
    createdAt: '۱۴۰۳/۰۵/۲۸ ساعت ۱۱:۳۰',
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedWarranty: '۱۲ ماه ضمانت کتبی خسارت موتور'
      },
      {
        product: PRODUCTS[1],
        quantity: 1,
        selectedWarranty: 'ضمانت تعویض بدون قید و شرط'
      }
    ],
    itemsTotal: 3240000,
    shippingFee: 0,
    discountAmount: 200000,
    finalTotal: 3040000,
    status: 'in_transit',
    shippingAddress: {
      id: 'addr-1',
      title: 'منزل',
      receiverName: 'امیرحسین کاظمی',
      receiverPhone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      postalCode: '۱۹۸۴۷۵۶۳۲۱',
      fullAddress: 'تهران، سعادت‌آباد، میدان کاج، خیابان سرو غربی، کوچه مروارید، پلاک ۱۲، واحد ۴',
      isDefault: true
    },
    shippingMethod: 'tipax',
    shippingMethodTitle: 'ارسال اکسپرس با تیپاکس سراسر کشور',
    trackingCode: 'TPX-982173465',
    paymentMethod: 'online_gateway',
    paymentGateway: 'shaparak',
    paymentStatus: 'paid',
    courierDetails: {
      driverName: 'آقای بهنام اکبری (سفیر تیپاکس)',
      driverPhone: '۰۹۳۵۱۲۳۴۵۶۷',
      vehiclePlate: 'ایران ۷۷ - ۴۲۱ ج ۹۳',
      estimatedDelivery: 'امروز بین ساعت ۱۵:۰۰ تا ۱۸:۰۰',
      currentCoords: { lat: 35.7592, lng: 51.3789 }
    },
    trackingTimeline: [
      {
        status: 'registered',
        title: 'ثبت سفارش در سامانه',
        description: 'سفارش شما با موفقیت ثبت شد و پرداخت تایید گردید.',
        timestamp: '۱۴۰۳/۰۵/۲۸ - ۱۱:۳۰',
        isCompleted: true,
        isCurrent: false,
        location: 'سامانه مرکزی یدک‌کالا',
        officerName: 'سیستم خودکار'
      },
      {
        status: 'confirmed',
        title: 'بررسی سلامت و اصالت فنی کالا',
        description: 'قطعات انتخابی با کدهای اصالت شرکتی توسط کارشناس فنی بررسی و تایید شد.',
        timestamp: '۱۴۰۳/۰۵/۲۸ - ۱۲:۱۵',
        isCompleted: true,
        isCurrent: false,
        location: 'انبار مرکزی شماره ۱ تهران',
        officerName: 'مهندس حسینی (کنترل کیفی)'
      },
      {
        status: 'packing',
        title: 'بسته‌بندی ضربه‌گیر ضد شوک',
        description: 'کالاها با فوم محافظ حباب‌دار و بسته‌بندی ضد ضربه مخصوص قطعات حساس آماده شد.',
        timestamp: '۱۴۰۳/۰۵/۲۸ - ۱۳:۴۰',
        isCompleted: true,
        isCurrent: false,
        location: 'واحد پردازش و ارسال انبار',
        officerName: 'مسئول بسته‌بندی: آقای مرادی'
      },
      {
        status: 'handed_to_post',
        title: 'تحویل به ناوگان تیپاکس',
        description: 'بسته جهت ارسال سریع با کد پیگیری TPX-982173465 به نماینده تیپاکس تحویل داده شد.',
        timestamp: '۱۴۰۳/۰۵/۲۸ - ۱۵:۱۰',
        isCompleted: true,
        isCurrent: false,
        location: 'مرکز مبادلات تیپاکس منطقه ۲',
        officerName: 'سفیر توزیع: آقای بهنام اکبری'
      },
      {
        status: 'in_transit',
        title: 'در مسیر تحویل به مشتری',
        description: 'سفیر در حال حرکت به سمت آدرس گیرنده می‌باشد.',
        timestamp: '۱۴۰۳/۰۵/۲۸ - ۱۶:۰۵',
        isCompleted: false,
        isCurrent: true,
        location: 'منطقه ۲ تهران (در حرکت)',
        officerName: 'سفیر توزیع'
      },
      {
        status: 'delivered',
        title: 'تحویل سفارش به مشتری',
        description: 'تحویل مرسوله و دریافت امضای الکترونیک مشتری.',
        timestamp: 'پیش‌بینی: امروز ساعت ۱۷:۳۰',
        isCompleted: false,
        isCurrent: false,
        location: 'آدرس مشتری'
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'YK-739182',
    createdAt: '۱۴۰۳/۰۵/۱۴ ساعت ۰۹:۱۵',
    items: [
      {
        product: PRODUCTS[2],
        quantity: 1,
        selectedWarranty: '۱۸ ماه ضمانت تعویض'
      }
    ],
    itemsTotal: 4950000,
    shippingFee: 0,
    discountAmount: 0,
    finalTotal: 4950000,
    status: 'delivered',
    shippingAddress: {
      id: 'addr-2',
      title: 'تعمیرگاه مجاز',
      receiverName: 'امیرحسین کاظمی',
      receiverPhone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      postalCode: '۱۴۵۸۹۷۳۲۱۰',
      fullAddress: 'تهران، خیابان آزادی، تقاطع بهبودی، تعمیرگاه تخصصی پارس تکنیک',
      isDefault: false
    },
    shippingMethod: 'courier_instant',
    shippingMethodTitle: 'پیک فوری موتوری شهر تهران',
    trackingCode: 'EXP-8891024',
    paymentMethod: 'online_gateway',
    paymentGateway: 'zarinpal',
    paymentStatus: 'paid',
    trackingTimeline: [
      {
        status: 'registered',
        title: 'ثبت سفارش',
        description: 'سفارش ثبت و پرداخت شد.',
        timestamp: '۱۴۰۳/۰۵/۱۴ - ۰۹:۱۵',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'confirmed',
        title: 'تایید انبار',
        description: 'قطعه از انبار خارج شد.',
        timestamp: '۱۴۰۳/۰۵/۱۴ - ۰۹:۴۰',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'handed_to_post',
        title: 'تحویل به پیک',
        description: 'بسته به پیک موتوری تحویل گردید.',
        timestamp: '۱۴۰۳/۰۵/۱۴ - ۱۰:۱۰',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'delivered',
        title: 'تحویل داده شد',
        description: 'مرسوله با موفقیت به گیرنده تحویل شد.',
        timestamp: '۱۴۰۳/۰۵/۱۴ - ۱۱:۰۵',
        isCompleted: true,
        isCurrent: true
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'علائم هشداردهنده خرابی تسمه تایم و عواقب خطرناک پارگی آن در خودروهای داخلی',
    slug: 'timing-belt-failure-symptoms',
    summary: 'پارگی تسمه تایم می‌تواند میلیون‌ها تومان خسارت به سرسیلندر و سوپاپ‌های خودرو وارد کند. با این نشانه‌ها به موقع تسمه تایم را تعویض کنید.',
    content: [
      'تسمه تایم یکی از حیاتی‌ترین قطعات موتوری خودرو است که وظیفه هماهنگ‌سازی گردش میل‌لنگ با میل‌سوپاپ را بر عهده دارد. در صورتی که این تسمه دچار پارگی یا رد کردن دندانه شود، سوپاپ‌ها با پیستون برخورد کرده و موتور دچار کج شدن سوپاپ و آسیب شدید سرسیلندر می‌گردد.',
      'اصلی‌ترین نشانه‌های فرسودگی تسمه تایم عبارتند از: ایجاد صدای جیرجیر یا غژغژ از سمت قاب تسمه تایم، بد کار کردن و لرزش شدید موتور در حالت درجا، دود غیرعادی اگزوز به دلیل به هم خوردن تایمینگ جرقه‌زنی، و کاهش کشش و شتاب خودرو.',
      'پیشنهاد کارشناسان یدک‌کالا: در خودروهای پرکاربرد مانند ۲۰۶، ۲۰۷، پارس TU5 و سمند EF7 حتماً تسمه تایم را هر ۵۰ الی ۶۰ هزار کیلومتر یا حداکثر پس از ۴ سال تعویض نمایید. همچنین همواره کیت کامل شامل هرزگردها را تعویض کنید تا بلبرینگ کهنه باعث پارگی تسمه نو نشود.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'مهندس بابک شمس',
      role: 'کارشناس ارشد مکانیک خودرو',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    category: 'آموزش فنی و نگهداری',
    readingTimeMinutes: 5,
    date: '۲۴ مرداد ۱۴۰۳',
    views: 3420,
    tags: ['تسمه تایم', 'موتور TU5', 'تعمیرات خودرو', 'نکات نگهداری'],
    relatedProductIds: ['p-101', 'p-111']
  },
  {
    id: 'blog-2',
    title: 'راهنمای جامع انتخاب روغن موتور مناسب: تفاوت 10W-40 و 5W-30 و استانداردهای API',
    slug: 'engine-oil-buying-guide',
    summary: 'چگونه بهترین روغن موتور را برای آب و هوای ایران و نوع موتور خودروی خود انتخاب کنیم؟ بررسی استانداردهای SN، گرانروی و روغن‌های تمام سنتتیک.',
    content: [
      'انتخاب روغن موتور نامناسب یا تقلبی می‌تواند باعث جرم‌گرفتگی کانال‌های روغن، خرابی یاتاقان‌ها و از کار افتادن تایپیت‌های هیدرولیکی شود. اعداد روی قوطی روغن مانند 10W-40 نشان‌دهنده ویسکوزیته روغن در دماهای سرد زمستانی (W = Winter) و دمای گرم کاری موتور (۱۰۰ درجه سانتی‌گراد) است.',
      'برای موتورهای مدرن‌تر مانند TU5، تارا و شاهین توربو استفاده از روغن‌های فول سنتتیک با گرانروی 5W-40 یا 10W-40 با سطح کیفی API SN توصیه می‌شود. در مناطق گرمسیری جنوب کشور نیز انتخاب روغن با پایداری حرارتی بالاتر ضروری است.',
      'همیشه فیلتر روغن را همراه با تعویض روغن تعویض کنید تا ذرات براده و دوده ته‌نشین شده در فیلتر قدیمی وارد روغن نو نشوند.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1527383418445-4714ff999ff8?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'سهراب مرادی',
      role: 'متخصص روانکارهای صنعتی',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    category: 'راهنمای خرید روغن',
    readingTimeMinutes: 6,
    date: '۱۸ مرداد ۱۴۰۳',
    views: 4890,
    tags: ['روغن موتور', 'کاسترول', 'سرویس دوره‌ای', 'فیلتر روغن'],
    relatedProductIds: ['p-106', 'p-112']
  },
  {
    id: 'blog-3',
    title: 'چرا ترمز ماشین سوت می‌کشد؟ علت‌های اصلی و راهکارهای رفع صدای لنت ترمز',
    slug: 'why-brakes-squeal-guide',
    summary: 'صدای سوت آزاردهنده ترمز نشانه چیست؟ از لنت‌های نامرغوب فاقد گرافیت تا لبه‌دار شدن دیسک چرخ و راه حل قطعی رفع آن.',
    content: [
      'صدای سوت ترمز یکی از شایع‌ترین شکایات رانندگان در ترافیک‌های شهری است. لنت‌های ارزان‌قیمت بازار به دلیل داشتن براده‌های فلزی درشت و استفاده نکردن از پودر مس و سرامیک، هنگام اصطکاک با دیسک چرخ تولید فرکانس صوتی تیز و سوت‌مانند می‌کنند.',
      'علاوه بر کیفیت لنت، لبه دار شدن دیسک چرخ، زنگ‌زدگی پین‌های کالیپر ترمز و عدم نصب فنرهای ضد لرزش (Anti-Rattle Clips) از دیگر عوامل بروز این مشکل هستند.',
      'پیشنهاد ما استفاده از لنت‌های نیمه سرامیکی معتبر مانند تکستار (Textar) با جعبه معتبر و بررسی لبه دیسک چرخ قبل از نصب لنت جدید است.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?w=800&auto=format&fit=crop&q=80',
    author: {
      name: 'مهندس بابک شمس',
      role: 'کارشناس ارشد مکانیک خودرو',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    category: 'سیستم ترمز',
    readingTimeMinutes: 4,
    date: '۱۲ مرداد ۱۴۰۳',
    views: 2980,
    tags: ['لنت ترمز', 'رفع صدای سوت', 'دیسک چرخ', 'تکستار'],
    relatedProductIds: ['p-102']
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'genuine',
    question: 'چگونه از اصالت و ارجینال بودن قطعات خریداری شده مطمئن شوم؟',
    answer: 'تمامی قطعات ارائه شده در یدک‌کالا دارای هولوگرام اصلی شرکت‌های سازنده (نظیر ایساکو، سایپا یدک، والئو فرانسه، کنتیننتال، بوش و کروز) و کد شناسه رهگیری سامانه جامع تجارت هستند. ما ۱۰۰٪ اصالت فیزیکی تمامی کالاها را با ضمانت کتبی بازگشت وجه تضمین می‌نماییم.'
  },
  {
    id: 'faq-2',
    category: 'compatibility',
    question: 'چطور بفهمم یک قطعه با مدل دقیق خودروی من سازگار است؟',
    answer: 'شما می‌توانید با استفاده از قابلیت «گاراژ من» در بالای سایت، خودروی خود (برند، مدل، سال ساخت و نوع موتور) را انتخاب کنید. پس از انتخاب، تمام قطعات موجود در سایت با نشانگر سبز سازگاری بررسی می‌شوند. همچنین کارشناسان فنی ما در چت آنلاین ۲۴ ساعته پاسخگوی سوالات شما هستند.'
  },
  {
    id: 'faq-3',
    category: 'shipping',
    question: 'زمان و نحوه ارسال سفارشات به تهران و شهرستان‌ها چگونه است؟',
    answer: 'برای شهر تهران، سفارشات از طریق پیک فوری موتوری ظرف ۲ الی ۴ ساعت در همان روز تحویل داده می‌شوند. برای سراسر کشور، ارسال از طریق تیپاکس (تحویل ۲۴ تا ۴۸ ساعته) و پست پیشتاز انجام می‌گیرد. شما پس از ثبت سفارش، کد رهگیری زنده دریافت می‌کنید.'
  },
  {
    id: 'faq-4',
    category: 'return',
    question: 'شرایط بازگشت کالا (ضمانت ۷ روزه مرجوعی) چیست؟',
    answer: 'چنانچه قطعه خریداری شده باز نشده باشد یا عدم تطابق با سفارش داشته باشد، تا ۷ روز پس از دریافت، امکان عودت بی قید و شرط وجود دارد. برای قطعات دارای گارانتی کارکرد (مانند کیت کلاچ یا تسمه تایم) تا پایان مدت گارانتی، خدمات تعویض قطعه ارائه می‌گردد.'
  },
  {
    id: 'faq-5',
    category: 'payment',
    question: 'روش‌های پرداخت به چه صورت است؟',
    answer: 'پرداخت از طریق کلیه کارت‌های عضو شبکه شتاب با درگاه‌های امن بانکی (شاپرک، زرین‌پال، بانک ملت و سامان) امکان‌پذیر است. همچنین برای شهر تهران امکان پرداخت در محل (کارتخوان سیار پیک) فراهم می‌باشد.'
  }
];
