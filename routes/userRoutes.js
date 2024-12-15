import express from "express";
import { updateUser, deleteUser } from "../contollers/userController.js";
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";
router.use("/update/:userEmail", authMiddleware, updateUser);
router.use("/delete/:userEmail", authMiddleware, deleteUser);

export default router;
