const express=require('express'); 
const admin = express.Router();

const {verifyAdmin}=require('../../helper/verifyAdmin');


const adminRoutes=require('../../routes/admin/admin.routes');
const productRoutes=require('../../routes/admin/product.routes');
const cartRoutes=require('../../routes/admin/cart.routes');
const reviewRoutes=require('../../routes/admin/review.routes');
const orderRoutes=require('../../routes/admin/order.routes');
// const favouriteRoutes=require('../../routes/admin/favourite.routes');


admin.use('/user-data',verifyAdmin,adminRoutes);
admin.use('/product',verifyAdmin,productRoutes);
admin.use('/cart',verifyAdmin,cartRoutes);
admin.use('/review',verifyAdmin,reviewRoutes);
// admin.use('/favourite',verifyAdmin,favouriteRoutes);
admin.use('/order',verifyAdmin,orderRoutes);

module.exports=admin;
