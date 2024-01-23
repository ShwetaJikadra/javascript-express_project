
const express=require('express');
const cartRoutes=express.Router();
const mongoose=require('mongoose');
const {addNewCart,getCart,getAllCart,updateCart, deleteCart,deleteAllCart}=require('../../controller/user/cart.controller');
const { verifyToken } = require('../../helper/verifyToken');
const {verifyUser}=require('../../helper/verifyUser');
cartRoutes.post('/add-cart',verifyUser,verifyToken,addNewCart);
cartRoutes.get('/get-all-carts',verifyUser,verifyToken,getAllCart);
cartRoutes.get('/get-cart/:id',verifyUser,verifyToken,getCart);
cartRoutes.put('/update-cart/:id',verifyUser,verifyUser,verifyToken,updateCart);
cartRoutes.delete('/del-cart/:id',verifyUser,verifyToken,deleteCart);
cartRoutes.delete('/del-all',verifyUser,verifyToken,deleteAllCart);



module.exports=cartRoutes;