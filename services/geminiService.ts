import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview'; 
    
    // Construct a simple chat history string for context (simplified for single-turn mostly)
    const context = `You are a helpful, enthusiastic, and knowledgeable smart guide for the "Yunfeng Tunpu" (云峰屯堡) scenic area in China. 
    You are represented as a 3D digital avatar. 
    Keep your answers concise, friendly, and helpful for tourists on mobile devices.
    If asked about the weather, assume it's pleasant and 19°C.
    Answer in Chinese.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: context,
      }
    });

    return response.text || "抱歉，我暂时无法回答这个问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络开小差了，请稍后再试。";
  }
};