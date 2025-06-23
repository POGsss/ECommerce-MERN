import userModel from "../models/userModel.js";

// Cart Add Function
const addToCart = async (req, res) => {
    try {
        // Getting User Input
        const { userId, itemId, size } = req.body;

        // Getting User Cart Data
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        // Checking If Cart Data Exists
        if (cartData[itemId]) {
            // Checking If Size Exists
            if (cartData[itemId][size]) {
                // Increase Quantity
                cartData[itemId][size] += 1;
            } else {
                // Add New Size
                cartData[itemId][size] = 1;
            }
        } else {
            // Add New Item
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Saving Updated Cart Data
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Sending Response
        res.json({ success: true, message: "Product Added To Cart" });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Update Cart Function
const updateCart = async (req, res) => {
    try {
        // Getting User Input
        const { userId, itemId, size, quantity } = req.body;

        // Gettign User Cart Data
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        // Updating Cart Quantity
        cartData[itemId][size] = quantity;
        
        // Saving Updated Cart Data
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Sending Response
        res.json({ success: true, message: "Product Cart Updated" });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Get User Cart Function
const getCart = async (req, res) => {
    try {
        // Getting User ID
        const { userId } = req.body;

        // Getting User Cart Data
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        // Sending Response
        res.json({ success: true, cartData });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { addToCart, updateCart, getCart };