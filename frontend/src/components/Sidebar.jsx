import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, logout } = useAuth();

    const fetchHistory = async () => {
        try {
            setLoading(true);

            const response = await api.get("/history");

            setHistory(response.data.history || []);

        } catch (error) {
            console.error(
                "Failed to fetch history:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-gray-200 bg-gray-50">

            {/* Logo */}
            <div className="border-b border-gray-200 px-5 py-5">

                <h1 className="text-xl font-bold text-gray-900">
                    Knowledge Assistant
                </h1>

            </div>

            {/* New Question */}
            <div className="p-4">

                <NavLink
                    to="/ask"
                    className="flex w-full items-center justify-center rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                    + New Question
                </NavLink>

            </div>

            {/* History */}
            <div className="flex-1 overflow-y-auto px-3">

                <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    History
                </h2>

                {loading && (
                    <p className="px-2 text-sm text-gray-500">
                        Loading history...
                    </p>
                )}

                {!loading && history.length === 0 && (
                    <p className="px-2 text-sm text-gray-500">
                        No questions yet.
                    </p>
                )}

                {!loading && history.length > 0 && (
                    <div className="space-y-1">

                        {history.map((item) => (
                            <NavLink
                                key={item.historyId}
                                to={`/history/${item.historyId}`}
                                className={({ isActive }) =>
                                    `block rounded-lg px-3 py-3 text-sm transition ${
                                        isActive
                                            ? "bg-gray-200 text-gray-900"
                                            : "text-gray-700 hover:bg-gray-200"
                                    }`
                                }
                            >
                                <p className="truncate font-medium">
                                    {item.question}
                                </p>

                                <p className="mt-1 truncate text-xs text-gray-500">
                                    {item.filename}
                                </p>
                            </NavLink>
                        ))}

                    </div>
                )}

            </div>

            {/* Bottom navigation */}
            <div className="border-t border-gray-200 p-4">

                <NavLink
                    to="/dashboard"
                    className="mb-2 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/documents"
                    className="mb-2 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                    My Documents
                </NavLink>

                <NavLink
                    to="/upload"
                    className="mb-3 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                    Upload PDF
                </NavLink>

                <div className="flex items-center justify-between border-t border-gray-200 pt-3">

                    <div className="min-w-0">

                        <p className="truncate text-sm font-medium text-gray-900">
                            {user?.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                            {user?.email}
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="ml-3 rounded-lg border border-gray-300 px-3 py-2 text-xs hover:bg-white"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;