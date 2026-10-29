// Persian number and string utilities

export function toPersianDigits(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return '';
  const str = String(input);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

export function formatToman(amount: number | undefined | null, includeUnit: boolean = true): string {
  if (amount === undefined || amount === null) return '۰ تومان';
  const formatted = Math.round(amount).toLocaleString('en-US');
  const persianFormatted = toPersianDigits(formatted);
  return includeUnit ? `${persianFormatted} تومان` : persianFormatted;
}

export function normalizePersian(text: string): string {
  if (!text) return '';
  return text
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[\u200B-\u200D\uFEFF]/g, ' ') // zero width spaces to standard
    .toLowerCase()
    .trim();
}

export const IRAN_PROVINCES = [
  {
    name: 'تهران',
    cities: ['تهران', 'شهریار', 'اسلامشهر', 'ورامین', 'ری', 'پردیس', 'دماوند', 'پاکدشت', 'رباط کریم', 'فیروزکوه', 'بومهن']
  },
  {
    name: 'اصفهان',
    cities: ['اصفهان', 'کاشان', 'نجف‌آباد', 'خمینی‌شهر', 'شاهین‌شهر', 'فولادشهر', 'مبارکه', 'لنجان', 'گلپایگان', 'نطنز']
  },
  {
    name: 'خراسان رضوی',
    cities: ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان', 'کاشمر', 'چناران', 'سرخس', 'گناباد']
  },
  {
    name: 'فارس',
    cities: ['شیراز', 'مرودشت', 'جهرم', 'فسا', 'کازرون', 'داراب', 'لار', 'آباده', 'اقلید']
  },
  {
    name: 'آذربایجان شرقی',
    cities: ['تبریز', 'مراغه', 'مرند', 'میانه', 'اهر', 'بناب', 'شبستر', 'سراب']
  },
  {
    name: 'البرز',
    cities: ['کرج', 'فردیس', 'نظرآباد', 'هشتگرد', 'محمدشهر', 'کمال‌شهر', 'طالقان']
  },
  {
    name: 'خوزستان',
    cities: ['اهواز', 'دزفول', 'آبادان', 'ماهشهر', 'اندیمشک', 'خرمشهر', 'بهبهان', 'ایذه', 'شوشتر']
  },
  {
    name: 'مازندران',
    cities: ['ساری', 'بابل', 'آمل', 'قائم‌شهر', 'نکا', 'چالوس', 'تنکابن', 'بابلسر', 'نوشهر', 'رامسر']
  },
  {
    name: 'گیلان',
    cities: ['رشت', 'بندر انزلی', 'لاهیجان', 'لنگرود', 'تالش', 'رودسر', 'صومعه‌سرا', 'فومن', 'آستارا']
  },
  {
    name: 'آذربایجان غربی',
    cities: ['ارومیه', 'خوی', 'بوکان', 'مهاباد', 'میاندوآب', 'سلماس', 'نقده', 'پیرانشهر']
  },
  {
    name: 'کرمان',
    cities: ['کرمان', 'سیرجان', 'رفسنجان', 'جیرفت', 'بم', 'زرند', 'بافت']
  },
  {
    name: 'قم',
    cities: ['قم', 'قنوات', 'جعفریه', 'کهک']
  },
  {
    name: 'یزد',
    cities: ['یزد', 'میبد', 'اردکان', 'بافق', 'مهریز', 'ابرکوه']
  },
  {
    name: 'کرمانشاه',
    cities: ['کرمانشاه', 'اسلام‌آباد غرب', 'کنگاور', 'سنقر', 'جوانرود', 'صحنه', 'پاوه']
  },
  {
    name: 'همدان',
    cities: ['همدان', 'ملایر', 'نهاوند', 'تویسرکان', 'اسدآباد', 'کبودرآهنگ', 'بهار']
  },
  {
    name: 'مرکزی',
    cities: ['اراک', 'ساوه', 'خمین', 'محلات', 'دلیجان', 'شازند']
  },
  {
    name: 'قزوین',
    cities: ['قزوین', 'الوند', 'تاکستان', 'آبیک', 'بویین‌زهرا', 'محمدیه']
  },
  {
    name: 'هرمزگان',
    cities: ['بندرعباس', 'قشم', 'کیش', 'میناب', 'بندرلنگه', 'جاسک']
  },
  {
    name: 'بوشهر',
    cities: ['بوشهر', 'برازجان', 'گناوه', 'کنگان', 'عسلویه', 'دیر']
  },
  {
    name: 'لرستان',
    cities: ['خرم‌آباد', 'بروجرد', 'دورود', 'کوهدشت', 'الیگودرز', 'نورآباد']
  }
];

export function getEstimatedDeliveryText(method: string): string {
  switch (method) {
    case 'courier_instant':
      return 'ارسال امروز (تحویل ۲ الی ۴ ساعت در تهران)';
    case 'tipax':
      return 'تحویل ۲۴ تا ۴۸ ساعته با تیپاکس سراسر کشور';
    case 'post_express':
      return 'تحویل ۲ تا ۳ روز کاری با پست پیشتاز';
    case 'freight':
      return 'تحویل باربری ۳ تا ۵ روز برای قطعات حجیم و سنگین';
    default:
      return 'تحویل ۲ تا ۴ روز کاری';
  }
}
