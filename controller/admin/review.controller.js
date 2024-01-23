const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const ReviewServices = require("../../services/reviewServices");
const reviewServices = new ReviewServices();

exports.getReview = async (req, res) => {
  try {
    const review = await reviewServices.getReview({
      _id: req.params.id,
      isDelete: false,
    });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllReview = async (req, res) => {
  try {
    const reviews = await reviewServices.getAllReviews({ isDelete: false });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
