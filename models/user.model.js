const mongoose= require("mongoose");
const { message } = require("statuses");
const validator= require("validator")


const userSchema= new mongoose.Schema({

    
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("Invalid email-id format!")
            }
        }
    },
    password:{
        type:String,
        required:true
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
    isAdmin:{
        type: Boolean,
        required: true,
        default:false

    },
    userName:{
        type: String
    },
    createdAt:{
        type: Date,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type: Date,
        default: ()=>{
            return Date.now();
        }
    }
})


module.exports= mongoose.model("User",userSchema);