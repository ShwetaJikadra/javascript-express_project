const express = require("express");
const productRoutes = express.Router();

const { verifyToken } = require("../../helper/verifyToken");

const {getByCategory,getProduct,getAllProduct,getPopularProduct,searchProduct}=require("../../controller/user/product.controller")
productRoutes.get("/get-product/:id", getProduct);
productRoutes.get("/get-all-product", getAllProduct);
productRoutes.get('/category',getByCategory);
productRoutes.get('/popular-product',getPopularProduct);
productRoutes.get('/search',searchProduct);
module.exports=productRoutes;

