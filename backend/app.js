import express from "express";
import agentRouter from './routes/MigrationAgent.js'
import adminRouter from './routes/admin.js'
import path from "path";
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine" ,"ejs")
app.set("views",path.resolve("./views"))
app.use("/user",adminRouter)
app.use("/agent",agentRouter)
export default app;