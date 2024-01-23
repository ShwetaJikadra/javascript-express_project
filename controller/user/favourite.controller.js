const express=require('express');
const mongoose=require('mongoose');
const Favourite=require('../../model/favourite.model');
const Product=require('../../model/product.model');
const User=require('../../model/user/user.model');
const OrderServices=require('../../services/orderServices');
const orderServices=new OrderServices()
const FavouriteServices=require('../../services/favouriteServices');
const favouriteServices=new FavouriteServices();
const ProductServices = require("../../services/productServices");
const productServices = new ProductServices();

exports.addInFavourite=async (req,res)=>{
            const {pid}=req.body;
            let product=await productServices.getProduct({item:pid,isDelete:false});
            if(!product)
            {
                return res.json({message:'this item not available'})
            }


            product=await favouriteServices.addNewFavourite({user:req.user._id,item:pid});
            product.save();
            res.json({message:'product added in favourite success'});
}

exports.deleteFromFavourite=async (req,res)=>{
    const {pid}=req.body;
    let favourite=await favouriteServices.getFavourite({item:pid,isDelete:false});
    if(!Favourite)
    {
        return res.json({message:'this  not available in favourite list'})
    }


    favourite=await Favourite.findOneAndUpdate(favourite._id,{isDelete:true},{new:true})
    favourite.save();
    res.json({message:'product deleted in favourite success'});

}
