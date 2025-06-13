import { v2 as cloudinary } from "cloudinary";

// Product List Function
const productList = async (req, res) => {
    
}

// Product Single Function
const productSingle = async (req, res) => {
    
}

// Product Remove Function
const productRemove = async (req, res) => {
    
}

// Product Add Function
const productAdd = async (req, res) => {
    try {
        // Getting User Input
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Getting Product Images
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // Saving Each Image To Cloudinary
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
                return result.secure_url;
            })
        );

        // Saving Data To MongoDB
        

        // Logging Response
        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imagesUrl);

        res.json({})
    } catch (error) {
        // Logging Error
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { productList, productSingle, productRemove, productAdd }