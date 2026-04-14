import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../lib/store';

export default function WelcomePopup() {
  const { welcomePopupData, language } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (welcomePopupData.isActive) {
      setIsOpen(true);
    }
  }, [welcomePopupData.isActive]);

  if (!isOpen || !welcomePopupData.isActive) return null;

  const getLocalized = (en: string, es: string, fr: string) => {
    if (language === 'es') return es;
    if (language === 'fr') return fr;
    return en;
  };

  const title = getLocalized(welcomePopupData.titleEn, welcomePopupData.titleEs, welcomePopupData.titleFr);
  const desc = getLocalized(welcomePopupData.descEn, welcomePopupData.descEs, welcomePopupData.descFr);
  const btn1Text = getLocalized(welcomePopupData.btn1TextEn, welcomePopupData.btn1TextEs, welcomePopupData.btn1TextFr);
  const btn2Text = getLocalized(welcomePopupData.btn2TextEn, welcomePopupData.btn2TextEs, welcomePopupData.btn2TextFr);

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-slate-900/60 font-body p-4 sm:p-6">
      <div className="relative w-full max-w-[800px] max-h-[95vh] overflow-y-auto bg-white shadow-2xl flex flex-col md:flex-row rounded-2xl">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-slate-100 transition-colors z-10 text-slate-900"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[500px] relative">
          <img 
            src={welcomePopupData.imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-surface-dark">
          <h2 className="serif text-3xl md:text-4xl text-primary mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-text-muted text-base md:text-lg font-light mb-8 leading-relaxed">
            {desc}
          </p>

          <div className="space-y-4">
            <a 
              href={welcomePopupData.btn1Url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#FF9900] text-slate-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all"
            >
              <ShoppingBag size={18} />
              {btn1Text}
            </a>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary-light transition-all"
            >
              {btn2Text}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
