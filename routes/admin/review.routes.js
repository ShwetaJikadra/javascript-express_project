        const express=require('express');

        const reviewRoutes=express.Router();

        const {getReview,getAllReview}=require('../../controller/admin/review.controller');
        const { verifyAdmin } = require('../../helper/verifyAdmin');

        reviewRoutes.get('/get-review/:id',verifyAdmin,getReview);
        reviewRoutes.get('/get-all-review',verifyAdmin,getAllReview);
        module.exports=reviewRoutes;