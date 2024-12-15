import blogModel from "../models/blogModel.js";

export const blogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new blogModel({ title, content, userId: req.user.id });
    await blog.save();
    return res.status(201).json({ message: "Blog posted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error: Error posting blog! ${error}` });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogModel.find().populate("userId", "username");
    return res.json(allBlogs);
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error: Error getting all blogs ${error}`,
    });
  }
};

export const getUserBlog = async (req, res) => {
  try {
    const userBlogs = await blogModel.find({ userId: req.user.id });
    return res.json(userBlogs);
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error: Error getting user blogs ${error}`,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const findBlog = await blogModel.findOne({ _id: id, userId: req.user.id });
    const loggedInUserId = req.user.id;
    if (!findBlog) {
      return res.status(404).json({ message: `Blog not found:` });
    }
    if (findBlog.userId.toString() !== loggedInUserId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog" });
    }
    findBlog.set(req.body);
    await findBlog.save();
    return res.status(200).json({ message: "Blog data updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error: Error updating user blogs ${error}`,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const findBlog = await blogModel.findOne({ _id: id, userId: req.user.id });
    const loggedInUserId = req.user.id;
    if (!findBlog) {
      return res.json(404).json({ message: `Blog not found:` });
    }
    if (findBlog.userId.toString() !== loggedInUserId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }
    await findBlog.deleteOne();
    return res.json({ message: `Blog deleted successfully` });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error: Error deleting user blogs ${error}`,
    });
  }
};
