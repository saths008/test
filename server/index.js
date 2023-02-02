const express = require("express") //basically import express
const app = express() //create an app that allows for the setup of the server
const port = 3000
app.use(express.urlencoded({extended: true})) //allows for access to request body middleware
const cors = require("cors");
app.use(express.json())//req.body
app.use(cors())



//Routes
const authRouter = require('./routes/jwtAuth') 
app.use("/auth", authRouter)
const userRouter = require('./routes/users') 
app.use("", userRouter) //use another router file
app.listen(port)
