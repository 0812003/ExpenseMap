import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // no `required: true`, optional for Google users
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },

  // 👇 New fields for Google Sign-In
  googleId: { type: String, default: null },
  profilePic: { type: String, default: "" },
  createdWithGoogle: { type: Boolean, default: false }
},{
  timestamps: true  // 🟢 This will add `createdAt` and `updatedAt` automatically
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
