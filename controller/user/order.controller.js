const mongoose = require("mongoose");
const Order = require("../../model/order.model");
const Cart = require("../../model/cart.model");
const CartServices=require('../../services/cartServices');
const cartServices=new CartServices();
const OrderServices=require('../../services/orderServices');
const orderServices=new OrderServices()


exports.addToOrder = async (req, res) => {
    try {
        const {fullname,address,zipcode,country,district,city}=req.body;
      


      let cartItems = await cartServices.getCart({
        user: req.user._id,
        isDelete: false,
      }).populate("cartItem");

      // if(cartItems.item==null)
      // {
      //   return res.json({message:'you have not item in cart'})
      // }

      
      console.log(cartItems);
      let orderItems = cartItems.map((item) => ({
        cartItem: item.cartItem._id,
        quantity: item.quantity,
        price: item.price
       
      }));
      // console.log(price);
      // console.log(orderItems);
      let totalPrice = orderItems.reduce(
        (total, item) => (total +=(item.quantity * item.price)),
        0
      );
      let newOrder = await orderServices.addNewOrder({
        user: req.user._id,
        items: orderItems,
        totalAmount: totalPrice,
        shippingAddress:{
        fullname:fullname,
        address:address,
        zipcode:zipcode,
        country:country,
        district:district,
        city:city,
         
      }

      });
      // newOrder.save();
      await Cart.updateMany({ user: req.user._id }, { isDelete: true });
      res.status(201).json({ order: newOrder, message: "Order placed" });
      res.status(201).json(orderItems);
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: "Internal server error" });
    }
  };

  exports.updateShippingAddress=async (req, res) => {
   
    const { fullname, address, zipcode, country, district, city } = req.body;

    try {
       
        const order = await orderServices.getOrder({user:req.user._id,isDeleted:false});

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

       
        order.shippingAddress = {
            fullname: fullname,
            address: address,
            zipcode: zipcode,
            country: country,
            district: district,
            city: city
        };

       
      //  console.log(order);
      //  order.save();

        res.status(200).json({ order, message: 'Shipping address updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderServices.getOrder({ user: req.user._id, isDeleted: false });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.isDeleted = true;
    await order.save();

    res.json({ message: 'Order delete success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

