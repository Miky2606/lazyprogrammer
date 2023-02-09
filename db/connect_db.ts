import mongoose from "mongoose";

const connect_db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tempjs");
    mongoose.set("strictQuery", true);
  } catch (error) {
    console.log(error);
  }
};

export default connect_db;
