import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [
      {
        content: { type: String },
        done: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
