const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const randomstring=require('randomstring');
const User = require("../../model/user/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const res=require('express/lib/response')
const { upload, handleProfileImageUpload }=require('../../helper/imageUpload');
const { sendResetPasswordMail } = require("../../helper/sendResetPasswordMail");

const UserServices=require('../../services/userServices');
const userServices=new UserServices();

exports.signup = async (req, res) => {
  try {
    const { fname, lname, gender, phone, email, password,role,profileImage } = req.body;
    let user = await userServices.getUser({ email: email, isDelete: false });
    if (user) {
      return res.status(400).json({ message: "user does already register" });
    }
    let hashpassword = await bcrypt.hash(password, 10);

    user = await userServices.addNewUser({
      fname: fname,
      lname: lname,
      gender: gender,
      phone: phone,
      email: email,
      password: hashpassword,
      role:role,
      
    });
    if (req.file) {
      user.profileImage = req.file.path;
    }
    user.save();


    

    res.status(501).json({ message: "signup success" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await userServices.getUser({ email: email, isDelete: false });
  if (!user) {
    return res.json({ message: "user is not found" });
  }
  let checkpassword = await bcrypt.compare(password, user.password);
  if (!checkpassword) {
    return res.json({ message: "password does not matched" });
  }

  let payload = {
    userId: user._id,
  };
  let token = jwt.sign(payload, process.env.SECRET_KEY);

  res.status(200).json({ token, message: "login success" });
};
exports.userProfile = async (req, res) => {
  try {
    let user = await userServices.getUser({ _id: req.user._id });
    res.json({ UserProfile: user });
  } catch (error) {
    console.log(error);
    res.json({ message: "internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { cur_pass, new_pass, con_pass } = req.body;
    var checkpass = await bcrypt.compare(cur_pass, req.user.password);
    if (!checkpass) {
      return res.json({ message: "password is incorrect" });
    }
    if (new_pass != con_pass) {
      return res.json({ message: "please confirm password " });
    }
    let hashPassword = await bcrypt.hash(new_pass, 10);
    let user = await userServices.getUserById(req.user._id, {
      $set: { password: hashPassword },
    });

    res.json({ message: "password reset success", new_pass });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json({ user, message: "User is Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await userServices.updateUser(
      req.user._id,
      { $set: { isDelete:true } },
      { new: true }
    );
    res.status(200).json({ user, message: "User is Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

exports.forgetPassword = async (req, res) => 
{
  try
  {
   const {email}=req.body;
   const user=await User.findOne({email:email});
   if(user)
   {
    const randomString=randomstring.generate();
    const data=await userServices.updateUser({email:email},{$set:{resetToken:randomString}})
    sendResetPasswordMail(user.fname,user.email,randomString)
   }
  }
  catch(error)
  {
    console.log(error)
    res.json({message:'internal server error'})
  }
  

}

exports.updateProfileImage = async (req, res) => {
  try {
    
    const userId = req.user._id;

   
    if (!req.file) {
      return res.status(400).json({ message: "No profile image provided" });
    }

    
    const newProfileImage = req.file.filename;

    const user = await userServices.updateUser(
      userId,
      { $set: { profileImage: newProfileImage } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile image updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
exports.signOut = async (req, res) => {
  try {
   
    
    
    const token = jwt.sign({ userId: req.user._id }, process.env.SECRET_KEY, { expiresIn: '5s' });
    
    console.log('User signed out');
    return res.status(200).json({ message: 'User signed out successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};




