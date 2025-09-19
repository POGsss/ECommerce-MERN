import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

// Create Token Function
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// Sign In Function
const userSignIn = async (req, res) => {
    try {
        // Getting User Input
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        
        // Checking If User Is Available
        if (!user) {
            return res.json({success: false, message: "User doesn't exists"});
        }

        // Checking If Password Match
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success: true, token});
        } else {
            res.json({success: false, message: "Invalid credentials"});
        }
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Sign Up Function
const userSignUp = async (req, res) => {
    try {
        // Getting User Input
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({email});
        
        // Checking If Email Already Exists
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Saving New User
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);

        // Returning Success Response
        res.json({success: true, token});
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Admin Sign In Function
const adminSignIn = async (req, res) => {
    try {
        // Getting User Input
        const { email, password } = req.body;

        // Validating Admin Credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token});
        } else {
            res.json({success: false, message: "Invalid Credentials"});
        }
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Staff Sign In Function
const staffSignIn = async (req, res) => {
    try {
        // Getting User Input
        const { email, password } = req.body;

        // Validating Admin Credentials
        if (email === process.env.STAFF_EMAIL && password === process.env.STAFF_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token});
        } else {
            res.json({success: false, message: "Invalid Credentials"});
        }
    } catch (error) {
        // Logging Error
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { userSignIn, userSignUp, adminSignIn, staffSignIn };