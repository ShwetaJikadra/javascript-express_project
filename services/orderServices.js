const Order=require('../model/order.model');
module.exports=class OrderServices{
    addNewOrder=async (body)=>{
        return await Order.create(body);
    }
    getOrder=async (body)=>{
        return await Order.find(body);
    }
    getOrderById=async (id)=>{
        return  await Order.findById(id);
    }
    updateOrder=async (id,body)=>{
        return await Order.findByIdAndUpdate(id,{$set:body},{new:true});
    }

}