const express = require("express");
const mongoose = require("mongoose");
const Product = require("../../model/product.model");
const Cart = require("../../model/cart.model");

const User = require("../../model/user/user.model");
const CartServices = require("../../services/cartServices");
const cartServices = new CartServices();
const ProductServices = require("../../services/productServices");
const productServices = new ProductServices();

exports.addNewCart = async (req, res) => {
  const { cartItem, quantity } = req.body;
  let product = await productServices.getProductById(cartItem);
  if (!product) {
    return res.json({ message: "product is not found" });
  }
  const price = Number(item.cartItem.price);
  let cart = await cartServices.getCart({
    cartItem: cartItem,
    user: req.user._id,
    price:price
  });
  if (cart) {
    return res.json({ message: "product is already available in your cart" });
  }

  cart = await cartServices.addNewCart({
    cartItem: cartItem,
    user: req.user._id,
    quantity: quantity,
  });
  cart.save();
  res.json({ message: "cart added success", cart });
};

exports.getCart = async (req, res) => {
  try {
    let id = req.params.cartId;
    let cartItem = await cartServices.getCart({_id:id,user:req.user_id,isDelete:false});
    if (!cartItem) {
      return res.json({ message: "this cart not for this user" });
    }
    

    res.status(500).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error" });
  }
};
exports.updateCart = async (req, res) => {
  try {
    let id = req.params.id;
    // console.log(id);

    const { quantity } = req.body;
    let isCart = await cartServices.getCart({
      _id: id,
      user: req.user._id,
      isDelete: false,
    });
    if (!isCart) {
      console.log(isCart);
      return res.json({ message: "cart is not available for this User" });
    }
    isCart.quantity = quantity;
    isCart.save();
    res.json({ isCart, message: "update cart success" });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Internal server Error" });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    let id = req.params.id;
    let cart = await cartServices.getCart({
      _id: id,
      user: req.user._id,
      isDelete: false,
    });
    console.log(id);
    if (!cart) {
      return res.status(200).json({ message: "user has does not any cart" });
    }
    cart = await Cart.findOneAndUpdate(
      { _id: id },
      {
        $set: { isDelete: true },
      },
      {
        new: true,
      }
    );
    cart.save();
    res.status(400).json({ message: "delete success", cart });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error" });
  }
};

exports.deleteAllCart = async (req, res) => {
  let userId = req.user._id;
  let cart = await cartServices.getCart({ user: userId });
  if (!cart) {
    return res.json("not cart available of this user");
  }
  cart.isDelete = true;
  cart.save();
  res.status(200).json({ message: "All items deleted from the user's cart." });
};

exports.getAllCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id, isDelete: false })
      .populate("cartItem", "title price")
      .exec();

    res.json(cart);
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
