const express=require('express');
const { verifyToken } = require('../../helper/verifyToken');
const favouriteRoutes=express.Router();
const {addInFavourite,deleteFromFavourite}=require('../../controller/user/favourite.controller');
const { verifyUser } = require('../../helper/verifyUser');
favouriteRoutes.post('/add-favourite',verifyUser,verifyToken,addInFavourite);
favouriteRoutes.delete('/delete-favourite',verifyUser,verifyToken,deleteFromFavourite)

module.exports=favouriteRoutes;