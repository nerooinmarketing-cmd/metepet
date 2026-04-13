import { useState, useEffect } from "react";
import { Wand2, Save } from "lucide-react";
import { translateText } from "../../lib/gemini";
import { useAppContext, FooterData } from "../../lib/store";

export default function FooterManager() {
  const { footerData, updateFooter, adminLang } = useAppContext();
  const [data, setData] = useState<FooterData>(footerData);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  useEffect(() => {
    setData(footerData);
  }, [footerData]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [
        descTranslations,
        copyTranslations
      ] = await Promise.all([
        translateText(data.descEn),
        translateText(data.copyrightEn)
      ]);
      
      setData(prev => ({
        ...prev,
        descEs: descTranslations.es || prev.descEs,
        descFr: descTranslations.fr || prev.descFr,
        copyrightEs: copyTranslations.es || prev.copyrightEs,
        copyrightFr: copyTranslations.fr || prev.copyrightFr,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    updateFooter(data);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-semibold text-gray-900">{t("Edit Footer Section", "Alt Bilgi Alanını Düzenle")}</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleTranslate}
            disabled={isTranslating}
            className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Wand2 size={16} />
            {isTranslating ? t("Translating...", "Çevriliyor...") : t("Auto-Translate", "Otomatik Çevir")}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? t("Saved!", "Kaydedildi!") : t("Save Changes", "Değişiklikleri Kaydet")}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* English */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">EN</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("English", "İngilizce")}</h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Description", "Açıklama")}</label>
              <textarea value={data.descEn} onChange={(e) => setData({...data, descEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Copyright", "Telif Hakkı")}</label>
              <input type="text" value={data.copyrightEn} onChange={(e) => setData({...data, copyrightEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>

          {/* Spanish */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">ES</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("Spanish", "İspanyolca")}</h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Description", "Açıklama")}</label>
              <textarea value={data.descEs} onChange={(e) => setData({...data, descEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Copyright", "Telif Hakkı")}</label>
              <input type="text" value={data.copyrightEs} onChange={(e) => setData({...data, copyrightEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>

          {/* French */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-xs font-bold text-purple-600">FR</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("French", "Fransızca")}</h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Description", "Açıklama")}</label>
              <textarea value={data.descFr} onChange={(e) => setData({...data, descFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Copyright", "Telif Hakkı")}</label>
              <input type="text" value={data.copyrightFr} onChange={(e) => setData({...data, copyrightFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
