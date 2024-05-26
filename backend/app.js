import express from "express";
import agentRouter from './routes/MigrationAgent.js'

import adminRouter from './routes/admin.js'
import serviceRouter from './routes/Services.js'
import bookingRouter from './routes/Booking.js'
import userRouter from './routes/auth.js'


import cors from 'cors'       
import path from "path";



const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.set("view engine" ,"ejs")
app.set("views",path.resolve("./views"))
app.use(express.json())
app.use("/user",adminRouter)
app.use("/agent",agentRouter)
app.use("/service",serviceRouter)
app.use("/booking",bookingRouter)
app.use("/user",userRouter)


export default app;