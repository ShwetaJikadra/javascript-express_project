const Cart=require('../model/cart.model');
module.exports=class CartServices{
    addNewCart=async (body)=>{
        return await Cart.create(body)
    }
    getCart=async (body)=>{
        return await Cart.find(body)
    }
    getCartById=async (id)=>{
       return await Cart.findById(id)
    }
    getcarts=async (query)=>{
       return await Cart.find(query);
    }
    updateCart=async (id,body)=>{
        return await Cart.findByIdAndUpdate(id,{$set:body},{new:true})
    }
    

}