const express=require('express');
const reviewRoutes=express.Router();
const {addNewReview,otherReview,myReview,updateReview,deleteReview}=require('../../controller/user/review.controller');
const { verifyToken } = require('../../helper/verifyToken');
const {verifyUser}=require('../../helper/verifyUser');



reviewRoutes.post('/add-review',verifyUser,verifyToken,addNewReview);
reviewRoutes.get('/my-review',verifyUser,verifyToken,myReview);
reviewRoutes.put('/update-review/:id',verifyUser,verifyToken,updateReview);
reviewRoutes.delete('/del-review/:id',verifyUser,verifyToken,deleteReview);
reviewRoutes.get('/other-review',verifyUser,verifyToken,otherReview)
module.exports=reviewRoutes;

