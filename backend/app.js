import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
import authRoute from './routes/auth.route.js'
import postRoute from "./routes/post.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"
import messageRoute from "./routes/message.route.js"

const app = express()

// Use CORS middleware
app.use(cors({
    origin: process.env.CLIENT_URL, // Use CLIENT_URL from .env file
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
    credentials:true,
}));
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());


app.use("/backend/auth",authRoute)
app.use("/backend/users",userRoute)
app.use("/backend/posts",postRoute)
app.use("/backend/test",testRoute)
app.use("/backend/chats",chatRoute)
app.use("/backend/messages",messageRoute)


app.listen(8800, ()=>{
    console.log("Server is running...")
})