import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api.js";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        setMessage("");
        setError("");

        if (!selectedFile) {
            setFile(null);
            return;
        }

        if (selectedFile.type !== "application/pdf") {
            setFile(null);

            setError(
                "Please select a PDF file."
            );

            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            setError("Please select a PDF file.");
            return;
        }

        try {
            setUploading(true);
            setError("");
            setMessage("");

            const formData = new FormData();

            formData.append("pdf", file);

            const response = await api.post(
                "/pdf/upload",
                formData
            );

            setMessage(
                response.data.message ||
                "PDF uploaded successfully."
            );

            setFile(null);

        } catch (error) {
            console.error(
                "PDF upload failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to upload PDF."
            );

        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-2xl">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Upload PDF
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Upload a PDF to add it to your knowledge base.
                    </p>

                </div>

                <form
                    onSubmit={handleUpload}
                    className="rounded-xl bg-white p-8 shadow-sm"
                >

                    <div className="mb-6">

                        <label
                            htmlFor="pdf"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Select PDF
                        </label>

                        <input
                            id="pdf"
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                            className="block w-full rounded-lg border border-gray-300 p-3 text-sm"
                        />

                    </div>

                    {file && (
                        <div className="mb-6 rounded-lg bg-gray-50 p-4">

                            <p className="text-sm font-medium text-gray-800">
                                Selected file
                            </p>

                            <p className="mt-1 break-all text-sm text-gray-600">
                                {file.name}
                            </p>

                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {uploading
                            ? "Uploading and processing..."
                            : "Upload PDF"}
                    </button>

                    {message && (
                        <button
                            type="button"
                            onClick={() => navigate("/documents")}
                            className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            View My Documents
                        </button>
                    )}

                </form>

            </div>

        </div>
    );
};

export default Upload;