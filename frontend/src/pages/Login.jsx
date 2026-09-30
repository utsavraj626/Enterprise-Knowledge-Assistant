import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");

            await login(email, password);

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Login
                </h1>

                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-lg p-3"
                    >
                        Login
                    </button>

                </form>

                <p className="mt-6 text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="underline"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;