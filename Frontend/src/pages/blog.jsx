import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogPage } from "../components/blogPage";

    export const Blog = () => {
        const { id } = useParams();
        const { loading, blog } = useBlog({
            id: id || ""
        });
        if (loading) {
            return (
                <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                    <p className="mt-4 text-white text-xl font-semibold">Loading Post...</p>
                </div>
            );
        }
        if (!blog) {
            return (
                <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-700 via-gray-800 to-black">
                    <p className="text-white text-2xl font-semibold">Post not found or failed to load.</p>
                </div>
            );
        }
        return <div>
            <BlogPage blog={blog} />
        </div>
    }
