import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order Functionality COD
const placeOrderCOD = async (req, res) => {
    try {
        // Getting User Data
        const { userId, items, amount, address } = req.body;

        // Creating Order Data
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        // Creating Order
        const newOrder = await orderModel.create(orderData);
        await newOrder.save();

        // Creating Cart Data
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Sending Response
        res.json({ success: true, message: "Order Placed"});
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Place Order Functionality Stripe
const placeOrderStripe = async (req, res) => {

}

// Place Order Functionality Razorpay
const placeOrderRazorpay = async (req, res) => {
    
}

// User Orders Functionality
const userOrders = async (req, res) => {
    try {
        // Getting User ID
        const { userId } = req.body;

        // Fetching User Orders
        const orders = await orderModel.find({ userId });

        // Sending Response
        res.json({ success: true, orders });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// All Orders Functionality
const adminOrders = async (req, res) => {
    try {
        // Getting All Orders
        const orders = await orderModel.find({}).sort({date: -1});
        res.json({ success: true, orders });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Getting Recent Orders
const recentOrders = async (req, res) => {
    try {
        // Getting All Orders
        const orders = await orderModel.find({}).sort({date: -1}).limit(3);
        res.json({ success: true, orders });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Update Status Functionality
const updateStatus = async (req, res) => {
    try {
        // Getting Order ID & Status
        const { orderId, status } = req.body; 

        // Updating The Order Status
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, userOrders, adminOrders, recentOrders, updateStatus };