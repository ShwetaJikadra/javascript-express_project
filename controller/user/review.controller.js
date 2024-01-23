const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const Review = require("../../model/review.model");
const Product = require("../../model/product.model");

// const {calculateAvgRating}=require('../../helper/avarageRating');
const ReviewServices = require("../../services/reviewServices");
const reviewServices = new ReviewServices();
const ProductServices = require("../../services/productServices");
const productServices = new ProductServices();

exports.addNewReview = async (req, res) => {
  try {
    const review1 = await Review.aggregate([
      {
        $group: {
          _id: "$item",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (review1.length === 0) {
      return res.status(404).json({ message: "No ratings found." });
    }

    const updatePromises = review1.map(async (reviews) => {
      const productId = reviews._id;
      const averageRating = reviews.averageRating;

      await Product.updateOne(
        { _id: productId },
        { $set: { avgRating: averageRating } }
      );
    });

    await Promise.all(updatePromises);

    //   res.json({ message: 'Average ratings updated successfully.' });

    const { item, review, rating } = req.body;
    let p = await productServices.getProduct({ item, isDelete: false });
    if (!p) {
      return res.json({ message: "product is not available" });
    }
    p = await reviewServices.getReview({
      item: item,
      user: req.user._id,
      isDelete: false,
    });
    if (p) {
      return res.json({
        message: "you have already give review for this item",
      });
    }

    const newReview = await reviewServices.addNewReview({
      user: req.user._id,
      item: item,
      review: review,
      rating: rating,
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal Server Error" });
  }
};
exports.otherReview = async (req, res) => {
  try {
    const reviews = await reviewServices.getReview({ isDelete: false });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.myReview = async (req, res) => {
  try {
    const review = await reviewServices.getReview({
      user: req.user._id,
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

exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const { review, rating } = req.body;
    let reviews = await reviewServices.getReview({
      user: req.user._id,
      isDelete: false,
    });
    if (!reviews) {
      return res.json({ message: "user has not any review yet" });
    }
    const updatedReview = await reviewServices.updateReview(
      id,
      { review: review, rating: rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;

    let reviews = await reviewServices.getReview({
      user: req.user._id,
      isDelete: false,
    });
    if (!reviews) {
      return res.json({ message: "user has not any review yet" });
    }
    const deletedReview = await reviewServices.updateReview(
      id,
      { isDelete: true },
      { new: true }
    );
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
