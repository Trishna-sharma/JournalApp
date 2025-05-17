import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { REACT_APP_BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export function Editortiny() {
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleTitleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Prevent default form submission if this input were part of a <form>
            event.preventDefault(); 
            handleSave();
        }
    };

    async function sendRequest(content) {
        if (!title.trim()) {
            toast.error("Please enter a title.");
            return;
        }
        if (!content || content.trim() === "<p></p>" || content.trim() === "") {
            toast.error("Content cannot be empty.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authentication token not found. Please sign in.");
            return;
        }

        const loadingToastId = toast.loading('Publishing your journal...');

        try {
            const backendUrl = REACT_APP_BACKEND_URL || "https://journal-app-backend-phi.vercel.app";
            const response = await axios.post(
                `${backendUrl}/api/v1/blog/post`,
                {
                    title: title,
                    content: content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Journal published successfully!', { id: loadingToastId });
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            toast.dismiss(loadingToastId);
            console.error("Error submitting data:", e);
            toast.error("Failed to publish post. " + (e.response?.data?.message || e.message));
        }
    }

    const handleSave = async () => {
        if (editorRef.current) {
            const content = await editorRef.current.getContent();
            sendRequest(content);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl p-6 md:p-8 border border-gray-200/50">
            <div className="mb-6">
                <label htmlFor="journalTitle" className="block mb-2 text-lg font-semibold text-gray-700">Journal Title</label>
                <input
                    id="journalTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleTitleKeyDown}
                    className="bg-gray-100/80 border border-gray-300/70 text-gray-900 text-lg rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 block w-full p-3.5 placeholder-gray-400 transition-all duration-150 ease-in-out focus:shadow-md"
                    placeholder="Enter a captivating title..."
                />
            </div>

            <div className="mb-6 border border-gray-300/70 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500">
                <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY || "4wkzc5j0925bq785jtnw5cqap16vwb7k95ze23j6afolazt7"}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>Start crafting your journal entry here...</p>"
                    init={{
                        height: 550,
                        menubar: true,
                        plugins: [
                            "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                            "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table",
                            "help", "wordcount"
                        ],
                        toolbar:
                            "undo redo | formatselect | bold italic underline forecolor backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | link image media | removeformat | preview | code | help",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height: 1.6; } \
                             p { margin-bottom: 10px; }",
                        skin: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : "oxide"),
                        content_css: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default")
                    }}
                />
            </div>

            <div className="flex justify-end mt-8">
                <button
                    onClick={handleSave}
                    type="button"
                    className="text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 font-semibold rounded-lg text-md px-8 py-3 transition-all duration-150 ease-in-out transform hover:scale-105"
                >
                    Publish Journal
                </button>
            </div>
        </div>
    );
}