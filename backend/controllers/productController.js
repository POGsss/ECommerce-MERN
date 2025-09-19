import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Product List Function
const productList = async (req, res) => {
    try {
        // Getting All Products Data
        const products = await productModel.find({});
        const productsName = products.map((item) => item.name);
        console.log(productsName);
        res.json({success: true, products});
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Product Single Function
const productSingle = async (req, res) => {
    try {
        // Getting Product By Id
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Product Remove Function
const productRemove = async (req, res) => {
    try {
        // Getting Product By Id
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        // Deleting Images Of The Product
        for (const imageUrl of product.image) {
            // Extracting ImageID From ImageURL
            const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const publicId = filename.split('.')[0];
            
            // Deleting Images From Cloudinary
            await cloudinary.uploader.destroy("ecommerce/" + publicId, { resource_type: "image" });

            // Logging Deleted Images
            console.log("Deleted Image: " + filename);
        }

        // Deleting The Product
        await productModel.findByIdAndDelete(productId);
        res.json({success: true, message: "Product Deleted"});
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
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
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image", folder: "ecommerce"});
                return result.secure_url;
            })
        );

        // Saving Data To MongoDB
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save();
        res.json({success: true, message: "Product Added"})

        // Logging Request Body
        console.log(productData);
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { productList, productSingle, productRemove, productAdd };