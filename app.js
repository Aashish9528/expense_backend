const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const path=require('path');
require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())
// app.use(express.static(path.join(__dirname,'./client/build')))
//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))
// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname,"./client/build/index.html"))
//   })
app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials","true")
    res.send("api is running");
})
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
