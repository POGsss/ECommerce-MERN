import express from "express";
import { userSignIn, userSignUp, adminSignIn, staffSignIn } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signin", userSignIn);
userRouter.post("/signup", userSignUp);
userRouter.post("/admin", adminSignIn);
userRouter.post("/staff", staffSignIn);

export default userRouter;