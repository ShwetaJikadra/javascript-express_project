// const nodemailer=require('nodemailer');
const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const randomstring=require('randomstring');
const User = require("../model/user/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const sendResetPasswordMail=async (fname,email,resetToken)=>{
    try{
            const transporter=nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                requireTLS:true,
                auth:{
                    user:process.env.GMAIL_USER,
                    pass:"xxxxxx"
                }
            });
            const mailOptions=
             {
            from:process.env.GMAIL_USER,
            to:email,
            subject: 'Password Reset',
            html:'<p>hiii '+fname+' please copy the link <a href="http://localhost:1010/api/user/reset-password?resetToken='+resetToken+'">and reset your password</a></p>"'
            }
            transporter.sendMail(mailOptions,function(error,info){
                if(error)
                {
                    console.log(error)
                }
                else
                {
                    console.log("email has been sent ",info.response)
                }
            })
    }catch(error)
    {
        console.log(error);
        res.json({message:'Internal Server Error'})
    }
}
module.exports={sendResetPasswordMail};