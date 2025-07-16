import express from 'express';
import { placeOrderCOD, placeOrderStripe, verifyStripe, placeOrderRazorpay, userOrders, adminOrders, recentOrders, salesCount, revenueTotal, updateStatus } from '../controllers/orderController.js';
import authUser from '../middleware/authUser.js';
import adminAuth from '../middleware/authAdmin.js';

const orderRouter = express.Router();

// User Routes
orderRouter.post("/user", authUser, userOrders);
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// Admin Routes
orderRouter.post("/admin", adminAuth, adminOrders);
orderRouter.post("/recent", adminAuth, recentOrders);
orderRouter.post("/sales", adminAuth, salesCount);
orderRouter.post("/revenue", adminAuth, revenueTotal);
orderRouter.post("/status", adminAuth, updateStatus);

// Staff Routes

export default orderRouter;