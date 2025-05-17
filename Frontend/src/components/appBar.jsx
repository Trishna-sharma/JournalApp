import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./blogCard";
import { useState } from "react";

export const AppBar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Assuming username is stored in localStorage on signin/signup for display
    const username = localStorage.getItem("Username") || "User";

    const handleSignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        navigate("/signin");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="py-3 px-4 md:px-10 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg sticky top-0 z-50">
            <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
                <Link to={'/blogs'}>
                    <div className="font-bold text-3xl text-white hover:text-gray-200 transition duration-150 ease-in-out tracking-tight font-serif">
                        Pen Cil
                    </div>
                </Link>

                <div className="flex items-center space-x-4 md:space-x-6 relative">
                    <Link to={'/publish'}>
                        <button
                            type="button"
                            className="text-purple-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold rounded-lg text-sm px-5 py-2.5 transition duration-150 ease-in-out transform hover:scale-105"
                        >
                            New Post
                        </button>
                    </Link>

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="focus:outline-none flex items-center space-x-2 p-1 rounded-full hover:bg-white/20 transition duration-150"
                            title="User Menu"
                        >
                            <Avatar
                                name={username} 
                                
                                size="md"
                            />
                             <span className="text-white font-medium hidden md:block">{username}</span>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 border border-gray-200/50 overflow-hidden">
                                <ul className="py-1">
                                    <li>
                                        <button
                                            onClick={handleSignout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-500 hover:text-white font-medium transition duration-150 ease-in-out"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};