const mongoose= require('mongoose');


const orderSchema= new mongoose.Schema({
    quantity:{
        type: Number,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    addressId:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})


module.exports= mongoose.model('Order',orderSchema);