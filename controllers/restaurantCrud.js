const mongoose = require("mongoose")
const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")
const {cuisines} = require("../utils/constants")
const Restaurant = require("../Model/restaurant")
const Categories = require("../Model/categories")
const Menu = require("../Model/menu")
const {restaurantValidation} = require("../validations/restaurantValidation")
const {categoryValidation} = require("../validations/categoryValidation")
const {updateCategoryValidation} = require("../validations/updateCategory")
const {menuValidation} = require("../validations/menuValidation")
const res = require("express/lib/response")

const createRestaurant = async(req,res) =>{
    try {
        const {
            name,
            email,
            countryCode,
            contactNumber,
            countryName,
            state,
            city,
            cuisines,
            openingTime,
            closingTime,
            acceptedCurrency,
            createdBy
        } = req.body

        // joi
        let validation = restaurantValidation(req.body)
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        let openingTimeArr = openingTime.split(':')
        
        let openingTimeMinutes = parseInt(openingTimeArr[0])*60 + parseInt(openingTimeArr[1]) 
        
        let closingTimeArr = closingTime.split(':')
        
        let closingTimeMinutes = parseInt(closingTimeArr[0])*60 + parseInt(closingTimeArr[1])

        if(closingTimeMinutes==openingTimeMinutes){
            return responseHandler.handler(res,true,message.customMessages.timeSame , [] , 422)    
        }

        if(closingTimeMinutes<openingTimeMinutes){
            return responseHandler.handler(res,true,message.customMessages.closingTimeLess , [] , 422)    
        }
        
        let saveRestaurant = new Restaurant({
            name:name,
            email:email,
            countryCode:countryCode,
            contactNumber:contactNumber,
            countryName:countryName,
            state:state,
            city:city,
            cuisines:cuisines,
            openingTime:openingTimeMinutes,
            closingTime:closingTimeMinutes,
            acceptedCurrency:acceptedCurrency,
            createdBy:createdBy
        })
        await saveRestaurant.save() 
        return responseHandler.handler(res,true,message.customMessages.restaurantSaved , saveRestaurant , 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const getStringTime =  (Time) =>{
    let hours = parseInt(Time/60);
    let minutes = Time%60
    const time = hours+':'+minutes
    return time;
}
const listRestaurant = async(req,res) => {
    try {
        let data = await Restaurant.find({}).lean()
        
        if(!data){
            return responseHandler.handler(res,false, message.customMessages.NoDataFound, [], 500)    
        }

        const newObj = data.map((item)=>{
            if(item && item.cuisines){
                item.cuisines.map(function(element , index){
                    item.cuisines[index] = cuisines[element]
                })
            }
            item['openingTime'] =  getStringTime(item['openingTime'])
            item['closingTime'] =  getStringTime(item['closingTime'])
            return item;
        })
        
        return responseHandler.handler(res,true,message.customMessages.restaurantList , newObj , 200)
        
       
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const enableDisableRestaurant = async(req,res) =>{
    try {
        let data = await Restaurant.findOne({_id:req.query.id})
        if(data.activeStatus){
            deActivationMessage = "Restaurant deactivate successfully"
            await Restaurant.updateOne({_id:req.query.id},
                {
                    $set:
                    {
                        activeStatus:0
                    }
                }
                )
                return responseHandler.handler(res,true,deActivationMessage,[], 201)
        }
        else{
            ActivationMessage = "Restaurant activate successfully"
            await Restaurant.updateOne({_id:req.query.id},
                {
                    $set:
                    {
                        activeStatus:1
                    }
                }
                )
                return responseHandler.handler(res,true,ActivationMessage,[], 201)
        }
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const updateRestaurant = async(req,res) => {
    try {
        let restaurantId = req.query.id
        const {
            name,
            email,
            countryCode,
            contactNumber,
            countryName,
            state,
            city,
            cuisines,
            openingTime,
            closingTime,
            activeStatus,
            acceptedCurrency,
            createdBy
        } = req.body

        let validation = restaurantValidation(req.body)
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        let openingTimeArr = openingTime.split(':')
        
        let openingTimeMinutes = parseInt(openingTimeArr[0])*60 + parseInt(openingTimeArr[1]) 
        
        let closingTimeArr = closingTime.split(':')
        
        let closingTimeMinutes = parseInt(closingTimeArr[0])*60 + parseInt(closingTimeArr[1])

        if(closingTimeMinutes==openingTimeMinutes){
            return responseHandler.handler(res,true,message.customMessages.timeSame , [] , 422)    
        }

        if(closingTimeMinutes<openingTimeMinutes){
            return responseHandler.handler(res,true,message.customMessages.closingTimeLess , [] , 422)    
        }

        await Restaurant.updateOne(
            {_id:restaurantId},
            {
                $set:
                {
                    name:name,
                    email:email,
                    countryCode:countryCode,
                    contactNumber:contactNumber,
                    countryName:countryName,
                    state:state,
                    city:city,
                    cuisines:cuisines,
                    openingTime:openingTimeMinutes,
                    closingTime:closingTimeMinutes,
                    activeStatus:activeStatus,
                    acceptedCurrency:acceptedCurrency,
                    createdBy:createdBy
                }
            }
        )

        return responseHandler.handler(res,true,message.customMessages.restaurantProfileUpdated , req.body , 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const addMenuCategories = async(req,res) => {
    try {
        const {restaurantId ,name , availableStatus} = req.body
 
        let validation = categoryValidation(req.body)
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }
        let categories = new Categories({
            restaurantId:restaurantId,
            name:name,
            availableStatus:availableStatus
        })
        let data = await categories.save()
        if(!data){
            return responseHandler.handler(res,false, message.customMessages.categoryNotCreate, [], 500)    
        }
        return responseHandler.handler(res,true,message.customMessages.categorySaved , data , 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const listMenuCategories = async(req,res) =>{
    try {
        let data = await Categories.find({})
        
        if(!data){
            return responseHandler.handler(res,false, message.customMessages.NoDataFound, [], 500)    
        }
        
        return responseHandler.handler(res,true,message.customMessages.restaurantList , data , 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const enableDisableMenuCategories = async(req,res) =>{
    try {
        let data = await Categories.findOne({_id:req.query.id})
        if(data.availableStatus){
            deActivationMessage = "Category deactivate successfully"
            await Categories.updateOne({_id:req.query.id},
                {
                    $set:
                    {
                        availableStatus:0
                    }
                }
                )
                return responseHandler.handler(res,true,deActivationMessage,[], 201)
        }
        else{
            ActivationMessage = "Category activate successfully"
            await Categories.updateOne({_id:req.query.id},
                {
                    $set:
                    {
                        availableStatus:1
                    }
                }
                )
                return responseHandler.handler(res,true,ActivationMessage,[], 201)
        }
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const updateMenuCategories = async(req,res) =>{
    try {
        let categoryId = req.query.id
        const {name} = req.body
        
        let validation = updateCategoryValidation(req.body)
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }
 
        await Categories.updateOne(
            {_id:categoryId},
            {
                $set:
                {
                    name:name
                }
            }
        )

        return responseHandler.handler(res,true,message.customMessages.categoryUpdated , req.body , 201)

    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const addMenuItems = async(req,res) =>{
    try {
        const {restaurantId , categoryId , name , tags , price} = req.body

        // joi
        let validation = menuValidation(req.body)
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        let saveMenu = new Menu({
            restaurantId:restaurantId, 
            categoryId:categoryId, 
            name:name, 
            tags:tags, 
            price:price
        })
        
        let data = await saveMenu.save()
        
        return responseHandler.handler(res,true,message.customMessages.itemSaved , data , 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const listMenuItems = async(req,res) =>{
    try {
        let data = await Menu.find({})
        
        if(!data){
            return responseHandler.handler(res,false, message.customMessages.NoDataFound, [], 500)    
        }
        
        return responseHandler.handler(res,true,message.customMessages.menuItemList , data , 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const updateMenuItems = async(req,res) =>{
    try {
        let menuItemId = req.query.id
        const {name , tags , price} = req.body

        // validation left

        await Menu.updateOne(
            {_id:menuItemId},
            {
                $set:
                {
                    name: name,
                    tags: tags,
                    price: price
                }
            }
        )

        return responseHandler.handler(res,true,message.customMessages.menuitemUpdated , req.body , 201)


    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const enableDisableMenuItems = async(req,res) =>{
    try {
        let data = await Menu.findOne({_id:req.query.id})
        if(data.availableStatus){
            deActivationMessage = "Menu Item deactivate successfully"
            await Menu.updateOne({_id:req.query.id},
                {
                    $set:
                    {
                        availableStatus:0
                    }
                }
                )
                return responseHandler.handler(res,true,deActivationMessage,[], 201)
        }
        else{
            ActivationMessage = "Menu Item activate successfully"
            await Menu.updateOne({_id:req.query.id},
                {
                    $set:
                    {
                        availableStatus:1
                    }
                }
                )
                return responseHandler.handler(res,true,ActivationMessage,[], 201)
        }

    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

module.exports = {
    createRestaurant,
    listRestaurant,
    enableDisableRestaurant,
    updateRestaurant,
    addMenuCategories,
    listMenuCategories,
    enableDisableMenuCategories,
    updateMenuCategories,
    addMenuItems,
    listMenuItems,
    enableDisableMenuItems,
    updateMenuItems
}