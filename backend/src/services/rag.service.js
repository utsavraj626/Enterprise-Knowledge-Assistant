import { getDB } from "./db.service.js";
import { generateEmbedding } from "./embedding.service.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const TOP_K = 5;
const MIN_SCORE = 0.5;

const answerQuestion = async (question,  documentId) => {

    // Step 1: Convert the user's question into an embedding
    const questionEmbedding = await generateEmbedding(question);

    // Step 2: Get MongoDB database
    const db = getDB();

    const collection = db.collection("chunks");

    // Step 3: Search for the most relevant chunks
    const results = await collection.aggregate([
        {
            $vectorSearch: {
                index: "vector_index",
                path: "embedding",
                queryVector: questionEmbedding,
                numCandidates: 100,
                limit: TOP_K,
                filter: {
                    documentId: documentId
                }
            }
        },
        {
            $project: {
                _id: 0,
                text: 1,
                filename: 1,
                documentId: 1,
                pageNumber: 1,
                chunkIndex: 1,
                score: {
                    $meta: "vectorSearchScore"
                }
            }
        }
    ]).toArray();

   // Step 4: Remove low-relevance chunks
    const relevantResults = results.filter(
        (result) => result.score >= MIN_SCORE
    );

     // Step 5: Create context for Gemini
    const context = relevantResults.map((result) => {
            return `Source: ${result.filename}
                    Page: ${result.pageNumber}
                    ${result.text}
                    `;
        })
        .join("\n\n");

    // Step 6: Ask Gemini to answer using the retrieved context
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
You are a helpful PDF question-answering assistant.

Answer the user's question using only the information provided in the context below.

If the answer cannot be found in the context, say:
"I could not find the answer in the provided PDF."

Context:
${context}

Question:
${question}
`
    });

    return {
        answer: response.text,
        sources: relevantResults
    };
};

export { answerQuestion };