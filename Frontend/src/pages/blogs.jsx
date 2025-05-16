import { AppBar } from "../components/appBar";
import { Blogcard } from "../components/blogCard";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Blogs = () => {
    const { loading: initialLoading, blogs: fetchedBlogs, setBlogs } = useBlogs();
    const [blogs, setLocalBlogs] = useState([]);
    const [loading, setLoading] = useState(initialLoading);

    useEffect(() => {
        setLocalBlogs(fetchedBlogs);
        setLoading(initialLoading);
    }, [fetchedBlogs, initialLoading]);

    const handlePostDeleted = (deletedPostId) => {
        setLocalBlogs(currentBlogs => currentBlogs.filter(blog => blog._id !== deletedPostId));
    };

    if (loading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                <p className="mt-4 text-white text-xl font-semibold">Loading Journals...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500">
            <AppBar />
            <div className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-5xl font-extrabold text-white text-center mb-10 md:mb-16 shadow-sm">
                    Discover Journals
                </h1>
                {blogs && blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Blogcard
                                key={blog._id}
                                id={blog._id}
                                authorName={blog.author.Username || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={new Date(blog.publishedDate).toLocaleDateString()}
                                onDeleteSuccess={handlePostDeleted}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-2xl text-white/80 font-semibold">No journals found.</p>
                        <Link to="/publish" className="mt-6 inline-block text-purple-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold rounded-lg text-md px-6 py-3 transition duration-150 ease-in-out transform hover:scale-105">
                            Create Your First Journal!
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};