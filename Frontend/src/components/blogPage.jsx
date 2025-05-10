import { AppBar } from "./appBar";
import { Avatar } from "./blogCard";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

export const BlogPage = ({ blog }) => {
    const RederedC = parse(blog.content);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://journal-app-backend-phi.vercel.app/api/v1/blog/${blog._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token here
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Failed to delete the post: ${errorData.message}`);
                return;
            }
            if (response.ok) {
                alert("Post deleted successfully!");
                navigate("/blogs"); // Redirect to the blog list page
            } else {
                alert("Failed to delete the post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("An error occurred while deleting the post.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* AppBar */}
            <AppBar name={blog.author.Username} />

            {/* Blog Content */}
            <div className="grid grid-cols-12 gap-8 px-6 md:px-10 w-full pt-12 max-w-screen-2xl mx-auto">
                {/* Main Content */}
                <div className="col-span-12 md:col-span-8 bg-white shadow-md rounded-lg p-6">
                    <div className="text-4xl md:text-5xl font-extrabold text-gray-800">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2 text-sm md:text-base">
                        Posted on 2nd Dec 2032
                    </div>
                    <div className="pt-6 text-gray-700 leading-relaxed text-base md:text-lg">
                        {RederedC}
                    </div>
                    <button
                        onClick={handleDelete}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete Post
                    </button>
                </div>

                {/* Sidebar */}
                <div className="col-span-12 md:col-span-4 bg-white shadow-md rounded-lg p-6">
                    <div className="text-slate-600 text-lg font-semibold mb-4">
                        Author
                    </div>
                    <div className="flex items-center">
                        <div className="pr-4">
                            <Avatar name={blog.author.Username || "Anon"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-800">
                                {blog.author.Username || "Anonymous"}
                            </div>
                            <div className="text-sm text-gray-500">
                                {blog.author.bio || "No bio available"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};