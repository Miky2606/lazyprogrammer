import mongoose from "mongoose";

export const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    mongoose.set("strictQuery", true);
  } catch (error) {
    toast.error("Error in db");
  }
};

import { MongoClient } from "mongodb";
import { toast } from "react-toastify";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

let globalMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
