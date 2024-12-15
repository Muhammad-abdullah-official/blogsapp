import express from "express";
import { registerUser, loginUser } from "../contollers/authController.js";
import { userValidation } from "../utils/validation.js";
const router = express.Router();

router.post("/register", userValidation, registerUser);
router.post("/login", loginUser);

export default router;
