import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, requireed: true },
  email: { type: String, requireed: true },
  password: { type: String, requireed: true },
  id: { type: String },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
