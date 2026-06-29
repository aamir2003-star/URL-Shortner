import mongoose  from "mongoose";

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/short-url";
  await mongoose.connect(dbURI)
  .then(()=> console.log("mongodb connected"))
  .catch((err) => console.log("Error connecting mongodb", err))
}

export default connectDB