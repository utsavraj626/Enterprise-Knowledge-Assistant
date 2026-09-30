import { createContext, useContext, useState } from "react";

import api from "../services/api.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {

        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem( "user", JSON.stringify(user) );

        setUser(user);

        return response.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export {
    AuthProvider,
    useAuth
};