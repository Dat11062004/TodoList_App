import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details!" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "Account already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = User.create({
      email,
      fullName: name,
      password: hashedPassword,
    });
    const token = generateToken(newUser._id);
    res.json({
      success: true,
      user: newUser,
      token,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    const isPassWordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPassWordCorrect) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = generateToken(userData._id);
    res.json({
      success: true,
      user: userData,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getList = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "Invalid User!" });
    }
    const tasks = user.tasks;
    res.json({ success: true, tasks });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const addWork = async (req, res) => {
  try {
    const userId = req.user._id;
    const { input } = req.body;
    const updateTasks = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          tasks: {
            content: input,
          },
        },
      },
      { new: true }
    );
    res.json({ success: true, message: "Added successfully!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const updateStateTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: taskId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "Invalid User!" });
    }
    const tasks = user.tasks;
    const task = user.tasks.find(
      (t) => t._id.toString() === taskId // Phải so sánh toString
    );
    if (!task) {
      res.json({ success: false, message: "Task not found!" });
    }
    task.done = !task.done;

    await user.save();
    res.json({ success: true, message: "Updated successfully!", task });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: taskId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { tasks: { _id: taskId } },
      },
      { new: true }
    );
    if (!user) {
      return res.json({ success: false, message: "Invalid User!" });
    }
    res.json({ success: true, message: "Task deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
