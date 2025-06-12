import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";


// Creating Token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route For User Sign In
const userSignIn = async (req, res) => {

}

// Route For User Sign Up
const userSignUp = async (req, res) => {
    try {
        // Getting Request Body
        const { name, email, password } = req.body;
        
        // Checking If Email Already Exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message: "User already exists"});
        }

        // Validating Email & Password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"});
        }

        // Hashing User Password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Saving New User
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        });
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})
    } catch (error) {
        
    }
}

// Route For Admin Login
const adminSignIn = async (req, res) => {

}

export { userSignIn, userSignUp, adminSignIn };