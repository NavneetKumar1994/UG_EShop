const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  
  category: {
    type: String,
    default: ""
  },
  direction: {
    type: String,
    enum: ['ASC', 'DESC'],
    default: 'DESC'
  },
  name: {
    type: String,
    default: ""
  },
  sortBy: {
    type: String,
    default: "productId"
  },
  price:{
      type: Number,
      required:true
  },
  description:{
      type: String,
      required:true
  },
  manufacturer:{
      type: String,
      required: true
  },
  availableItems:{
      type: Number,
      required: true
  },
  imageUrl:{
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
    required: [true, 'Image URL is required']
  },
  createdAt:{
      type: Date,
      required:true,
      immutable:true,
      default: ()=>{
          return Date.now();
      }
  },
  updatedAt:{
    type: Date,
    required:true,
    default: ()=>{
        return Date.now();
    }
}


});

module.exports = mongoose.model('Product', productSchema);