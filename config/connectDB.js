const mongoose=require("mongoose");
 const connectDb=async()=>{
try {
    const connect = await mongoose.connect(process.env.URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log("Connected to database");
} catch (error) {
    console.log(` No connection to database : ${error} `);
};
};
module.exports=connectDb;