import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api.js";

const HistoryDetails = () => {
    const { historyId } = useParams();

    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/history/${historyId}`
                );

                setHistory(response.data.history);

            } catch (error) {
                console.error(
                    "Failed to fetch history:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load history."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [historyId]);

    if (loading) {
        return (
            <div className="p-8 text-gray-600">
                Loading conversation...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">

                <div className="rounded-lg bg-red-50 p-4 text-red-600">
                    {error}
                </div>

            </div>
        );
    }

    if (!history) {
        return (
            <div className="p-8 text-gray-600">
                History not found.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-8">

            <div className="mb-8">

                <p className="text-sm text-gray-500">
                    {history.filename}
                </p>

            </div>

            {/* Question */}
            <div className="mb-6 flex justify-end">

                <div className="max-w-2xl rounded-2xl bg-black px-5 py-4 text-white">

                    <p className="whitespace-pre-wrap">
                        {history.question}
                    </p>

                </div>

            </div>

            {/* Answer */}
            <div className="mb-8">

                <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="mb-3 text-sm font-semibold text-gray-500">
                        Answer
                    </h2>

                    <p className="whitespace-pre-wrap leading-7 text-gray-700">
                        {history.answer}
                    </p>

                </div>

            </div>

            {/* Sources */}
            {history.sources &&
                history.sources.length > 0 && (
                    <div className="rounded-xl bg-white p-6 shadow-sm">

                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Sources
                        </h2>

                        <div className="space-y-3">

                            {history.sources.map(
                                (source, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg bg-gray-50 p-4"
                                    >

                                        <p className="text-sm font-medium text-gray-800">
                                            {history.filename}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Page:{" "}
                                            {source.pageNumber}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            Chunk:{" "}
                                            {source.chunkIndex}
                                        </p>

                                    </div>
                                )
                            )}

                        </div>

                    </div>
                )}

        </div>
    );
};

export default HistoryDetails;