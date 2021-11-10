import mongoose, { ConnectOptions } from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(
    process.env.NODE_ENV === "production"
      ? process.env.ATLAS_URI
      : process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );
}

export default dbConnect;
