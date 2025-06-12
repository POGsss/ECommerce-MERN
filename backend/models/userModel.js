import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { typeof: String, required: true },
    email: { typeof: String, required: true, unique: true},
    password: { typeof: String, required: true },
    cartData: { typeof: Object, default: {} }
},{minimize: false});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;