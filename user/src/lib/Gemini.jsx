import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY.replace(/^"|"$/g, "");
const gemini = new GoogleGenerativeAI(API_KEY);

// Chatbot AI
export async function generateChat(prompt) {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });

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

// Virtual Try On AI
export async function generateTryOn(personFile, clothFile) {
  try {
    const model = gemini.getGenerativeModel({
      model: "gemini-2.5-flash-image-preview",
    });

    // Convert Files To Base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const [personB64, clothB64] = await Promise.all([
      toBase64(personFile),
      toBase64(clothFile),
    ]);

    const contents = [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType: personFile.type, data: personB64 } },
          { inlineData: { mimeType: clothFile.type, data: clothB64 } },
          { text: "Create a professional fashion try-on image. Let the person in the first image wear the clothing item in the second image." },
        ],
      },
    ];

    const result = await model.generateContent({ contents });
    const response = await result.response;

    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData);

    if (imagePart) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    } else {
      throw new Error("No image returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Try-On Error:", error);
    return null;
  }
}