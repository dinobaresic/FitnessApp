import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                email: email,
                password: password
            });
            
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("role", response.data.role);
    
            alert("Login successful!");
    
            // Redirect based on role
            if (response.data.role === "COACH") {
                window.location.href = "/coach-dashboard";
            } else if (response.data.role === "CLIENT") {
                window.location.href = "/client-dashboard";
            } else {
                alert("Unknown role");
            }
        } catch (error) {
            // Check if the error is an object and display a meaningful message
            const errorMessage = error.response && error.response.data
                ? JSON.stringify(error.response.data)
                : "Error during login";
    
            setMessage(errorMessage); // This will be rendered
        }
    };

    return (
        <div className="relative min-h-screen">
        <div className="flex justify-center items-center bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg ">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </div>

            </div>

            <Footer />
        </div>
    );
};

export default Login;
