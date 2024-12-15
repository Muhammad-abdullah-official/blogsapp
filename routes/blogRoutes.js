import express from "express";
import {
  blogPost,
  getAllBlogs,
  getUserBlog,
  updateBlog,
  deleteBlog,
} from "../contollers/blogController.js";
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";

router.use("/post", authMiddleware, blogPost);
router.use("/all", authMiddleware, getAllBlogs);
router.use("/get", authMiddleware, getUserBlog);
router.use("/update/:id", authMiddleware, updateBlog);
router.use("/delete/:id", authMiddleware, deleteBlog);
export default router;
