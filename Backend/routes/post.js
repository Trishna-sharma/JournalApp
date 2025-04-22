const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const { Post, User } = require("../db");

const PostRouter = express.Router();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

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

module.exports = PostRouter;