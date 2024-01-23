const express = require("express");
const productRoutes = express.Router();
const { verifyAdmin } = require("../../helper/verifyAdmin");
const {upload2,handleProductImageUpload} =require('../../helper/productImageUpload')
const {
    addNewProduct,
    deleteProduct,
    updateProduct,
    
  } = require("../../controller/admin/product.controller");
  productRoutes.post(
    "/add-new-product",
    verifyAdmin,
    upload2.single('image'), 
    handleProductImageUpload,
    addNewProduct
);

  productRoutes.delete("/delete-product/:id",verifyAdmin, deleteProduct);
  productRoutes.put("/update-product/:id",verifyAdmin, upload2.single('image'), 
  handleProductImageUpload, updateProduct);
  
  module.exports = productRoutes;