const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
    {
        fname:{
            type:String,
            require:true
        },
        lname:{
            type:String,
            require:true
        },
        gender:{
            type:String,
            eval:['male','female'],
            require:true
        },
        phone:{
            type: Number,
        require:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        },
        password:{
            type:String,
            require:true,
        },
        profileImage:{
            type:String
         },
         role:{
            type:String,
            eval:['admin','user'],
            default:'user'
         },
        isDelete:{
            type:Boolean,
            default:false,
        },
        resetToken: {
            type: String,
            default:""
        },
        resetTokenExpiry: {
            type: Date,
        }
    }
);
module.exports=mongoose.model('user',userSchema);