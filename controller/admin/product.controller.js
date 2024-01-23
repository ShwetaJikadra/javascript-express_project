const mongoose = require("mongoose");
const express = require("express");


const bcrypt = require("bcrypt");



const app = express();

const ProductServices = require("../../services/productServices");
const productModel = require("../../model/product.model");
const productServices = new ProductServices();

exports.addNewProduct = async (req, res) => {
  try {
    const { title, desc, price, category, image } = req.body;

   
    let existingProduct = await productServices.getProduct({
      title: title,
      isDelete: false,
    });

    if (existingProduct) {
      return res.json("Product is already available");
    }

   console.log(existingProduct)
    let product = await productModel.create({
      title: title,
      desc: desc,
      price: price,
      category: category,
    });

   
    if (req.file) {
      product.image = req.file.path;
    }

    
    product.save();

    
    res.json({ product, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await productServices.getProductById(id);
    if (!product) {
      return res.json({ message: "product not found" });
    }

    product = await productServices.updateProduct(
      product._id,
      { isDelete: true },
      { new: true }
    );
    product.save();
    res.json({ message: "product is deleted", product });
  } catch (error) {
    console.log("Internal server Error");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await productServices.getProduct({
      _id: id,
      isDelete: false,
    });
    if (!product) {
      return res.json({ message: "product not found" });
    }

    product = await productServices.updateProduct(
      id,
      { ...req.body },
   
    );
        
    if (req.file) {
      product.image = req.file.path;
    }

    console.log(product);
    res.json({ message: "product is updated", product });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server Error" });
  }
};

exports.getByCategory = async = async (req, res) => {
  try {
    let category = req.query.category;
    let products = await productServices.getProduct({
      category: category,
      isDelete: false,
    });

    if (products.length === 0) {
      return res.json({ message: "no product found in this category" });
    }

    res.json({ message: "Found results", products: products });
  } catch (error) {
    console.log("Internal server Error");
  }
};
