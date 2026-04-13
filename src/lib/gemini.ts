import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function translateText(text: string): Promise<{ es: string; fr: string }> {
  if (!text) return { es: "", fr: "" };
  
  const prompt = `Translate the following English text into Spanish and French. 
  Return ONLY a valid JSON object with 'es' and 'fr' keys containing the translations. Do not include markdown formatting like \`\`\`json.
  Text: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    if (response.text) {
      let cleanText = response.text.trim();
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/```json\n?/, '').replace(/```$/, '').trim();
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/```\n?/, '').replace(/```$/, '').trim();
      }
      
      const result = JSON.parse(cleanText);
      return {
        es: result.es || "",
        fr: result.fr || ""
      };
    }
    return { es: "", fr: "" };
  } catch (error) {
    console.error("Translation error:", error);
    return { es: "Error", fr: "Error" };
  }
}
