const express = require("express");
const userRoutes = express.Router();
const {upload,handleProfileImageUpload}=require('../../helper/imageUpload');

const { verifyToken } = require("../../helper/verifyToken");
const {verifyUser}=require("../../helper/verifyUser")


const {
  signup,
  login,
  userProfile,
  resetPassword,
  forgetPassword,
  updateUser,
  deleteUser,
  updateProfileImage,
  signOut
} = require("../../controller/user/user.controller");


userRoutes.post("/login", login);
userRoutes.post("/signup",upload.single('profileImage'), handleProfileImageUpload, signup);
userRoutes.get("/user-profile" ,verifyUser,verifyToken, userProfile);
userRoutes.put("/update-user",verifyUser, verifyToken, updateUser);
userRoutes.delete("/del-user",verifyUser,verifyToken, deleteUser);
userRoutes.put("/reset-password",verifyUser, verifyToken, resetPassword);
userRoutes.post('/forget-password',verifyUser,verifyToken,forgetPassword);
userRoutes.put('/change-profile-image',upload.single('profileImage'),verifyUser,verifyToken, handleProfileImageUpload,updateProfileImage)
userRoutes.post('/signout',verifyToken,signOut);








//carts



module.exports = userRoutes;