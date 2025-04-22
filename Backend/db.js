//db.js

const mongoose = require('mongoose')
mongoose.connect(
    "mongodb+srv://trishnasharma2002:rGxtFHvFQduTsExp@cluster0.osdr39d.mongodb.net/JournalApp?retryWrites=true&w=majority",
    {
        tls: true,
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
