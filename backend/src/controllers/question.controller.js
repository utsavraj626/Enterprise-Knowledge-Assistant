import { randomUUID } from "crypto";
import { answerQuestion } from "../services/rag.service.js";
import { createHistory } from "../services/history-db.service.js";
import { getDocumentById } from "../services/document-db.service.js";


const askQuestion = async (req, res) => {
    try {
        const { question, documentId } = req.body;

        const userId = req.user.userId;

        if (!question) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        if (!documentId) {
            return res.status(400).json({
                message: "Document ID is required"
            });
        }

        const document = await getDocumentById( documentId, userId );

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        const result = await answerQuestion(question, documentId);

        const history = {
            historyId: randomUUID(),
            userId: userId,
            documentId: documentId,
            filename: document.filename,
            question: question,
            answer: result.answer,
            sources: result.sources.map((source) => ({
                pageNumber: source.pageNumber,
                chunkIndex: source.chunkIndex,
                score: source.score
            })),
            createdAt: new Date()
        };

        await createHistory(history);


        res.status(200).json({
            question,
            documentId,
            answer: result.answer,
            sources: result.sources
        });

    } catch (error) {
        console.error("Question answering error:", error);

        res.status(500).json({
            message: "Failed to answer question",
            error: error.message
        });
    }
};

export { askQuestion };