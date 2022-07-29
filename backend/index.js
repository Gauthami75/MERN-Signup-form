const express = require('express')
const routerurl = require('./router/router')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')

//const loginRouterUrl = require('./router/loginrouter')

dotenv.config()
//connect to mongoDb
mongoose.connect(process.env.DATABASE_ACCESS, ()=>console.log('Database connected'))
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: true, 
    saveUninitialized: true, 
    cookie: { secure: true }}));
app.use('/app',routerurl)
//Connect to server
app.listen(4000,()=>{console.log('Server is up and running')})