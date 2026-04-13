import { motion } from "motion/react";
import { 
  PawPrint, 
  Search, 
  Heart, 
  Globe, 
  ArrowRight, 
  Star, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAppContext, Product } from "../lib/store";
import ProductPopup from "../components/ProductPopup";

export default function Landing() {
  const { products, homeData, aboutData, reviews, footerData, globalData, language, setLanguage } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = (en: string, es: string, fr: string) => language === 'es' ? es : language === 'fr' ? fr : en;

  return (
    <div className="min-h-screen bg-surface">
      {/* Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-surface/80 backdrop-blur-xl shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <a href={globalData.logoLink} className="flex items-center gap-2 group cursor-pointer">
            {globalData.logoUrl ? (
              <img src={globalData.logoUrl || undefined} alt={globalData.logoText} className="h-8 object-contain" />
            ) : (
              <div className="bg-primary p-1.5 rounded-lg text-white transition-transform group-hover:rotate-12">
                <PawPrint size={20} />
              </div>
            )}
            <span className="serif font-bold text-primary text-xl md:text-2xl tracking-tight">
              {globalData.logoText}
            </span>
          </a>

          <nav className="hidden md:flex gap-10 items-center">
            {[
              { id: 1, label: t(globalData.menu1En, globalData.menu1Es, globalData.menu1Fr), link: globalData.menu1Link },
              { id: 2, label: t(globalData.menu2En, globalData.menu2Es, globalData.menu2Fr), link: globalData.menu2Link },
              { id: 3, label: t(globalData.menu3En, globalData.menu3Es, globalData.menu3Fr), link: globalData.menu3Link },
              { id: 4, label: t(globalData.menu4En, globalData.menu4Es, globalData.menu4Fr), link: globalData.menu4Link },
            ].map((item) => (
              <a 
                key={item.id} 
                href={item.link || "#"} 
                className="text-primary/70 font-medium hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-surface-dark rounded-full px-4 py-1.5 text-[10px] font-bold text-primary tracking-widest uppercase">
              <button 
                onClick={() => setLanguage('en')} 
                className={`transition-opacity ${language === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >EN</button>
              <span className="mx-2 opacity-20">|</span>
              <button 
                onClick={() => setLanguage('es')} 
                className={`transition-opacity ${language === 'es' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >ES</button>
              <span className="mx-2 opacity-20">|</span>
              <button 
                onClick={() => setLanguage('fr')} 
                className={`transition-opacity ${language === 'fr' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >FR</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-primary hover:scale-110 transition-transform">
                <Search size={20} />
              </button>
              <button className="text-primary hover:scale-110 transition-transform">
                <Heart size={20} />
              </button>
              <button 
                className="md:hidden text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-surface border-t border-surface-dark p-6 space-y-4 shadow-xl"
          >
            {[
              { id: 1, label: t(globalData.menu1En, globalData.menu1Es, globalData.menu1Fr), link: globalData.menu1Link },
              { id: 2, label: t(globalData.menu2En, globalData.menu2Es, globalData.menu2Fr), link: globalData.menu2Link },
              { id: 3, label: t(globalData.menu3En, globalData.menu3Es, globalData.menu3Fr), link: globalData.menu3Link },
              { id: 4, label: t(globalData.menu4En, globalData.menu4Es, globalData.menu4Fr), link: globalData.menu4Link },
            ].map((item) => (
              <a key={item.id} href={item.link || "#"} className="block text-lg font-medium text-primary">{item.label}</a>
            ))}
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-[90vh] flex items-center pt-20 px-6 md:px-10 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 z-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-secondary" />
                <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase">
                  {t(homeData.badgeEn, homeData.badgeEs, homeData.badgeFr)}
                </span>
              </div>
              <h1 className="serif text-6xl md:text-8xl text-primary leading-[0.95] tracking-tight whitespace-pre-line">
                {t(homeData.titleEn, homeData.titleEs, homeData.titleFr)}
              </h1>
              <p className="text-lg md:text-xl text-text-muted max-w-lg leading-relaxed font-light">
                {t(homeData.descEn, homeData.descEs, homeData.descFr)}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-primary-light transition-all shadow-xl shadow-primary/10 flex items-center gap-2">
                  {t(homeData.button1En, homeData.button1Es, homeData.button1Fr)} <ArrowRight size={18} />
                </button>
                <button className="bg-surface-dark text-primary px-10 py-5 rounded-full font-bold hover:bg-white transition-all">
                  {t(homeData.button2En, homeData.button2Es, homeData.button2Fr)}
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] lg:h-[700px]"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-3 transform translate-x-4 translate-y-4" />
              {homeData.imageUrl && (
                <img 
                  src={homeData.imageUrl} 
                  alt="Hero" 
                  className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-32 bg-surface-dark/30 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="serif text-4xl md:text-5xl text-primary">Our Products</h2>
                <p className="text-text-muted text-lg max-w-xl font-light">Small-batch formulas crafted with organic, ethically sourced ingredients for restorative vitality and longevity.</p>
              </div>
              <button className="text-primary font-bold flex items-center gap-2 group">
                Full Collection <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className={`grid gap-10 ${
              products.length === 1 ? "grid-cols-1 max-w-md mx-auto" : 
              products.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto" :
              products.length === 3 ? "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto" :
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}>
              {products.map((product, idx) => {
                const title = t(product.titleEn, product.titleEs, product.titleFr);
                const desc = t(product.descEn, product.descEs, product.descFr);
                
                return (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group ${product.offset && products.length >= 3 ? "lg:mt-12" : ""}`}
                  >
                    <div 
                      className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-dark mb-6 relative cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.imageUrl && (
                        <img 
                          src={product.imageUrl} 
                          alt={title || product.titleEn} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <div className="space-y-3">
                      <h3 
                        className="serif text-2xl text-primary cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {title || product.titleEn}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">{desc || product.descEn}</p>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="inline-block pt-2 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/20 hover:border-primary transition-all"
                      >
                        {product.linkText}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-40 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                {aboutData.image1Url && (
                  <img 
                    src={aboutData.image1Url} 
                    alt="Apothecary" 
                    className="w-full aspect-[4/5] object-cover rounded-2xl shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-12 -right-12 w-2/3 hidden md:block z-20"
              >
                {aboutData.image2Url && (
                  <img 
                    src={aboutData.image2Url} 
                    alt="Happy Pet" 
                    className="w-full aspect-square object-cover rounded-2xl border-[12px] border-surface shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase">
                  {t(aboutData.badgeEn, aboutData.badgeEs, aboutData.badgeFr)}
                </span>
                <h2 className="serif text-5xl md:text-6xl text-primary leading-tight">
                  {t(aboutData.titleEn, aboutData.titleEs, aboutData.titleFr)}
                </h2>
                <p className="text-xl text-text-muted leading-relaxed font-light">
                  {t(aboutData.descEn, aboutData.descEs, aboutData.descFr)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 pt-4">
                <div className="space-y-2">
                  <h4 className="serif text-4xl text-primary">{aboutData.stat1Value}</h4>
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold">
                    {t(aboutData.stat1LabelEn, aboutData.stat1LabelEs, aboutData.stat1LabelFr)}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="serif text-4xl text-primary">{aboutData.stat2Value}</h4>
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold">
                    {t(aboutData.stat2LabelEn, aboutData.stat2LabelEs, aboutData.stat2LabelFr)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discount Section */}
        <section className="py-20 px-6 md:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] p-12 md:p-20 text-center text-white overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase">
                <Star size={12} fill="currentColor" /> Special Offer
              </div>
              <h2 className="serif text-4xl md:text-6xl">Get Discount Code</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
                Fill out the form now and instantly get your special discount code for your next purchase!
              </p>
              <button className="bg-white text-primary px-12 py-5 rounded-full font-bold hover:bg-surface-dark transition-all shadow-xl">
                Generate Code
              </button>
            </div>
          </motion.div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-32 bg-primary text-white px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <span className="text-white/50 text-xs font-bold tracking-[0.3em] uppercase">Testimonials</span>
              <h2 className="serif text-5xl md:text-6xl">Customer Reviews</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 p-10 rounded-3xl border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-secondary gap-1 mb-8">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="serif text-xl italic leading-relaxed mb-12">
                      "{t(review.textEn, review.textEs, review.textFr)}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-dark/20 flex items-center justify-center text-white font-bold text-sm">
                      {review.initials}
                    </div>
                    <div>
                      <p className="font-bold">{review.name}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">{review.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-40 px-6 md:px-10 text-center">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="space-y-4">
              <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase">Stay Updated</span>
              <h2 className="serif text-4xl md:text-5xl text-primary">Join the Sanctuary</h2>
              <p className="text-text-muted text-lg font-light">
                Subscribe to our newsletter for the latest pet care tips and product updates.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 pt-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-surface-dark border-none rounded-full px-8 py-5 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <button className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-primary-light transition-all flex items-center justify-center gap-2">
                Subscribe <Mail size={18} />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dark pt-32 pb-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <a href={globalData.logoLink} className="flex items-center gap-2 group cursor-pointer">
                {globalData.logoUrl ? (
                  <img src={globalData.logoUrl || undefined} alt={globalData.logoText} className="h-8 object-contain" />
                ) : (
                  <div className="bg-primary p-1.5 rounded-lg text-white transition-transform group-hover:rotate-12">
                    <PawPrint size={20} />
                  </div>
                )}
                <span className="serif font-bold text-primary text-2xl tracking-tight">
                  {globalData.logoText}
                </span>
              </a>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                {t(footerData.descEn, footerData.descEs, footerData.descFr)}
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="text-primary/40 hover:text-primary transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-primary font-bold mb-8 text-xs uppercase tracking-[0.2em]">Navigation</h5>
              <ul className="space-y-4">
                {["The Collections", "Brand Philosophy", "The Journal", "Press & Media"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-primary font-bold mb-8 text-xs uppercase tracking-[0.2em]">Information</h5>
              <ul className="space-y-4">
                {["Partnerships", "Privacy Policy", "Terms of Use", "Connect With Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-primary font-bold mb-8 text-xs uppercase tracking-[0.2em]">Support</h5>
              <p className="text-sm text-text-muted leading-relaxed">
                Need assistance with your sanctuary essentials? Our care team is here to help.
              </p>
              <button className="w-full bg-primary text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary-light transition-all">
                Contact Us
              </button>
            </div>
          </div>

          <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-primary/40 font-bold tracking-[0.2em] uppercase">
            <p>{t(footerData.copyrightEn, footerData.copyrightEs, footerData.copyrightFr)}</p>
            <div className="flex items-center gap-4">
              <a href="/admin" className="hover:text-primary transition-colors">Admin Dashboard</a>
              <div className="flex items-center gap-2">
                <span>Made with love</span>
                <Heart size={10} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Popup */}
      {selectedProduct && (
        <ProductPopup 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
