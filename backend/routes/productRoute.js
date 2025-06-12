import express from "express";
import { productList, productAdd, productRemove, productSingle } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/list", productList);

productRouter.post("/add", productAdd);
productRouter.post("/remove", productRemove);
productRouter.post("/single", productSingle);

export default productRouter;