import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, profilePicture, bio } = req.body;
    const user = new userModel({
      name,
      username,
      email,
      password,
      profilePicture,
      bio,
    });
    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `Internal Server Error: Error registering user! ${error}`,
      });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error: error in token ${error}` });
  }
};

export { registerUser, loginUser };
