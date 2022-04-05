const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path : ".env"})
global.__basedir = __dirname;
const PORT = process.env.PORT || 8080
const connectDB = require("./config/dbConnection");
connectDB();
app.use(express.json());
app.use("" , require("./routes/adminRoutes"))
app.use(express.urlencoded({ extended: true }));
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(err + "\n");
});
app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})