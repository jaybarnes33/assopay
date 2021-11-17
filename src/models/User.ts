import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IDues {
  year: string;
  amount: string;
  reference: Record<string, string | number>;
}

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
  dues: Array<IDues>;
  campus: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUserSchema>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  otherNames: {
    type: String
  },
  hall: {
    type: String
  },
  password: {
    type: String,
    min: 8,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  gender: {
    type: String
  },
  phone: { type: String },
  dues: [
    {
      type: new Schema({
        year: {
          type: String,
          default: `${new Date().getFullYear()} - ${
            new Date().getFullYear() + 1
          }`
        },
        amount: {
          type: Number,
          default: 0
        },

        reference: {
          type: Schema.Types.Mixed
        }
      })
    }
  ],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  campus: { type: String, required: true }
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

userSchema.index({ "$**": "text" });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
