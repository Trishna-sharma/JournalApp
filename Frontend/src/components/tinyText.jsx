import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { REACT_APP_BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Editortiny() {
    const editorRef = useRef(null);
    const [title, stitle] = useState("");

    let ctemp = "";
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const lk = `${REACT_APP_BACKEND_URL}/api/v1/blog/post`;
            if (ctemp === "") {
                console.log("input empty");
                return;
            }

            const response = await axios.post(
                lk,
                {
                    title: title,
                    content: ctemp,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            console.error("Error submitting data:", e);
        }
    }

    const savedata = async () => {
        if (editorRef.current) {
            ctemp = await editorRef.current.getContent();
            sendRequest();
        } else {
            return null;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Create a New Journal Entry
                </h1>
                <input
                    onChange={(e) => stitle(e.target.value)}
                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-black focus:border-black block w-full p-3"
                    placeholder="Enter a title..."
                />
                <div className="border border-gray-300 rounded-md overflow-hidden mb-6">
                    <Editor
                        apiKey="4wkzc5j0925bq785jtnw5cqap16vwb7k95ze23j6afolazt7"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue="<p>Start writing your journal...</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={savedata}
                        type="button"
                        className="text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-6 py-3"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}