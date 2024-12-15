import userModel from "../models/userModel.js";

export const updateUser = async (req, res) => {
  try {
    const { userEmail } = req.params;

    const user = await userModel.findOne({ email: userEmail });
    const loggedInUserId = req.user.id;

    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }
    if (user._id.toString() !== loggedInUserId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this user" });
    }
    user.set(req.body);
    await user.save();
    return res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error:Error updating user! ${error}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const loggedInUserId = req.user.id;
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }
    if (user._id.toString() !== loggedInUserId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this user" });
    }
    await user.deleteOne();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `Internal Server Error: Error deleting user! ${error}`,
      });
  }
};
