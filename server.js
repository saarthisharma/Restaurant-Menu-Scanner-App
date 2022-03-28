const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path : ".env"})
const PORT = process.env.PORT || 8080
app.get("/" , (req,res)=>{
    res.send("request running")
})
app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})

