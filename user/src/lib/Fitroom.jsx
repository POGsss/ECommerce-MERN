import axios from "axios";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_FITROOM_API_KEY.replace(/^"|"$/g, "");
const endpoint = "https://platform.fitroom.app/api/tryon/v2/tasks";

export async function generateFitroom(personImage, garmentImage) {
    try {
		const task = await generateVirtualTryOn(personImage, garmentImage);
		if (!task?.task_id) throw new Error("No task_id returned");
		let statusData = null;

		while (true) {
			const response = await axios.get(`${endpoint}/${task.task_id}`, {
				headers: {
					"X-API-KEY": API_KEY,
				},
			});
			statusData = response.data;

			if (statusData?.status === "COMPLETED") break;
			if (statusData?.status === "FAILED") throw new Error("Try-on failed");

			await new Promise((res) => setTimeout(res, 2000));
		}

		if (statusData?.download_signed_url) {
			return statusData.download_signed_url;
		} else {
			throw new Error("No download_signed_url in response");
		}
	} catch (error) {
        console.error("Virtual TryOn Error:", error);
        return null;
	}
}

async function generateVirtualTryOn(personImage, garmentImage) {
    try {
        const formData = new FormData();
        formData.append("cloth_image", garmentImage);
        formData.append("model_image", personImage);
        formData.append("cloth_type", "upper");
        formData.append("hd_mode", "false");

        const response = await axios.post(endpoint, formData, {
            headers: {
                "X-API-KEY": API_KEY,
                ...formData.getHeaders?.(),
            },
        });

        return response.data;
    } catch (error) {
        console.error("Virtual TryOn Error:", error);
		toast("Failed to generate. Please try again.");
        return null;
    }
}