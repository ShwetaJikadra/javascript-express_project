const express=require('express');
const cartRoutes=express.Router();
const mongoose=require('mongoose');
const {getCart,getAllCart}=require('../../controller/admin/cart.controller');
const { verifyToken } = require('../../helper/verifyToken');
const {verifyAdmin}=require('../../helper/verifyAdmin');

cartRoutes.get('/get-all-carts',verifyAdmin,verifyToken,getAllCart);
cartRoutes.get('/get-cart/:id',verifyAdmin,verifyToken,getCart);

module.exports=cartRoutes;