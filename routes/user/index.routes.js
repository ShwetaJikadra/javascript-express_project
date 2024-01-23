
const express=require('express'); 
const user = express.Router();
const {verifyToken}=require('../../helper/verifyToken');
const {verifyUser}=require('../../helper/verifyUser');



const userRoutes=require('../../routes/user/user.routes');
const productRoutes=require('../../routes/user/product.routes');
const cartRoutes=require('../../routes/user/cart.routes');
const reviewRoutes=require('../../routes/user/review.routes');
const orderRoutes=require('../../routes/user/order.routes');
const favouriteRoutes=require('../../routes/user/favourite.routes');


user.use('/user',userRoutes);
user.use('/product',productRoutes);
user.use('/cart',verifyUser,verifyToken,cartRoutes);
user.use('/review',verifyUser,verifyToken,reviewRoutes);
user.use('/favourite',verifyUser,verifyToken,favouriteRoutes);
user.use('/order',verifyUser,verifyToken,orderRoutes);

module.exports=user;