import {getDocuments, getDocumentById} from "../services/document-db.service.js";

const getAllDocuments = async (req, res) => {
    try {
        const userId = req.user.userId;

        const documents = await getDocuments(userId);

        res.status(200).json({
            documents: documents
        });

    } catch (error) {
        console.error("Fetching documents error:", error);

        res.status(500).json({
            message: "Failed to fetch documents",
            error: error.message
        });
    }
};

const getSingleDocument = async (req, res) => {
    try {
        const { documentId } = req.params;

        const userId = req.user.userId;

        const document = await getDocumentById(documentId, userId);

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        res.status(200).json({
            document: document
        });

    } catch (error) {
        console.error("Fetching document error:", error);

        res.status(500).json({
            message: "Failed to fetch document",
            error: error.message
        });
    }
};

export {
    getAllDocuments,
    getSingleDocument
};