const mongoose = require("mongoose")
const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")
const Restaurant = require("../Model/restaurant")
const {cuisines} = require("../utils/constants")
const Categories = require("../Model/categories")
const Menu = require("../Model/menu")

const res = require("express/lib/response")
const getCompleteMenuItems = async(req,res) =>{
    try {
        let restaurantId = req.query.restaurantId
        console.log('restaurantId :', restaurantId);

        let getMenu = await Restaurant.findOne({_id:restaurantId})
        console.log('getMenu :', getMenu);
        return res.send("working")
    } catch (error) {
       console.log('error :', error);
       return responseHandler.handler(res,false, message.customMessages.error, [], 500) 
    }
}
module.exports = {
    getCompleteMenuItems
}