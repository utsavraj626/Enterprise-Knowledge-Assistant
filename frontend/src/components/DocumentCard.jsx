const DocumentCard = ({ document }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="mb-4">

                <div className="mb-2 text-3xl">
                    📄
                </div>

                <h3 className="wrap-break-words text-lg font-semibold text-gray-800">
                    {document.filename}
                </h3>

            </div>

            <div className="space-y-1 text-sm text-gray-600">

                <p>
                    Pages: {document.pages}
                </p>

                <p>
                    Chunks: {document.totalChunks}
                </p>

            </div>

        </div>
    );
};

export default DocumentCard;