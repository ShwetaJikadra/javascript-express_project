const Favourite=require('../model/favourite.model');
module.exports=class FavouriteServices{
    addNewFavourite=async (body)=>{
        return await Favourite.create(body);
    }
    getFavourite=async (body)=>{
        return await Favourite.find(body);
    }
    getFavouriteById=async (id)=>{
        return await Favourite.findById(id)
    }

    updateFavourite=async (id,body)=>{
        return await Favourite.findByIdAndUpdate(id,{$set:body},{new:true})
    }
}