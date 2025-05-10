const UserRouter = require("./routes/user.js")
const express = require("express")
const mongo = require("mongoose");
const PostRouter = require("./routes/post.js");
const cors = require("cors")
const app = express();
app.use(cors())
const port = 8000;
const corsOptions = {
    origin: ["http://localhost:5173", "https://journal-app-frontend.vercel.app"], // Add your frontend URLs here
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
};
app.use(express.json(),cors(corsOptions))

app.listen(port, () => {
    console.log(`Server live at http://localhost:${port}`)
})

app.use('/api/v1/user', UserRouter)
app.use('/api/v1/blog', PostRouter)
