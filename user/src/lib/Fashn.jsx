import axios from "axios";

const API_KEY = import.meta.env.VITE_FASHN_API_KEY.replace(/^"|"$/g, "");
const endpoint = "https://api.fashn.ai/v1/run";

export async function generateFashn(personImage, garmentImage) {
    try {
        const response = await axios.post(endpoint,
            {
                model_name: "tryon-v1.6",
                inputs: {
                    model_image: personImage,
                    garment_image: garmentImage
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Virtual TryOn Error:", error);
        return null;
    }
}