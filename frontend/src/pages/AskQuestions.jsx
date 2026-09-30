import { useEffect, useState } from "react";

import api from "../services/api.js";

const AskQuestions = () => {
    const [documents, setDocuments] = useState([]);
    const [documentId, setDocumentId] = useState("");
    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");
    const [sources, setSources] = useState([]);

    const [loadingDocuments, setLoadingDocuments] = useState(true);

    const [asking, setAsking] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await api.get(
                    "/documents"
                );

                setDocuments(
                    response.data.documents
                );

            } catch (error) {
                console.error(
                    "Failed to fetch documents:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load documents."
                );

            } finally {
                setLoadingDocuments(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleAskQuestion = async (event) => {
        event.preventDefault();

        setError("");
        setAnswer("");
        setSources([]);

        if (!documentId) {
            setError(
                "Please select a document."
            );

            return;
        }

        if (!question.trim()) {
            setError(
                "Please enter a question."
            );

            return;
        }

        try {
            setAsking(true);

            const response = await api.post(
                "/pdf/ask",
                {
                    documentId,
                    question
                }
            );

            setAnswer(response.data.answer);
            setSources(response.data.sources || []);

        } catch (error) {
            console.error(
                "Question answering failed:",
                error
            );

            const backendError =
            error.response?.data?.error;

            const backendMessage =
            error.response?.data?.message;

            if (backendError) {
                setError(
                    `Error: ${backendError}`
                );
            } else if (backendMessage) {
                    setError(backendMessage);
            } else if (error.request) {
                    setError(
                    "No response received from the server. Please check your internet connection or try again."
                );
            } else {
                setError(
                    error.message ||
                    "Failed to answer question."
                 );
            }
        }finally {
            setAsking(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-4xl">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Ask Questions
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Select a PDF and ask questions about its content.
                    </p>

                </div>

                <form
                    onSubmit={handleAskQuestion}
                    className="rounded-xl bg-white p-8 shadow-sm"
                >

                    <div className="mb-6">

                        <label
                            htmlFor="document"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Select Document
                        </label>

                        <select
                            id="document"
                            value={documentId}
                            onChange={(event) =>
                                setDocumentId(
                                    event.target.value
                                )
                            }
                            disabled={loadingDocuments}
                            className="w-full rounded-lg border border-gray-300 p-3"
                        >

                            <option value="">
                                {loadingDocuments
                                    ? "Loading documents..."
                                    : "Select a PDF"}
                            </option>

                            {documents.map((document) => (
                                <option
                                    key={document.documentId}
                                    value={document.documentId}
                                >
                                    {document.filename}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div className="mb-6">

                        <label
                            htmlFor="question"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Your Question
                        </label>

                        <textarea
                            id="question"
                            value={question}
                            onChange={(event) =>
                                setQuestion(
                                    event.target.value
                                )
                            }
                            placeholder="Ask something about the selected PDF..."
                            rows="5"
                            className="w-full resize-none rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                        />

                    </div>

                    {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                        <p className="font-medium">
                            Unable to answer the question
                        </p>

                        <p className="mt-1 wrap-break-words">
                            {error}
                        </p>
                    </div>
                    )}

                    <button
                        type="submit"
                        disabled={asking}
                        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {asking
                            ? "Finding answer..."
                            : "Ask Question"}
                    </button>

                </form>

                {answer && (
                    <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

                        <h2 className="mb-4 text-xl font-semibold text-gray-900">
                            Answer
                        </h2>

                        <p className="whitespace-pre-wrap leading-7 text-gray-700">
                            {answer}
                        </p>

                    </div>
                )}

                {sources.length > 0 && (
                    <div className="mt-6 rounded-xl bg-white p-8 shadow-sm">

                        <h2 className="mb-4 text-xl font-semibold text-gray-900">
                            Sources
                        </h2>

                        <div className="space-y-3">

                            {sources.map((source, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg bg-gray-50 p-4"
                                >

                                    <p className="text-sm font-medium text-gray-800">
                                        {source.filename}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Page: {source.pageNumber}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        Chunk: {source.chunkIndex}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default AskQuestions;