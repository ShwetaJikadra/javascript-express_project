const mongoose=require('mongoose');
const favouriteSchema=new mongoose.Schema({
    user:{
       type:mongoose.Schema.ObjectId,
       ref:'users'
    },
    item:{
        type:mongoose.Schema.ObjectId,
        ref:'products'
    },
    isDelete:{
     type:Boolean,
     default:false
    }
});
module.exports = mongoose.model('favourite', favouriteSchema);