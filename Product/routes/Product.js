const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// test
router.get("/hello",(req,res)=>{
    res.send("hello world !");
});

//@Method Post
//@desc post a user 
//@path : http://localhost:5000/user/register
//@params : body

router.post("/",async(req,res)=>{
    
    try {
        const newProduct =await new Product(req.body);
        const searched = await Product.findOne({_id:req.body._id})
        if (searched){
            return  res.send({message:"product already exist!"});
        }
        const newPro= await newProduct.save();
        res.status(200).send({product:newPro});
    } catch (error) {
        res.status(500).send({message:" Failed to save product ! "})
    }
})

//@Method Get
//@desc get all products
//@path : http://localhost:5000/product
//@params : body

   router.get("/",async(req,res)=>{
       
       try {
        const result = await Product.find();
        res.status(200).send({Products:result, message:"Getting all products !"});

       } catch (error) {
           res.status(400).send({message:"can not getting products !"});
       }
   });

//@Method Get
//@desc products by category
//@path : http://localhost:5000/product/:category
//@params : category

router.get("/:category",async(req,res)=>{
    try {
        const Category= req.params.category
        const result = await Product.find({category:Category});
        res.status(200).send({  Products:result, message:`Getting all ${Category} !`})
        
    } catch (error) {
        res.status(400).send({message:"can not getting products!"});
        console.log(error);
    }
});

//@Method Get
//@desc product by id
//@path : http://localhost:5000/product/:id
//@params : id

router.get("/getone/:_id", async(req,res)=>{
    try {
        const result = await Product.findOne({_id:req.params._id})
        res.status(200).send({Product:result, message:"Product found !"});
    } catch (error) {
        res.status(400).send({message :"can not getting contact !"});
    }
});


//@Method Delete
//@desc : delete a product 
//@path : http://localhost:5000/product/:id
//@params : id

router.delete("/:_id",async(req,res)=>{
     
     try {
         const i = req.params._id
        result =await Product.deleteOne({_id: i});
        console.log(result)
        if (!result.n){
            return res.send({message:"there is no user with this id"});
        }
       
        res.status(200).send({message:"Product deleted !"});
     } catch (error) {
          res.status(400).send({message: "Can not delete this product !"}) ;
     }
});


//@Method Put
//@desc : update a product 
//@path : http://localhost:5000/product/:id
//@params : id
  
  router.put("/:_id",async(req,res)=>{
      try {
          const result = await Product.updateOne({_id:req.params._id},{$set:{...req.body}});
          result.nModified? res.send({message:"success updating!"}):res.send({message:"already updated!"})
      } catch (error) {
          res.status(400).send({ message:"Failed updating!" })
      }
  })







module.exports=router