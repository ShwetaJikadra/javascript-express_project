const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../model/user/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const AdminServices = require("../../services/userServices");
const adminServices = new AdminServices();

exports.getUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await adminServices.getUserById(id);
    if (!user) {
      return res.json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    let product = await User.find({ isDelete: false });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.signOut = async (req, res) => {
  try {
    
    const token = jwt.sign({ userId: req.user._id }, process.env.SECRET_KEY, { expiresIn: '5s' });
    
    console.log('User signed out');
    return res.status(200).json({ message: 'User signed out successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

