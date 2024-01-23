const express = require("express");
const orderRoutes = express.Router();
const { verifyAdmin } = require("../../helper/verifyAdmin");
const {getAllOrder,getOrder, updateStatus}=require('../../controller/admin/order.controller');
orderRoutes.get('/get-all-order',verifyAdmin,getAllOrder);
orderRoutes.get('/get-order/:id',verifyAdmin,getOrder);
orderRoutes.put('/order-status-update/:id',updateStatus);
module.exports=orderRoutes;