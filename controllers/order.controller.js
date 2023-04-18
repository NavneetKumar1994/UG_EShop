const Product= require('../models/product.model');
const Address= require('../models/address.model');
const Order = require('../models/order.model');
const User= require('../models/user.model');


exports.createOrder= async (req,res)=>{

    const orderObj= {
        quantity:req.body.quantity,
        productId:req.body.productId,
        addressId: req.body.addressId
    }

    try{

        //search product from idRequest;
    const product= await Product.findOne({_id: orderObj.productId})

    if(!product){
        res.status(404).send(`No product found for ID- ${orderObj.productId}`);
    }
    if(product && product.availableItems==0){
        res.status(200).send(`Product with ID- ${orderObj.productId} is currently out of stock`)
    }

    //search address from idRequest;

    const address= await Address.findOne({_id:orderObj.addressId});

    

    if(!address){
        res.status(404).send(`No Address found for ID- ${orderObj.addressId}`);
    }

    //search user with email id
    const user1= await User.findOne({email:req.email});

    orderObj.user= user1._id;


        //create order 

        const order= await Order.create(orderObj);

        res.status(200).send({
            addressId: order.addressId,
            productId: order.productId,
            quantity: order.quantity,
            user1:user1._id
        })

         }catch(err){
    res.status(500).send("Internal server error");
      }







}