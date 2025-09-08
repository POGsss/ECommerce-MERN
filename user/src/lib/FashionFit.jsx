import axios from "axios";

import { Client } from "@gradio/client";
const client = await Client.connect("ginigen/Fashion-Fit360");

export async function generateFashionFit(personImage, garmentImage) {
    try {
        const result = await client.predict("/generate", { 
			person_image: personImage,
			object_image: garmentImage,
            object_class: "top clothes",
            steps: 1,
            guidance_scale: 1,
            seed: 3,
        });

        return result.data;
    } catch (error) {
        console.error("FashionFit Error:", error);
        return null;
    }
}