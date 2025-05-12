import { AppBar } from "../components/appBar";
import { useBlogs } from "../hooks";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-lg font-semibold text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* AppBar */}
            <AppBar />

            {/* Blog List */}
            <div className="flex justify-center pt-10">
                <div className="max-w-6xl w-full px-6">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
                        JOURNALS
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link
                                to={`/blog/${blog._id}`} // Navigate to the blog detail page
                                key={blog._id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h2 className="text-xl font-bold text-gray-800 break-words">
                                    {blog.title}
                                </h2>
                                <p className="text-sm text-gray-500 mt-2">
                                    {blog.publishedDate}
                                </p>
                                <div className="text-gray-700 mt-4 text-sm break-words">
                                    {parse(blog.content.substring(0, 100))}...
                                </div>
                                <div className="mt-4">
                                    <span className="text-blue-600 font-medium">
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