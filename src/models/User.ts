import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserSchema extends Document {
  fName: string;
  lName: string;
  email: string;
  username: string;
  password: string;
  country: string;
  background: string;
}

const userSchema = new mongoose.Schema<IUserSchema>({
  image: {
    type: String,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
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
  country: {
    type: String,
    required: true,
  },
  background: {
    type: String
  }
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
