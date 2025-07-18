import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: false },
    status: { type: String, required: true, default: "Order Placed" },
    paymentMethod: { type: String, required: false },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true },
    source: { type: String, enum: ["online", "store"], default: "online" }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;