import axios from "axios";

const API_KEY = import.meta.env.VITE_FASHN_API_KEY.replace(/^"|"$/g, "");
const endpoint = "https://api.fashn.ai/v1";

export async function generateFashn(personImage, garmentImage) {
    try {
        const personImageBase64 = await toBase64(personImage);
        const garmentImageBase64 = await toBase64(garmentImage);

        const task = await generateVirtualTryOn(personImageBase64, garmentImageBase64);
        if (!task?.id) throw new Error("No task id returned");
		let statusData = null;

        while (true) {
            const response = await axios.get(`${endpoint}/status/${task.id}`, {
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
            throw new Error("No output[0] in response");
        }
    } catch (error) {
        console.error("Virtual TryOn Error:", error);
        return null;
    }
}

async function generateVirtualTryOn(personImageBase64, garmentImageBase64) {
    try {
        const response = await axios.post(`${endpoint}/run`,
            {
                model_name: "tryon-v1.6",
                inputs: {
                    model_image: personImageBase64,
                    garment_image: garmentImageBase64
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

async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}