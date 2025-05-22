import express from 'express'
import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'

const app = express()

app.use("/backend/posts",postRoute)
app.use("/backend/auth",authRoute)


app.listen(8800,()=>{
    console.log("server running...")
})

