import express from "express";
import { productList, productSingle, productRemove, productAdd } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const productRouter = express.Router();

productRouter.get("/list", productList);
productRouter.post("/single", productSingle);
productRouter.post("/remove", authAdmin, productRemove);
productRouter.post("/add", authAdmin, upload.fields([{name: "image1", maxCount: 1}, {name: "image2", maxCount: 1}, {name: "image3", maxCount: 1}, {name: "image4", maxCount: 1}]), productAdd);

export default productRouter;