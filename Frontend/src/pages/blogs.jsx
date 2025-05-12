import { AppBar } from "../components/appBar";
import { useBlogs } from "../hooks";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-lg font-medium text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* AppBar */}
            <AppBar />

            {/* Blog List */}
            <div className="flex justify-center pt-6">
                <div className="max-w-5xl w-full px-4">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Journals
                    </h1>
                    <div className="space-y-4">
                        {blogs.map((blog) => (
                            <Link
                                to={`/blog/${blog._id}`} // Navigate to the blog detail page
                                key={blog._id}
                                className="block bg-white shadow-sm rounded-md p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200"
                            >
                                <h2 className="text-lg font-semibold text-gray-800 truncate">
                                    {blog.title}
                                </h2>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(blog.publishedDate).toLocaleDateString()}
                                </p>
                                <div className="text-gray-700 mt-2 text-sm line-clamp-2">
                                    {parse(blog.content.substring(0, 150))}...
                                </div>
                                <div className="mt-3 text-sm text-gray-500">
                                    <span className="font-medium text-gray-600">
                                        {blog.author.Username || "Anonymous"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};