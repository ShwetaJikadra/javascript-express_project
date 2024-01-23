const express = require("express");
const adminRoutes = express.Router();
const { verifyAdmin } = require("../../helper/verifyAdmin");

const {
  getUser,
  getAllUser,
  signOut
} = require("../../controller/admin/admin.controller");
const { verifyToken } = require("../../helper/verifyToken");


adminRoutes.get("/get-user/:id", verifyAdmin,verifyToken, getUser);
adminRoutes.get("/all-user", verifyAdmin,verifyToken, getAllUser);
adminRoutes.post('/signout',verifyToken,signOut);

module.exports=adminRoutes;