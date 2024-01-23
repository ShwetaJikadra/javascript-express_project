const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  items:[{
    cartItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('order', orderSchema);