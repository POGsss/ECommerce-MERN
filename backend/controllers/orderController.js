import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global Variables
const currency = "php";
const deliveryFee = 30;

// Stripe Initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
            date: Date.now(),
            source: "online"
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
    try {
        // Getting User Data
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        // Creating Order Data
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        // Creating Order
        const newOrder = await orderModel.create(orderData);
        await newOrder.save();

        // Creating Line Items
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Fee"
                },
                unit_amount: deliveryFee * 100
            },
            quantity: 1
        });

        // Creating Session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        // Sending Response
        res.json({success: true, session_url: session.url});
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Verify Stripe Payment
const verifyStripe = async (req, res) => {
    // Getting Order Data
    const { orderId, success, userId } = req.body;

    // Checking If Payment Is Successful
    try {
        if (success === "true" || success === true) {
            // Updating Payment Status And User Cart
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({success: true});
        } else {
            // Deleting The Unsuccessful Order Data
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false});
        }
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
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

// -------------------- ADMIN -------------------- //

// All Orders Functionality
const adminOrders = async (req, res) => {
    try {
        // Adding Filter For Online Orders
        const { source } = req.query;
        const filter = source ? { source } : {};

        // Getting All Orders
        const orders = await orderModel.find(filter).sort({date: -1});
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
        // Adding Filter For Online Orders
        const { source } = req.query;
        const filter = source ? { source } : {};

        // Getting All Orders
        const orders = await orderModel.find(filter).sort({date: -1}).limit(3);
        res.json({ success: true, orders });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Getting Sales Count
const salesCount = async (req, res) => {
    try {
        // Getting Individual Count For Each
        const totalSales = await orderModel.countDocuments({ payment: true });
        const onlineSales = await orderModel.countDocuments({ payment: true, source: "online" });
        const storeSales = await orderModel.countDocuments({ payment: true, source: "store" });
        const pendingSales = await orderModel.countDocuments({ payment: false });

        // Sending Back Results
        res.json({ success: true, totalSales, onlineSales, storeSales, pendingSales });
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Getting Revenue Total
const revenueTotal = async (req, res) => {
    try {
        // Get Current Month Range
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();

        // Total revenue
        const totalRevenueAgg = await orderModel.aggregate([
            { $match: { payment: true } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Monthly revenue
        const monthlyRevenueAgg = await orderModel.aggregate([
            { $match: { payment: true, date: { $gte: startOfMonth, $lte: endOfMonth } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Setting Revenue
        const totalRevenue = totalRevenueAgg[0]?.total || 0;
        const monthlyRevenue = monthlyRevenueAgg[0]?.total || 0;

        // Sending Back Results
        res.json({ success: true, totalRevenue, monthlyRevenue });
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

export { placeOrderCOD, placeOrderStripe, verifyStripe, placeOrderRazorpay, userOrders, adminOrders, recentOrders, salesCount, revenueTotal, updateStatus };