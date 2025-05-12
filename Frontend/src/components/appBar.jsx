import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./blogCard";
import { useState } from "react";

export const AppBar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSignout = () => {
        localStorage.removeItem("token"); // Clear the token
        localStorage.removeItem("Username"); // Clear the username if stored
        navigate("/signin"); // Redirect to the signin page
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="py-2 border-b bg-white flex justify-center items-center shadow-sm">
            <div className="flex justify-between items-center w-full max-w-4xl px-4">
                {/* App Title */}
                <Link to={'/blogs'}>
                    <div className="font-bold text-2xl text-gray-800 hover:text-black transition font-serif">
                        Journal App
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center space-x-4 relative">
                    {/* Publish Button */}
                    <Link to={'/publish'}>
                        <button
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium rounded-md text-sm px-4 py-2 transition"
                        >
                            Publish
                        </button>
                    </Link>

                    {/* Clickable Avatar for Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="focus:outline-none"
                            title="User Menu"
                        >
                            <Avatar
                                className="uppercase cursor-pointer"
                                name={localStorage.getItem("Username") || "User"}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                <ul className="py-1">
                                    <li>
                                        <button
                                            onClick={handleSignout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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