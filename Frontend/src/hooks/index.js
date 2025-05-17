import { useEffect, useState } from "react";
import { REACT_APP_BACKEND_URL } from "../config";
import axios from "axios";

export const useBlog = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios
            .get(`${REACT_APP_BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setBlog(response.data);
                setLoading(false);
            });
    }, [id]);
    getuname();
    return {
        loading,
        blog,
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios
            .get(`${REACT_APP_BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setBlogs(response.data.blogs);
                setLoading(false);
            });
    }, []);
    getuname();
    return {
        loading,
        blogs,
    };
};

const getuname = () => {
    useEffect(() => {
        axios
            .get(`${REACT_APP_BACKEND_URL}/api/v1/blog/uname`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                localStorage.setItem("Username", response.data.uname);
            });
    }, []);
};
