const { JWT_SECRET } = require("../config.js")
const jwt = require("jsonwebtoken")
const express = require("express")
const { User } = require("../db")
const mongo = require("mongoose")

const UserRouter = express.Router();

UserRouter.post('/signup', async (req, res) => {
    const existingUser = await User.findOne({
        Username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Username already taken/Incorrect inputs"
        })
    }
    try {
        const user = await User.create({
            Username: req.body.username,
            password: req.body.password,
        });
        const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET);
        return res.json({ token });
    } catch (e) {
        res.status(403).json({ e });
    }
});
UserRouter.post('/signin', async (req, res) => {
    const user = await User.findOne({
        Username: req.body.username,
        password: req.body.password
    })
    console.log("d" + user)
    if (user) {
        const token = jwt.sign({
            userId: user._id.toString()
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })

});
module.exports = UserRouter
