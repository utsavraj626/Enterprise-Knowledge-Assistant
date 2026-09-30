import { randomUUID } from "crypto";
import  {extractTextFromPDF}  from "../services/pdf.service.js";
//import  {chunkText}  from "../services/chunk.service.js";
import { chunkPages } from "../services/page-chunk.service.js";
import { createDocument } from "../services/document-db.service.js";
import { generateEmbedding } from "../services/embedding.service.js";
import { saveChunks } from "../services/chunk-db.service.js";

const uploadPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF file"
            });
        }
        
        const documentId = randomUUID();

        const userId = req.user.userId;

        const result = await extractTextFromPDF(req.file.path);

        const chunks = chunkPages(result.pages);

        const chunksWithEmbeddings = [];

        for (const chunk of chunks) {
            const embedding = await generateEmbedding(chunk.text);

            chunksWithEmbeddings.push({
                text: chunk.text,
                embedding: embedding,
                pageNumber: chunk.pageNumber,
                chunkIndex: chunk.chunkIndex,
                documentId: documentId
                });
        }
         
        await saveChunks( chunksWithEmbeddings, req.file.filename);

        await createDocument({
                documentId: documentId,
                userId: userId,
                filename: req.file.filename,
                pages: result.totalPages,
                totalChunks: chunksWithEmbeddings.length,
                createdAt: new Date()
            });

        res.status(200).json({
            message: "PDF uploaded and processed successfully",
            documentId: documentId,
            filename: req.file.filename,
            pages: result.pages,
            text: result.text,
            totalChunks: chunksWithEmbeddings.length
        });

    } catch (error) {
        console.error("PDF processing error:", error);

        res.status(500).json({
            message: "Failed to process PDF",
            error: error.message
        });
    }
};

export { uploadPDF };