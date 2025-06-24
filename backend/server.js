import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express()
const port = process.env.PORT || 4000;
const host = process.env.HOST || "0.0.0.0";
connectDB()
connectCloudinary()

// Middleware
app.use(cors())
app.use(express.json())

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working")
})
app.listen(port, host, () => {
    console.log("Server started on PORT: " + port)
    console.log("Server started on HOST: " + host)
})