import {
  login,
  signup,
  addWork,
  getList,
  updateStateTask,
  deleteTask,
} from "../controllers/userController.js";
import express from "express";
import { protectRoute } from "../middleware/auth.js";
const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/list", protectRoute, getList);
userRouter.post("/add", protectRoute, addWork);
userRouter.post("/update/:id", protectRoute, updateStateTask);
userRouter.delete("/delete/:id", protectRoute, deleteTask);
export default userRouter;
