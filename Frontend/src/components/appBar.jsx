import { Link } from "react-router-dom";
import { Avatar } from "./blogCard";

export const AppBar = () => {
    return (
        <div className="py-2 border-b bg-white flex justify-center items-center shadow-sm">
            <div className="flex justify-between items-center w-full max-w-4xl px-4">
                {/* App Title */}
                <Link to={'/blogs'}>
                    <div className="font-bold text-2xl text-gray-800 hover:text-black transition font-serif">
                        Journal App By Trishna Sharma Mou
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* Publish Button */}
                    <Link to={'/publish'}>
                        <button
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium rounded-md text-sm px-4 py-2 transition"
                        >
                            Publish
                        </button>
                    </Link>

                    {/* User Avatar */}
                    <Avatar
                        className="uppercase"
                        name={localStorage.getItem("Username") || "User"}
                    />
                </div>
            </div>
        </div>
    );
};