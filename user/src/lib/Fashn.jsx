import axios from "axios";

const API_KEY = import.meta.env.VITE_FASHN_API_KEY.replace(/^"|"$/g, "");
const endpoint = "https://api.fashn.ai/v1/run";

export async function generateFashn(personImage, garmentImage) {
    try {
        const task = await generateVirtualTryOn(personImage, garmentImage);
        if (!task?.id) throw new Error("No task id returned");
		let statusData = null;

        while (true) {
            const response = await axios.get(`${endpoint}/${task.id}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            statusData = response.data;

            if (statusData?.status === "completed") break;
            if (statusData?.status === "failed") throw new Error("Try-on failed");

            await new Promise((res) => setTimeout(res, 2000));
        }

        if (statusData?.output?.[0]) {
            return statusData.output[0];
        } else {
            throw new Error("No result image in response");
        }
    } catch (error) {
        console.error("Virtual TryOn Error:", error);
        return null;
    }
}

async function generateVirtualTryOn(personImage, garmentImage) {
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