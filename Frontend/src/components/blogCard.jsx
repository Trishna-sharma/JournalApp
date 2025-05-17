import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || "https://journal-app-backend-phi.vercel.app";

export const Blogcard = ({ id, authorName, title, content, publishedDate, onDeleteSuccess }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // We'll use a toast to ask for confirmation, then the actual delete
        // For a simple replacement, we can show a loading toast immediately
        // and then success/error. A two-step confirmation toast is more complex.

        // To emulate confirm, we can do this:
        toast((t) => (
            <span className="p-2">
                Are you sure you want to delete this post?
                <button 
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    onClick={() => { 
                        toast.dismiss(t.id);
                        proceedWithDelete(); 
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
        ), { duration: 6000 }); // Give user time to respond

    };

    const proceedWithDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authentication token not found. Please sign in.");
            return;
        }

        const loadingToastId = toast.loading('Deleting post...');

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/blog/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Failed to parse error response." }));
                const errorMessage = errorData.message || "Failed to delete the post.";
                toast.error(errorMessage, { id: loadingToastId });
                return;
            }

            toast.success("Post deleted successfully!", { id: loadingToastId });
            if (onDeleteSuccess) onDeleteSuccess(id);
        } catch (error) {
            toast.dismiss(loadingToastId); // Ensure loading toast is dismissed on generic catch
            console.error("Error deleting post:", error);
            toast.error("An error occurred while deleting the post.");
        }
    };


    function getSnippet(htmlContent, length = 150) {
        const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
        if (plainText.length <= length) return plainText;
        return plainText.slice(0, length) + "...";
    }

    return (
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-200/50 group">
            <Link to={`/blog/${id}`} className="block">
                <div className="flex items-center mb-4">
                    <Avatar name={authorName || "A"} size="md" />
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-purple-700 group-hover:text-pink-600 transition-colors">
                            {authorName || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500">
                            {publishedDate || "Date not available"}
                        </p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                    {title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {getSnippet(content)}
                </p>
                <div className="text-xs text-pink-500 font-medium mb-3">
                    {`${Math.ceil(content.length / 1000)} min read`}
                </div>
            </Link>
            {/* Position delete button at the bottom right of the card */}
            <div className="flex justify-end pt-2">
                 <button
                    onClick={handleDelete}
                    className="text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-xs px-4 py-2 transition-all duration-150 ease-in-out transform hover:scale-105"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export function Circle() { 
    return <div className="bg-slate-400 w-1 h-1 rounded-full"></div>;
}


export function Avatar({ name, size = "sm" }) { 
    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-md"
    };
    return (
        <div className={`relative inline-flex items-center justify-center 
                        ${sizeClasses[size]} overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-sm`}>
            <span className="font-semibold text-white uppercase">
                {(name && name.length > 0) ? name[0] : '?'}
            </span>
        </div>
    );
}

