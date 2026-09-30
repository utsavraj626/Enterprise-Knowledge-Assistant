import { getDB } from "./db.service.js";

const saveChunks = async (chunks, filename) => {
    const db = getDB();

    const collection = db.collection("chunks");

    const documents = chunks.map((chunk) => ({
        text: chunk.text,
        embedding: chunk.embedding,
        filename: filename,
        documentId: chunk.documentId,
        pageNumber: chunk.pageNumber,
        chunkIndex: chunk.chunkIndex,
        createdAt: new Date()
    }));

    const result = await collection.insertMany(documents);

    return result;
};

export { saveChunks };