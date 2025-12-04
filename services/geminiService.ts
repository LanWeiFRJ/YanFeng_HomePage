import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { YANFENG_KNOWLEDGE_BASE } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const initializeAI = () => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing!");
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const getChatSession = (): Chat => {
  const ai = initializeAI();
  if (!ai) {
    throw new Error("AI not initialized");
  }

  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
          你是一个名叫“枫糖”的AI助手，服务于“檐枫动漫社”。
          请使用以下知识库来回答用户关于社团的问题：
          ---
          ${YANFENG_KNOWLEDGE_BASE}
          ---
          风格要求：
          1. 语气活泼、中二、热情，像一个动漫社的学姐或吉祥物。
          2. 如果用户问的问题不在知识库中，请礼貌地表示你只知道社团内部的事情，并建议他们去公众号留言。
          3. 回答尽量简短有趣。
        `,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = getChatSession();
    const result: GenerateContentResponse = await session.sendMessage({ message });
    return result.text || "抱歉，枫糖现在有点晕，请稍后再试～";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "连接宇宙电波失败（API Error），请检查网络或API Key。";
  }
};