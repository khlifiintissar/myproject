const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
    name : {
        type : String ,

    },
    lastName : {
        type : String ,
    },
    email : {
        type : String ,
        unique : true ,
        required : true 
    },
    password : {
        type : String ,
        required : true
    },
    address : {
         city : {
        type : String ,
        //required : true ,
        },
         postCode : {
        type : Number ,
       // required : true ,
         },
         street : {
           type : String ,
         },
        },
    phoneNumber : {
        type : String ,
       // required : true ,
    },


});
module.exports = User = mongoose.model ("User",userSchema);