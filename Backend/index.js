const UserRouter = require("./routes/user.js")
const express = require("express")
const mongo = require("mongoose");
const PostRouter = require("./routes/post.js");
const cors = require("cors")
const app = express();

const port = process.env.PORT || 8000;

const corsOptions = {
    origin: [
        "https://journal-app-lilac-seven.vercel.app",
        "https://journal-app-frontend.vercel.app",
        "https://journal-app-backend-phi.vercel.app",
        "https://journal-app-backend-phi.vercel.app/api/v1/user/signin",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.options('*', cors(corsOptions)); // Handle preflight for all routes
app.use(cors(corsOptions));
app.use(express.json())

app.listen(port, () => {
    console.log(`Server live at http://localhost:${port}`)
})

app.use('/api/v1/user', UserRouter)
app.use('/api/v1/blog', PostRouter)
