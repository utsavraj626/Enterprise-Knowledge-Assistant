import Sidebar from "../components/Sidebar.jsx";

const ProtectedLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">

            <Sidebar />

            <main className="ml-72 min-h-screen">
                {children}
            </main>

        </div>
    );
};

export default ProtectedLayout;