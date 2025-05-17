import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../config";
import { HeaderS } from "./header";
import toast from 'react-hot-toast';

export const Auth = ({ type }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendRequest();
        }
    };

    async function sendRequest() {
        const loadingToastId = toast.loading(`Attempting to ${type}...`);
        try {
            console.log(`${REACT_APP_BACKEND_URL}/api/v1/user/${type}`);
            const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/v1/user/${type}`, {
                username: username,
                password: password,
            });
            console.log(response);
            const jwt = response.data.token;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            toast.success(`Successfully ${type === 'signup' ? 'signed up' : 'signed in'}! Redirecting...`, { id: loadingToastId });
            navigate("/blogs");
        } catch (e) {
            toast.dismiss(loadingToastId);
            console.error("Authentication error:", e);
            const errorMessage = e.response?.data?.message || 
                               (type === 'signup' ? 
                                "Signup failed. Ensure username is unique and password meets criteria."
                                : "Signin failed. Please check your username and password.");
            toast.error(errorMessage);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
                <HeaderS type={type} />
                <div className="mt-6">
                    <LabelledInput
                        label="Username"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <LabelledInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={sendRequest}
                        type="button"
                        className="mt-6 w-full text-center text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5"
                    >
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
};

function LabelledInput({ label, placeholder, onChange, type = "text", onKeyDown }) {
    return (
        <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <input
                onChange={onChange}
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-black focus:border-black block w-full p-2.5"
                placeholder={placeholder}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}