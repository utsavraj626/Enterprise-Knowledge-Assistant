import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api.js";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");

            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            navigate("/login");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Create Account
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
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                    />

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
                        Register
                    </button>

                </form>

                <p className="mt-6 text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;