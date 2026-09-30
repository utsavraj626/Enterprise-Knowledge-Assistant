import { getDB } from "./db.service.js";

const createHistory = async (history) => {
    const db = getDB();

    const collection = db.collection("history");

    const result = await collection.insertOne(history);

    return result;
};

const getUserHistory = async (userId) => {
    const db = getDB();

    const collection = db.collection("history");

    const history = await collection
        .find({
            userId: userId
        })
        .sort({ createdAt: -1 })
        .toArray();

    return history;
};

const getHistoryById = async (historyId, userId) => {
    const db = getDB();

    const collection = db.collection("history");

    const history = await collection.findOne({
        historyId: historyId,
        userId: userId
    });

    return history;
};

export {
    createHistory,
    getUserHistory,
    getHistoryById
};