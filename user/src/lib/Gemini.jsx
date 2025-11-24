import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY.replace(/^"|"$/g, "");
const gemini = new GoogleGenerativeAI(API_KEY);

// Chatbot AI
export async function generateChat(prompt) {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Business Details
    const systemPrompt = `
      You are a friendly and helpful AI assistant for the online clothing brand Boss D Apparel. Base all answers on the following knowledge:

      BUSINESS DETAILS:
      Boss D Apparel is a streetwear-focused fashion brand offering caps, shoes, shirts, hoodies, and related apparel. The brand operates online and in-store, providing modern, accessible, and stylish fashion to customers in the Philippines.

      PRODUCT INFORMATION:
      Products include:
      - Caps: Available in multiple colors and styles with adjustable fits.
      - Shoes: Stylish casual footwear available in various sizes for everyday wear.
      - Clothing: Includes shirts, hoodies, and other apparel following Philippine standard sizing.

      Some products may be limited edition and inventory may change based on seasonal releases and demand.

      ORDERING AND CHECKOUT:
      - Customers add products to cart and proceed to checkout.
      - Order summary shows total cost including shipping before payment.
      - Payment confirmation triggers order creation and status updates.
      - Customers can track orders in the "My Orders" page.

      SHIPPING POLICY:
      - Standard shipping is ₱30 per order.
      - Delivery typically takes 2 to 7 days within the Philippines.
      - Delivery times may vary depending on location and courier.
      - Tracking becomes available once the order is processed.

      RETURN & REFUND POLICY:
      - Returns allowed within 30 days.
      - Items must be unused, in original condition, and include tags.
      - Customers may request:
        • Full refund
        • Size exchange
        • Replacement for incorrect or defective items
      - Processing time depends on payment method.
      - Sale items may not be eligible unless damaged or incorrect.

      CUSTOMER SUPPORT:
      Support can be reached through:
      - Website contact page
      - Email
      - Contact form
      - Social media messaging

      Support can handle product questions, order tracking, returns, and general inquiries.

      VIRTUAL TRY-ON SYSTEM:
      - Powered by FASHN API.
      - Users upload a photo and select a product.
      - AI generates a realistic preview of how the item would look on the customer.
      - Images are temporary and not shared with third parties.
      - Accuracy may vary based on image quality and lighting.

      CHATBOT BEHAVIOR:
      - Always communicate in a friendly, simple, clear, and helpful style.
      - Ask follow-up questions if needed.
      - Keep responses short unless the user asks for more detail.
      - Avoid technical explanations unless requested.
      Example of a good response:
        "Your order has shipped! It should arrive in 3 to 6 days."
      Example of a bad response:
        "Package dispatched. Delivery time pending system logs."

      TECHNOLOGY STACK:
      - Frontend: ReactJS
      - Backend: Node.js and Express.js
      - Database: MongoDB
      - Deployment: Vercel
      - Authentication: Google OAuth
      - Payment Gateway: Stripe
      - Media Storage: Cloudinary
      - AI Chatbot: Google Gemini
      - Virtual Try-On API: FASHN API

      DEVELOPER:
      The system was developed by Frankie B. Pinat.

      When responding to the user, answer only based on this knowledge unless more information is provided. Be accurate, friendly, and customer-focused.
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
export async function generateTryOn(personFile, clothFile, text) {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" });

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
          { text: text || "Create a professional fashion try-on image. Let the person in the first image wear the clothing item in the second image." },
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
    toast("Failed to generate. Please try again.");
    return null;
  }
}