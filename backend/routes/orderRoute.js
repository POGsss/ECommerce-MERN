import express from 'express';
import { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, userOrders, adminOrders, updateStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/authAdmin.js';
import authUser from '../middleware/authUser.js';

const orderRouter = express.Router();

// User Routes
orderRouter.post("/user", authUser, userOrders);
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// Admin Routes
orderRouter.post("/admin", adminAuth, adminOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;