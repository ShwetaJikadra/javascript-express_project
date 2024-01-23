
const express=require('express');
const User=require('../model/user/user.model');
const Product=require('../model/product.model');
const Review=require('../model/review.model')
exports.calculateAvgRating =async (req, res)=>
{
    const review= await Review.aggregate([
        {
          $group: {
            _id: '$item',
            averageRating: { $avg: '$rating' },
          },
        },
      ]);
      if (review.length === 0) {
        return res.status(404).json({ message: 'No ratings found.' });
      }

      const updatePromises = review.map(async (reviews) => {
        const productId = reviews._id;
        const averageRating = reviews.averageRating;
  
        // Update the product with the calculated average rating
        await Product.updateOne({ _id: productId }, { $set: { avgRating: averageRating } });
      });
  
      // Wait for all product updates to complete
      await Promise.all(updatePromises);
  
      res.json({ message: 'Average ratings updated successfully.' });
      
      
}

