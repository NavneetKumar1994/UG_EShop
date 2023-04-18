const User= require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const secreKey= require('../configs/token.config');
const  secretConfig = require('../configs/token.config');

exports.signup= async (req,res)=>{

    const userBody= {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        contactNumber:req.body.contactNumber,
        isAdmin: req.body.isAdmin,
        password: bcrypt.hashSync(req.body.password,8)
    }

    try{

        const user= await User.create(userBody);
        res.status(201).send({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email
        })
    }catch(err){
        if(err){
        res.status(400).send({
           message: err.message
        })
    }else{
        res.status(500).send('Internal server error')
    }
    }
}


exports.signin= async (req,res)=>{
    
    const user= await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).send("This email has not been registerd!");
    }
    if(!bcrypt.compareSync(req.body.password,user.password)){
        return res.status(200).send("Invalid credentials!")
    }

    const token= jwt.sign({email:user.email},secretConfig.secretKey,{expiresIn:5000});
    res.status(200).send({
        email: user.email,
        name: user.firstName+' '+user.lastName,
        isAuthenticated:true,
        accessToken:token
    })
}