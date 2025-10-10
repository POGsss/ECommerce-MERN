import express from 'express';
import { placeOrderCOD, placeOrderStripe, verifyStripe, cancelStripe, receiveOrder, userOrders, adminOrders, recentOrders, salesCount, revenueTotal, updateStatus, staffOrders, placeOrderPOS } from '../controllers/orderController.js';
import authUser from '../middleware/authUser.js';
import authAdmin from '../middleware/authAdmin.js';
import authStaff from "../middleware/authStaff.js";

const orderRouter = express.Router();

// User Routes
orderRouter.post("/user", authUser, userOrders);
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/cancelStripe", authUser, cancelStripe);
orderRouter.post("/receive", authUser, receiveOrder);

// Admin Routes
orderRouter.post("/admin", authAdmin, adminOrders);
orderRouter.post("/recent", authAdmin, recentOrders);
orderRouter.post("/sales", authAdmin, salesCount);
orderRouter.post("/revenue", authAdmin, revenueTotal);
orderRouter.post("/status", authAdmin, updateStatus);

// Staff Routes
orderRouter.post("/staff", authStaff, staffOrders);
orderRouter.post("/pos", authStaff, placeOrderPOS);

export default orderRouter;