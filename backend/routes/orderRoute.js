import express from 'express';
import { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, userOrders, allOrders, updateStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/authAdmin.js';
import authUser from '../middleware/authUser.js';

const orderRouter = express.Router();

// Admin Routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// User Routes
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/orders", authUser, userOrders);

export default orderRouter;