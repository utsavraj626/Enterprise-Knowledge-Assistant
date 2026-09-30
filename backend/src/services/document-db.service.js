import { getDB } from "./db.service.js";

const createDocument = async (document) => {
    const db = getDB();

    const collection = db.collection("documents");

    const result = await collection.insertOne(document);

    return result;
};

const getAllDocumentsForAdmin = async () => {
    const db = getDB();
    const collection = db.collection("documents");

    const documents = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    return documents;
};

const getDocuments = async (userId) => {
    const db = getDB();

    const collection = db.collection("documents");

    const documents = await collection
        .find({ userId : userId })
        .sort({ createdAt: -1 })
        .toArray();

    return documents;
};

const getDocumentById = async (documentId, userId) => {
    const db = getDB();

    const collection = db.collection("documents");

    const document = await collection.findOne({
        documentId: documentId,
        userId : userId
    });

    return document;
};

export {
    createDocument,
    getDocuments,
    getDocumentById,
    getAllDocumentsForAdmin
};