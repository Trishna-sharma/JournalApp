const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const { Post, User } = require("../db");


const PostRouter = express.Router();



const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Bearer token missing or malformed' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        console.log("Authenticated User ID:", req.userId); 
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};


// Apply middleware to all routes
PostRouter.use(authMiddleware);

PostRouter.get('/bulk', async (req, res) => {
    // Fetch only blogs where the author matches the authenticated user's ID
    const userId = req.userId; // Get the user ID from the authMiddleware
    if (!userId) {
        // This case should ideally be caught by authMiddleware if a token is required for this route
        // but as a safeguard:
        return res.status(401).json({ message: "User not authenticated" });
    }
    try {
        const blogs = await Post.find({ author: userId }).populate('author', 'Username');
        return res.json({ blogs });
    } catch (error) {
        console.error("Error fetching user's blogs:", error);
        return res.status(500).json({ message: "Failed to retrieve journal entries." });
    }
});

PostRouter.post('/post', async (req, res) => {
    const userId = req.userId;

    const body = req.body;
    const post = await Post.create({
        title: body.title,
        content: body.content,
        author: userId,
    });

    return res.json({
        id: post._id,
    });
});

PostRouter.get('/uname', async (req, res) => {
    const id = req.userId;
    const user = await User.findById(id);
    return res.json({ uname: user.Username });
});

PostRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Post.findById(id).populate('author', 'Username');

    return res.json(blog);
});
PostRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Find the post by ID
        const post = await Post.findById(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        console.log("Post Author ID:", post.author.toString()); // Debugging
        console.log("Authenticated User ID:", req.userId); // Debugging

        // Check if the authenticated user is the author of the post
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        // Delete the post
        await Post.findByIdAndDelete(id);

        return res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while deleting the post" });
    }
})

module.exports = PostRouter;