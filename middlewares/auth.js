const jwt= require('jsonwebtoken');
const secretKey= require('../configs/token.config');
const User= require('../models/user.model');


verifyToken= (req,res,next)=>{
    let token= req.headers['x-auth-token'];

    if(!token){
        res.status(400).send({
            message: "Please login first to access this endpoint!"
        })
    }
    jwt.verify(token,secretKey.secretKey,(err,decoded)=>{
        if(err){
            return res.status(401).send("Unauthorized")
        }
        req.email= decoded.email;
        next();
    })

}

isAdminCheck= async (req,res,next)=>{
    const user= await User.findOne({email:req.email});
    if(user && user.isAdmin){
        next();
    }else{
        res.status(200).send("You are not authorised to access this endpoint!")
    }
}


const authCheck= {
    verifyToken:verifyToken,
    isAdminCheck:isAdminCheck
}

module.exports= authCheck;
