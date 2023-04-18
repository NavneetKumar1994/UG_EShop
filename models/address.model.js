const mongoose= require('mongoose');

const addressSchema= new mongoose.Schema({
    zipCode:{
        type: String,
        required: true,
        validate: {
            validator: function(num){
                return (!isNaN(num) && num.length===6)
            },
            message: "Invalid zip code!"
        }
    },
    state:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    landmark:{
        type:String
    },
    city:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true,
        validate: {
            validator: function(num){
                return (!isNaN(num) && num.length===10)
            },
            message:'Invalid contact number!'
        }
    },
    name:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        default: ()=>{
            return Date.now();
        },
        required:true
    },
    updatedAt:{
        type: Date,
        default: ()=>{
            return Date.now();
        },
        required: true
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }
})

module.exports= mongoose.model("Adress",addressSchema)

