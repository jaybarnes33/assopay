import mongoose, { Document } from "mongoose";

export interface ICardSchema extends Document {
  link: string;
  description: string;
  author: string;
  image: string;
  title: string;
  icon: String;
  creator: String;
  category: String;
  reaction: String;
}

const CardSchema = new mongoose.Schema<ICardSchema>(
  {
    link: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    author: {
      type: String,
    },
    image: {
      type: String,
    },
    favicon: {
      type: String,
    },
    category: {
      type: String,
    },
    reaction: {
      type: String,
    },
  },
  { timestamps: true }
);
const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);
export default Card;
