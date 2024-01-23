const express=require('express');
const mongoose=require('mongoose');
const Product=require('../../model/product.model');
const Cart=require('../../model/cart.model');

const User=require('../../model/user/user.model');
const CartServices=require('../../services/cartServices');
const cartServices=new CartServices();
const ProductServices=require('../../services/productServices');
const productServices=new ProductServices();

exports.getCart = async (req, res) => {
    try {
      let id = req.params.id;
      let cartItem = await cartServices.getCartById(id);
      if (!cartItem) {
        return res.json({ message: "cart not found" });
      }
      res.status(500).json(cartItem);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal server Error" });
    }
  };

  exports.getAllCart=async (req,res)=>{
    try {
      const cart = await Cart.find({isDelete: false })
        .populate("cartItem", "title, price")
        .exec();
  
      res.json(cart);
    } catch (error) {
      console.error("Error fetching user's cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }