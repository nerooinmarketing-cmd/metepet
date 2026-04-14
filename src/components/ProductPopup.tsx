import React, { useState } from 'react';
import { X, Play, ShoppingBag, ZoomIn } from 'lucide-react';
import { Product, useAppContext } from '../lib/store';

interface ProductPopupProps {
  product: Product;
  onClose: () => void;
}

export default function ProductPopup({ product, onClose }: ProductPopupProps) {
  const { language } = useAppContext();
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const getLocalized = (en: string, es: string, fr: string) => {
    if (language === 'es') return es;
    if (language === 'fr') return fr;
    return en;
  };

  const title = getLocalized(product.titleEn, product.titleEs, product.titleFr);
  const desc = getLocalized(product.descEn, product.descEs, product.descFr);
  const benefits = (getLocalized(product.benefitsEn, product.benefitsEs, product.benefitsFr) || "").split('\n').filter(Boolean);
  const composition = getLocalized(product.compositionEn, product.compositionEs, product.compositionFr);
  const directions = (getLocalized(product.directionsEn, product.directionsEs, product.directionsFr) || "").split('\n').filter(Boolean);

  const t = (en: string, es: string, fr: string) => getLocalized(en, es, fr);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:pt-8 bg-slate-900/40 font-body selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      {/* Pop-up Container */}
      <div className="relative w-full max-w-[480px] bg-white shadow-2xl overflow-hidden flex flex-col h-screen sm:h-[90vh]">
        {/* Top Navigation */}
        <header className="flex-shrink-0 bg-white flex justify-between items-center px-6 h-14 border-b border-slate-100">
          <h1 className="font-headline font-bold text-slate-900 uppercase tracking-tight">{title}</h1>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 pb-4">
          {/* 1. Gallery */}
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-1">
              {/* Large Main Images */}
              <div 
                className="col-span-1 aspect-square overflow-hidden bg-slate-100 relative group cursor-pointer"
                onClick={() => setZoomedImage(product.images?.[0] || product.imageUrl)}
              >
                <img alt="Product View 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.images?.[0] || product.imageUrl} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
              </div>
              <div 
                className="col-span-1 aspect-square overflow-hidden bg-slate-100 relative group cursor-pointer"
                onClick={() => setZoomedImage(product.images?.[1] || product.imageUrl)}
              >
                <img alt="Product View 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.images?.[1] || product.imageUrl} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
              </div>
              {/* Row of 3 */}
              <div className="col-span-2 grid grid-cols-3 gap-1">
                <div 
                  className="aspect-square overflow-hidden bg-slate-100 relative group cursor-pointer"
                  onClick={() => setZoomedImage(product.images?.[2] || product.imageUrl)}
                >
                  <img alt="Detail 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.images?.[2] || product.imageUrl} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                </div>
                <div 
                  className="aspect-square overflow-hidden bg-slate-100 relative group cursor-pointer"
                  onClick={() => setZoomedImage(product.images?.[3] || product.imageUrl)}
                >
                  <img alt="Detail 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.images?.[3] || product.imageUrl} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                </div>
                <div 
                  className="aspect-square overflow-hidden bg-slate-100 relative group cursor-pointer"
                  onClick={() => setZoomedImage(product.images?.[4] || product.imageUrl)}
                >
                  <img alt="Detail 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.images?.[4] || product.imageUrl} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Video Player */}
          {product.videoUrl && (
            <section className="mb-8">
              <div className="relative w-full aspect-video overflow-hidden bg-black border border-slate-100">
                {product.videoUrl.startsWith('data:video/') || product.videoUrl.endsWith('.mp4') ? (
                  <video 
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    src={product.videoUrl}
                    controls
                    playsInline
                  />
                ) : (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getEmbedUrl(product.videoUrl)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </section>
          )}

          {/* 3. Product Description */}
          <section className="mb-10">
            <h2 className="font-label text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
              {t("Core Formulation", "Formulación Principal", "Formulation de Base")}
            </h2>
            <p className="font-body text-slate-800 text-lg leading-relaxed font-light">
              {desc}
            </p>
          </section>

          {/* 4. Detailed Sections */}
          <div className="space-y-12">
            {/* Benefits */}
            {benefits.length > 0 && (
              <section>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-headline font-bold text-lg text-primary uppercase tracking-tight mb-4 border-b border-slate-100 pb-2">
                      {t("Benefits", "Beneficios", "Avantages")}
                    </h3>
                    <ul className="space-y-4">
                      {benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></span>
                          <p className="text-sm text-on-surface-variant leading-tight">{benefit}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 flex-shrink-0 overflow-hidden">
                    <img alt="Benefit Icon" className="w-full h-full object-cover grayscale opacity-80" src={product.images?.[0] || product.imageUrl} />
                  </div>
                </div>
              </section>
            )}

            {/* Ingredients */}
            {composition && (
              <section>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-headline font-bold text-lg text-primary uppercase tracking-tight mb-4 border-b border-slate-100 pb-2">
                      {t("Composition", "Composición", "Composition")}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {composition}
                    </p>
                  </div>
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 flex-shrink-0 overflow-hidden">
                    <img alt="Ingredients Image" className="w-full h-full object-cover grayscale opacity-80" src={product.images?.[1] || product.imageUrl} />
                  </div>
                </div>
              </section>
            )}

            {/* Directions */}
            {directions.length > 0 && (
              <section className="pb-10">
                <h3 className="font-headline font-bold text-lg text-primary uppercase tracking-tight mb-4 border-b border-slate-100 pb-2">
                  {t("Clinical Application", "Aplicación Clínica", "Application Clinique")}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {directions.map((direction, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <span className="text-xs font-bold text-slate-400 border border-slate-200 w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm text-on-surface-variant">{direction}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        {/* 5. Footer: Fixed Buy Button */}
        <footer className="flex-shrink-0 px-6 py-5 bg-white border-t border-slate-100">
          <a 
            className="w-full h-12 flex items-center justify-center gap-2 text-slate-900 font-headline font-bold uppercase tracking-widest text-xs transition-all active:brightness-90" 
            style={{ background: '#FF9900' }}
            href={product.amazonLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShoppingBag size={18} />
            {t("Buy on Amazon", "Comprar en Amazon", "Acheter sur Amazon")}
          </a>
        </footer>
      </div>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(null);
            }}
          >
            <X size={32} />
          </button>
          <img 
            src={zoomedImage} 
            alt="Zoomed Product" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
