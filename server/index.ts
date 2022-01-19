import dotenv from 'dotenv'
dotenv.config()

import express, { Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import router from './routes/index'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

// middelware
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

const http = createServer(app)
export const io = new Server(http)
import { SocketSever } from './config/socket'

io.on("connection", (socket: Socket) => SocketSever(socket))


app.use('/api', router.authRouter)
app.use('/api', router.userRouter)
app.use('/api', router.blogRouter)
app.use('/api', router.likeRouter)
app.use('/api', router.commentRouter)
app.use('/api', router.tagsRouter)
app.use('/api', router.freeRouter)
app.use('/api', router.adminRouter)

// Router
// app.get('/', (req, res) => {
//     res.json({msg: 'helo vip'})
// })

//database

import './config/database'



//sever
const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
    console.log(`sever connect ${PORT}`)
})