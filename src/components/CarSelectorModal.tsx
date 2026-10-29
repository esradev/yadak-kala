import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAR_BRANDS } from '../data/mockData';
import { CarBrand, CarModel, UserVehicle } from '../types';
import { X, Car, Check, ChevronLeft, Plus, ShieldCheck, Sparkles } from 'lucide-react';

interface CarSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CarSelectorModal: React.FC<CarSelectorModalProps> = ({ isOpen, onClose }) => {
  const { userVehicle, setUserVehicle, savedVehicles, addSavedVehicle } = useApp();

  const [step, setStep] = useState<'saved' | 'select-brand' | 'select-model' | 'select-year'>(
    savedVehicles.length > 0 ? 'saved' : 'select-brand'
  );
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('۱۴۰۲');
  const [customPlate, setCustomPlate] = useState<string>('');

  if (!isOpen) return null;

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setStep('select-model');
  };

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setStep('select-year');
  };

  const handleSaveAndActivate = () => {
    if (!selectedBrand || !selectedModel) return;

    const newVehicle: UserVehicle = {
      id: `veh-${Date.now()}`,
      brandId: selectedBrand.id,
      brandName: selectedBrand.name,
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      year: selectedYear,
      plateNumber: customPlate.trim() || undefined
    };

    addSavedVehicle(newVehicle);
    setUserVehicle(newVehicle);
    onClose();
    setStep('saved');
  };

  const handleSelectExisting = (veh: UserVehicle) => {
    setUserVehicle(veh);
    onClose();
  };

  const availableYears = [
    '۱۴۰۳', '۱۴۰۲', '۱۴۰۱', '۱۴۰۰', '۱۳۹۹', '۱۳۹۸', '۱۳۹۷', '۱۳۹۶', '۱۳۹۵', 
    '۱۳۹۴', '۱۳۹۳', '۱۳۹۲', '۱۳۹۱', '۱۳۹۰', '۱۳۸۹', '۱۳۸۸', '۱۳۸۷', '۱۳۸۶', '۱۳۸۵'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 transition-all">
        {/* Header */}
        <div className="bg-gradient-to-l from-slate-900 via-slate-800 to-amber-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                گاراژ هوشمند من
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  سازگاری ۱۰۰٪
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                با انتخاب خودرو، تنها قطعاتی که دقیقاً با اتومبیل شما سازگار هستند نمایش داده می‌شوند.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {step === 'saved' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 text-sm">خودروهای ذخیره شده شما:</h4>
                <button
                  onClick={() => setStep('select-brand')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  افزودن خودرو جدید
                </button>
              </div>

              <div className="space-y-3">
                {savedVehicles.map((veh) => {
                  const isActive = userVehicle?.id === veh.id;
                  return (
                    <div
                      key={veh.id}
                      onClick={() => handleSelectExisting(veh)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isActive ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            {veh.modelName}
                            <span className="text-xs font-normal text-slate-500">مدل {veh.year}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                            <span>برند: {veh.brandName}</span>
                            {veh.plateNumber && (
                              <span className="bg-white px-2 py-0.5 rounded border text-[11px] font-mono">
                                {veh.plateNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {isActive ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
                          <Check className="w-4 h-4 text-emerald-600" />
                          فعال در گاراژ
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 hover:text-slate-900">
                          انتخاب این خودرو
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {userVehicle && (
                <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    فیلتر قطعات بر اساس خودروی انتخابی فعال است. تمامی قیمت‌ها، لنت‌ها، تسمه‌ها و فیلترها سازگار با 
                    <strong className="mx-1 font-bold">{userVehicle.modelName}</strong> 
                    نمایش داده می‌شوند.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 'select-brand' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 text-sm">مرحله ۱: سازنده خودرو را انتخاب کنید</h4>
                {savedVehicles.length > 0 && (
                  <button
                    onClick={() => setStep('saved')}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    بازگشت به گاراژ
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CAR_BRANDS.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand)}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition-all flex flex-col items-center justify-center gap-2 group text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-white flex items-center justify-center overflow-hidden p-1 shadow-sm transition-colors">
                      <Car className="w-6 h-6 text-slate-700 group-hover:text-amber-600" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm group-hover:text-amber-700">
                      {brand.name}
                    </span>
                    <span className="text-[11px] text-slate-400 group-hover:text-slate-500">
                      {brand.englishName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'select-model' && selectedBrand && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setStep('select-brand')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                  تغییر سازنده ({selectedBrand.name})
                </button>
                <span className="text-xs text-slate-400 font-medium">مرحله ۲ از ۳</span>
              </div>

              <h4 className="font-bold text-slate-800 text-sm mb-3">مدل خودروی خود را انتخاب کنید:</h4>

              <div className="space-y-2">
                {selectedBrand.models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all flex items-center justify-between group text-right"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:text-amber-600">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-amber-700">
                          {model.name}
                        </div>
                        <div className="text-xs text-slate-500">سال‌های تولید: {model.years}</div>
                      </div>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:-translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'select-year' && selectedBrand && selectedModel && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setStep('select-model')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                  تغییر مدل ({selectedModel.name})
                </button>
                <span className="text-xs text-slate-400 font-medium">مرحله آخر</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5 flex items-center gap-3">
                <Car className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">خودروی انتخاب شده:</div>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedBrand.name} - {selectedModel.name}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    سال ساخت خودرو:
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {availableYears.map((yr) => (
                      <option key={yr} value={yr}>
                        سال {yr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    شماره پلاک یا نام دلخواه (اختیاری):
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: ماشین خودم، ایران ۳۳ - ۱۲۳ ج ۴۵"
                    value={customPlate}
                    onChange={(e) => setCustomPlate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  onClick={handleSaveAndActivate}
                  className="w-full mt-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  افزودن و فعال‌سازی در گاراژ من
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
