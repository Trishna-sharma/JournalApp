const mongoose = require('mongoose')
require("dotenv").config({ path: ".env.local" });
mongoose.connect(
    process.env.MONGO_DB ,
    {
        tls: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        w: 'majority'
    }

);

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
})

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const User = mongoose.model("User", userSchema)
const Post = mongoose.model("Post", PostSchema)

module.exports = { User, Post }
