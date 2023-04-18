const Address= require('../models/address.model');
const User= require('../models/user.model')


exports.addAddress= async (req,res)=>{

    const addressObj= {
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        street: req.body.street,
        landmark: req.body.landmark,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode
    }

    try{

        const user= await User.findOne({email:req.email});
        
        addressObj.userId= user._id;
        const address= await Address.create(addressObj);

    
        


        res.status(201).send({
            _id: address._id,
            name: address.name,
            contactNumber: address.contactNumber,
            street: address.street,
            landmark: address.landmark,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            user:user
       })

        
    }catch(err){
        if(err){
            console.log(err)
            res.status(400).send({
                message:err.message
            })
        }else{
            res.status(500).send('Internal server error')
        }
    }
}