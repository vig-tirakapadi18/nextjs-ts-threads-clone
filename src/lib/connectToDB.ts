import mongoose from "mongoose";

const connectionStr = process.env.MONGO_CONN_STR as string;

export const connectToDB = () => {
  mongoose.set("strictQuery", true);

  if (!connectionStr)
    return console.log("MongoDB connection string is missing!");

  return mongoose
    .connect(connectionStr)
    .then(() => console.log("Connection established with MongoDB!"))
    .catch((error) => console.log(error));
};
