import { useEffect, useState } from "react";

import api from "../services/api.js";

const AdminDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/documents"
            );

            setDocuments(
                response.data.documents || []
            );

        } catch (error) {
            console.error(
                "Failed to fetch admin documents:",
                error
            );

            setError(
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch documents."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="p-8">

            <div className="mx-auto max-w-6xl">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Manage documents in the knowledge base.
                    </p>

                </div>

                {loading && (
                    <p className="text-gray-600">
                        Loading documents...
                    </p>
                )}

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    documents.length === 0 && (
                        <div className="rounded-xl bg-white p-8 shadow-sm">
                            <p className="text-gray-600">
                                No documents found.
                            </p>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    documents.length > 0 && (
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                            <div className="overflow-x-auto">

                                <table className="w-full text-left">

                                    <thead className="border-b bg-gray-50">

                                        <tr>

                                            <th className="px-6 py-4 text-sm font-semibold">
                                                Document
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold">
                                                Pages
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold">
                                                Chunks
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold">
                                                Owner
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {documents.map(
                                            (document) => (
                                                <tr
                                                    key={
                                                        document.documentId
                                                    }
                                                    className="border-b last:border-b-0"
                                                >

                                                    <td className="px-6 py-4 text-sm">
                                                        {
                                                            document.filename
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {
                                                            document.pages
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {
                                                            document.totalChunks
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {
                                                            document.userId
                                                        }
                                                    </td>

                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    )}

            </div>

        </div>
    );
};

export default AdminDashboard;