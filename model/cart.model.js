const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartItem: {
    type: mongoose.Schema.ObjectId,
    ref: "products",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  quantity: {
    type: Number,
    require: true,
    default: 1,
  },
  isDelete:{
    type:Boolean,
    default:false,
  }
});

module.exports=mongoose.model('cart',cartSchema);