import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, default:'User'}
});

const User = mongoose.model('User', UserSchema);
export default User;
