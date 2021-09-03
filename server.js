console.clear();
const express=require("express");
const x = require("dotenv").config();

//instance express 
const app=express();

//connection to DB
const connectDb = require("./config/connectDB");
connectDb();


//Routes
app.use(express.json());

//user routes
app.use("/user", require("./User/routes/User"));
app.use("/product", require("./Product/routes/Product"));


const PORT = process.env.PORT;
app.listen(PORT,(err)=>{
err? console.log(err) : console.log(`Server is running on Port ${PORT}`)});