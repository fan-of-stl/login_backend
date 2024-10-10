// configure env file
const dotenv = require('dotenv')
dotenv.config()

// importing modules
const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const userRoute = require('./routes/user.route')
const cors = require('cors')


const server = express()

server.use(cors())
server.use(bodyParser.json())

connectDB()

server.use('/api', userRoute)

server.use('/', (req, res)=>{
    res.send(`Hello I'm working!`)
})


const PORT = process.env.PORT

server.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})

