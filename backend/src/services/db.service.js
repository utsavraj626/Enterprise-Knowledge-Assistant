import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

let db;

const connectDB = async () => {
    try {
        await client.connect();

        db = client.db("pdf_qa");

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error("Database is not connected");
    }

    return db;
};

export { connectDB, getDB };