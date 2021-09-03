const User = require ("../models/User");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

//register user

exports.registerUser=async(req,res)=>{
    const { name, lastName, email, password } = req.body ;
    try {
    const newUser =await new User ({ name, lastName, email, password });
    //unique email 
    const searchedUser= await User.findOne({email});
    if (searchedUser){
        return res.status(400).send({ message:"user already exist" })
    }
    //required email
    if(!email) {
        return res.status(400).send({ message:"email is required"})
    }
    //hashing password
    const salt = 10 ;
    const gensalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash (password,gensalt);
    newUser.password = hashedPassword
    

    const nouveau = await newUser.save();

     //token creation after saving user
     const payload = {
        _id : nouveau._id,
        name : nouveau.name,
     };
    const Token = await jwt.sign(payload, process.env.SecretOrKey,{
       expiresIn: '7 days'
    });


    res.status(200).send({ user: nouveau, message:"Saved user",token :`Bearer ${Token}`});
    } catch (error) {
        res.status(500).send({ message:"Failed to save user"});
        console.log(error);
    }
}

//login user

exports.loginUser= async(req,res)=>{
    const {email,password} = req.body;
    try {
        const searchedUser=await User.findOne({email});
        //check email 
        if (!searchedUser){
            res.status(400).send({ message:"Bad credential" });
        };
        //compare password
        const match = await bcrypt.compare(password,searchedUser.password);
  
        if (!match){
            res.status(400).send({ message:"Bad credential" });
        };
        //creation token 
        const payload ={
            id : searchedUser.id,
            name : searchedUser.name
        };
        const Token = await jwt.sign(payload, process.env.SecretOrKey, {
          expiresIn:'7 days'
        });
  
  
  
        res.status(200).send({user:searchedUser, message:"User found", token:`Bearer ${Token}`});
        
    } catch (error) {
        res.status(500).send({ message:"Can not get the user ! "});
        console.log(error);
    }
  
  }


// current user

  exports.currentUser=(req,res)=>{
    res.status(200).send({user:req.user});
}

// delete user 
exports.deleteUser=async(req,res)=>{
    
    try {
        const result = await User.deleteOne({_id:req.params._id});
    console.log(result);
    result.n ? res.send({message:"User deleted!"}) : res.send({message:"There is no user with this id!"})
    } catch (error) {
        res.status(400).send({message:"There is no user with this id!"});
    }
}

//update user

exports.updateUser=async(req,res)=>{
    try {
        const result = await User.updateOne({_id:req.params._id},{$set:{...req.body}});
        console.log(result);
        result.nModified ? res.send({message:" User updated !"}) : res.send({message:" User already updated !"});

    } catch (error) {
        res.status(400).send({message:"There is no user with this id !"});
    }
}


