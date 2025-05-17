import { AppBar } from "./appBar";
import { Avatar } from "./blogCard";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

// Placeholder for backend URL, ensure this is configured via environment variables
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || "https://journal-app-backend-phi.vercel.app";

export const BlogPage = ({ blog }) => {
    if (!blog || !blog.author) { // Graceful handling if blog or author is not fully loaded
        // This could redirect or show a specific "not found" or error component
        // For now, rendering a simple message or relying on parent component (Blog.jsx) error handling
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black flex justify-center items-center">
                <p className="text-white text-2xl">Blog post data is incomplete or not found.</p>
            </div>
        );
    }

    const RederedC = parse(blog.content);
    const navigate = useNavigate();

    const handleDelete = async () => {
        // Use toast for confirmation
        toast((t) => (
            <span className="p-2">
                Are you sure you want to delete this post?
                <button 
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => { 
                        toast.dismiss(t.id);
                        proceedWithPageDelete(); 
                    }}
                >
                    Yes, Delete
                </button>
                <button 
                    className="ml-2 px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 text-sm"
                    onClick={() => toast.dismiss(t.id)}
                >
                    Cancel
                </button>
            </span>
        ), { duration: 6000 });
    };

    const proceedWithPageDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authentication token not found. Please sign in.");
            return;
        }

        const loadingToastId = toast.loading('Deleting post...');

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/blog/${blog._id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Failed to parse error response from server."}));
                toast.error(`Failed to delete the post: ${errorData.message}`, { id: loadingToastId });
                return;
            }

            toast.success("Post deleted successfully! Redirecting...", { id: loadingToastId });
            navigate("/blogs");
        } catch (error) {
            toast.dismiss(loadingToastId); // Ensure loading toast is dismissed on generic catch
            console.error("Error deleting post:", error);
            toast.error("An error occurred while deleting the post.");
        }
    };

    // Format the published date
    const formattedDate = blog.publishedDate 
        ? new Date(blog.publishedDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
        : "Date not available";

    return (
        // Use a gradient background for the entire page
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-200 to-stone-300">
            <AppBar /> {/* AppBar already styled with its own background */}

            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-12 gap-x-8 gap-y-10">
                    {/* Main Content Area */}
                    <article className="col-span-12 lg:col-span-8 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8 border border-gray-200/50">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 mb-4 leading-tight">
                            {blog.title}
                        </h1>
                        <p className="text-sm text-gray-500 mb-6">
                            Published on {formattedDate}
                        </p>
                        {/* Prose classes for better typography for HTML content */}
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {RederedC}
                        </div>
                        {/* Delete Button - Only show if user is author (assuming author check happens on backend) */}
                        <div className="mt-8 pt-6 border-t border-gray-200/80 flex justify-end">
                            <button
                                onClick={handleDelete}
                                className="text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 font-semibold rounded-lg text-sm px-6 py-2.5 transition-all duration-150 ease-in-out transform hover:scale-105"
                            >
                                Delete Post
                            </button>
                        </div>
                    </article>

                    {/* Sidebar for Author Info */}
                    <aside className="col-span-12 lg:col-span-4">
                        <div className="sticky top-28">
                            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-6 border border-gray-200/50">
                                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-5">
                                    About the Author
                                </h3>
                                <div className="flex items-center mb-4">
                                    <Avatar name={blog.author.Username || "A"} size="lg" /> {/* Use larger avatar */}
                                    <div className="ml-4">
                                        <p className="text-lg font-bold text-gray-800">
                                            {blog.author.Username || "Anonymous"}
                                        </p>
                                        {/* You can add more author details here if available, e.g., a short bio */}
                                        {/* <p className="text-xs text-gray-500">Bio: Not available</p> */}
                                    </div>
                                </div>
                                {/* Add more author details or related posts here if desired */}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};