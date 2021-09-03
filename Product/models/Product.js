const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productSchema = new schema({
    
        name : String,
        category : String,
        subcategory : String,
        price : Number,
        colour : String,
        weight : Number,
        size : String,
        image : String,
        description : String,
        ref : Number,
        created_at:{ type: Date },
        updated_at:{ type: Date, default: Date.now },
        updated:{type : Date, default: Date.now},
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default:0
          },
    },
        
       );
module.exports=Product=mongoose.model("Product",productSchema);