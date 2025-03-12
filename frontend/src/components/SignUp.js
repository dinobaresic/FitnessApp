import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("CLIENT"); // Default role: CLIENT
    const [message, setMessage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", {
                username,
                email,
                password,
                role, // Send role to backend
            });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response ? error.response.data : "Error during sign-up");
        }
    };

    return (
        <div className="relative min-h-screen">
        <div className="flex justify-center items-center bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up</h1>
                <form onSubmit={handleSignUp} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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

                    {/* Role Selection */}
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="CLIENT">Client</option>
                        <option value="COACH">Coach</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </div>
        </div>
    </div>
    );
};

export default SignUp;
