import express from "express";
import { userSignIn, userSignUp, adminSignIn } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/signin", userSignIn);
userRouter.post("/admin", adminSignIn);

export default userRouter;