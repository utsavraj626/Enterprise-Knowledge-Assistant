import { getDB } from "./db.service.js";

const createUser = async (user) => {
    const db = getDB();

    const collection = db.collection("users");

    const result = await collection.insertOne(user);

    return result;
};

const getUserByEmail = async (email) => {
    const db = getDB();

    const collection = db.collection("users");

    const user = await collection.findOne({
        email: email
    });

    return user;
};

const getUserById = async (userId) => {
    const db = getDB();

    const collection = db.collection("users");

    const user = await collection.findOne({
        userId: userId
    });

    return user;
};

export {
    createUser,
    getUserByEmail,
    getUserById
};