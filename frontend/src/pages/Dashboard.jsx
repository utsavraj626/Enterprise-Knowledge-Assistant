import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-8">

            <div className="mx-auto max-w-6xl">

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Manage your Knowlege base and ask questions using RAG.
                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-3">

                    <button
                        onClick={() =>
                            navigate("/documents")
                        }
                        className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
                    >
                        <div className="mb-4 text-4xl">
                            📚
                        </div>

                        <h3 className="text-xl font-semibold">
                            My Documents
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            View your uploaded PDF documents.
                        </p>
                    </button>

                    <button
                        onClick={() =>
                            navigate("/upload")
                        }
                        className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
                    >
                        <div className="mb-4 text-4xl">
                            📤
                        </div>

                        <h3 className="text-xl font-semibold">
                            Upload PDF
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Upload a new PDF to your knowledge base.
                        </p>
                    </button>

                    <button
                        onClick={() =>
                            navigate("/ask")
                        }
                        className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
                    >
                        <div className="mb-4 text-4xl">
                            💬
                        </div>

                        <h3 className="text-xl font-semibold">
                            Ask Questions
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Ask questions about your PDF documents.
                        </p>
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;