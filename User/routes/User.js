const express = require("express");
const router = express.Router();
const {registerRules,loginRules,validation} = require("../middlwares/validator");
const isAuth = require("../middlwares/passport");
const { registerUser, loginUser, currentUser, deleteUser, updateUser } = require("../controllers/User");



//test
router.get("/",(req,res)=>{
    res.send("Hello World");
});

//@Method Post
//@desc post a user 
//@path : http://localhost:5000/user/register
//@params : body


router.post("/register", registerRules(), validation, registerUser);


//@Method Post
//@desc post a registred user 
//@path : http://localhost:5000/user/login
//@params : body

router.post("/login", loginRules(), validation,loginUser);

//@Method Get
//@desc get the current a user 
//@path : http://localhost:5000/user/current
//@params : header authorization

router.get("/current",isAuth(),currentUser);



//@Method : Delete
//@desc : delete a user 
//@path : http://localhost:5000/user/delete/:id
//@params : id

router.delete("/delete/:_id",deleteUser);


//@Method : Put
//@desc : update a user 
//@path : http://localhost:5000/user/update/:id
//@params : id , body

router.put("/update/:_id",updateUser);


module.exports=router;