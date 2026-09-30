import { getAllDocumentsForAdmin } from "../services/document-db.service.js";

const getAdminDocuments = async (req, res) => {
    try {
        const documents = await getAllDocumentsForAdmin();

        res.status(200).json({
            documents: documents
        });

    } catch (error) {
        console.error(
            "Admin document fetch error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch documents",
            error: error.message
        });
    }
};

export {
    getAdminDocuments
};