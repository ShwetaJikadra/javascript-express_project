const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const Product = require("../../model/product.model");
const bcrypt = require("bcrypt");
// const {calculateAverageRating}=require('../../helper/avarageRating');
const OrderServices = require("../../services/orderServices");
const orderServices = new OrderServices();
const ProductServices = require("../../services/productServices");
const productServices = new ProductServices();

exports.getByCategory = async (req, res) => {
  let cat = req.query.category;
  let product = await productServices.getProduct({
    isDelete: false,
    category: cat,
  });
  if (!product) {
    return res.json({ message: "not any product in this category" });
  }
  res.json(product);
};

exports.getProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await productServices.getProductById(id);
    if (!product) {
      return res.json({ message: "product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log("Internal server Error");
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    let product = await Product.find();
    if (!product) {
      return res.json({ message: "no awailable any products" });
    }
    res.json(product);
  } catch (error) {
    console.log("Internal server Error");
  }
};

exports.getPopularProduct = async (req, res) => {
  try {
    const popularProducts = await Product.find({})
      .sort({ avgRating: -1 })
      .limit(10);

    return res.status(200).json({ products: popularProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "please search any query enter" });
    }

    const searchQuery = {
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { desc: { $regex: new RegExp(query, "i") } },
        { category: { $regex: new RegExp(query, "i") } },
      ],
    };

    const searchResults = await productServices.getProduct(searchQuery);

    return res.status(200).json({ products: searchResults });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
