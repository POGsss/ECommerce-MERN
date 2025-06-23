import { addToCart, updateCart, getCart } from "../controllers/cartController.js";
import express from "express";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/get", authUser, getCart);

export default cartRouter;