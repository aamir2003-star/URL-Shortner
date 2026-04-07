import mongoose  from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/short-url")
  .then(()=> console.log("mongodb connected"))
  .catch((err) => console.log("Error connecting mongodb", err))
}

export default connectDB