const express=require('express');
const orderRoutes=express.Router();
const {addToOrder,updateShippingAddress,deleteOrder}=require('../../controller/user/order.controller');
const {verifyToken}=require('../../helper/verifyToken')
const {verifyUser}=require('../../helper/verifyUser')

orderRoutes.post('/place-order',verifyUser,verifyToken,addToOrder);
orderRoutes.put('/update-address',verifyUser,verifyToken,updateShippingAddress);
orderRoutes.delete('/del-order',verifyUser,verifyToken,deleteOrder)



module.exports=orderRoutes;