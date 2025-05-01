import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './libs/db.js'
import cookieParser from 'cookie-parser'
import { app, server} from './libs/socket.js'
import path from 'path'

dotenv.config()

//app.use(cors())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

const PORT = process.env.PORT || 5002;
const __dirname = path.resolve()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    });
}

server.listen(5002, () => {
    console.log('Server is running on port:', PORT)
    connectDB()
})