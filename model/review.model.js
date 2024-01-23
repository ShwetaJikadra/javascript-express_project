const mongoose = require('mongoose');
const {calculateAvgRating}=require('../helper/avarageRating');

const reviewSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'products',
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
   
});






module.exports = mongoose.model('review', reviewSchema);