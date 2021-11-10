import mongoose, { ConnectOptions } from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return await mongoose.connect(
    process.env.NODE_ENV === "production"
      ? process.env.ATLAS_URI
      : process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    } as ConnectOptions
  );
}

export default dbConnect;
