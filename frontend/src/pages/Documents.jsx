import { useEffect, useState } from "react";

import api from "../services/api.js";
import DocumentCard from "../components/DocumentCard.jsx";

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/documents");

            setDocuments(response.data.documents);

        } catch (error) {
            console.error(
                "Failed to fetch documents:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load documents"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-6xl">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        My Documents
                    </h1>

                    <p className="mt-2 text-gray-600">
                        View your uploaded PDF documents.
                    </p>

                </div>

                {loading && (
                    <p className="text-gray-600">
                        Loading documents...
                    </p>
                )}

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-red-600">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    documents.length === 0 && (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                            <p className="text-gray-600">
                                You have not uploaded any PDFs yet.
                            </p>

                        </div>
                    )}

                {!loading &&
                    !error &&
                    documents.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {documents.map((document) => (
                                <DocumentCard
                                    key={document.documentId}
                                    document={document}
                                />
                            ))}

                        </div>
                    )}

            </div>

        </div>
    );
};

export default Documents;