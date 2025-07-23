import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY.replace(/^"|"$/g, "");
const chatBot = new GoogleGenerativeAI(API_KEY);

export async function generateResponse(prompt) {
    try {
    const model = chatBot.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Business Details
    const systemPrompt = `
        You are a friendly chatbot assistant for an online fashion store called Boss D Apparel.
        You assist users with product questions, order updates, return policies, and sales info.
        Respond in a clear and friendly tone. Be concise unless the user asks for more details.
    `;

    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I couldn't respond. Please try again later.";
  }
}