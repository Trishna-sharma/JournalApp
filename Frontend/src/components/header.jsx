import { Link } from "react-router-dom";

export const HeaderS = ({ type }) => {
    return (
        <div className="px-6 md:px-10 py-4 text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-3">
                {type === "signup" ? "Create an Account" : "Log in or Use Demo Account"}
            </div>
            <div className="text-gray-600 text-sm md:text-base">
                {type === "signup"
                    ? "Already have an Account?"
                    : "Don't Have an Account yet?"}
                <Link
                    className="pl-2 underline text-pink-500 hover:text-pink-600 font-semibold transition-colors duration-150"
                    to={type === "signup" ? "/signin" : "/signup"}
                >
                    {type === "signup" ? "Sign in" : "Sign up"}
                </Link>
            </div>
        </div>
    );
};