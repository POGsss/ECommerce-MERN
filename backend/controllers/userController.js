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
    try {
        // Getting User Input
        const { email, password } = req.body;
        const user = await userModel.findOne({email})
        
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
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Route For User Sign Up
const userSignUp = async (req, res) => {
    try {
        // Getting User Input
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({email})
        
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
        const user = await newUser.save()
        const token = createToken(user._id)

        // Returning Success Response
        res.json({success: true, token})
    } catch (error) {
        // Logging Error
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Route For Admin Login
const adminSignIn = async (req, res) => {

}

export { userSignIn, userSignUp, adminSignIn };