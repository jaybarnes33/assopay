import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserSchema extends Document {
  gender?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  email: string;
  hall?: string;
  username: string;
  password: string;
  otherNames: string;
  level: number;
}

const userSchema = new mongoose.Schema<IUserSchema>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  otherNames: {
    type: String,
  },
  hall: {
    type: String,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  phone: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
