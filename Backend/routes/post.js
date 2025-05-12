const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const { Post, User } = require("../db");

const PostRouter = express.Router();

/*
// In your backend routes (e.g., postRoutes.js)
const express = require('express');
const PostRouter = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');

// Apply authentication middleware to ALL journal routes
PostRouter.use(authenticateUser);

// Get all journals for the authenticated user
PostRouter.get('/user/blogs', async (req, res) => {
    try {
        const posts = await Post.find({ author: req.userId }); // Filter by user ID
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch journals" });
    }
});

// Create a new journal (already ensures author = req.userId)
PostRouter.post('/', async (req, res) => {
    try {
        const newPost = new Post({
            ...req.body,
            author: req.userId // Enforce ownership
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: "Failed to create journal" });
    }
});*/
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    // const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        console.log("Authenticated User ID:", req.userId); 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Ensure this matches the JWT payload key
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
/*
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Ensure this matches the JWT payload key
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

*/


// Apply middleware to all routes
PostRouter.use(authMiddleware);

PostRouter.get('/bulk', async (req, res) => {
    const blogs = await Post.find({}).populate('author', 'Username');
    return res.json({ blogs });
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