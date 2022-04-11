const express = require("express");
const router = express.Router();
const {adminAuthorization} = require("../middleware/adminAuthorization")
const restaurantController = require("../controllers/restaurantCrud")
router.post("/restaurant/create" ,adminAuthorization, restaurantController.createRestaurant)
router.get("/restaurant/listRestaurant" ,adminAuthorization, restaurantController.listRestaurant)
router.post("/restaurant/toggleStatus" ,adminAuthorization, restaurantController.enableDisableRestaurant)
router.put("/restaurant/updateRestaurant" ,adminAuthorization, restaurantController.updateRestaurant)
router.post("/restaurant/categories/create" ,adminAuthorization, restaurantController.addMenuCategories)
router.get("/restaurant/categories/list" ,adminAuthorization, restaurantController.listMenuCategories)
router.post("/restaurant/categories/toggleStatus" ,adminAuthorization, restaurantController.enableDisableMenuCategories)
router.post("/restaurant/categories/update" ,adminAuthorization, restaurantController.updateMenuCategories)
router.post("/restaurant/menuItems/create" ,adminAuthorization, restaurantController.addMenuItems)
router.get("/restaurant/menuItems/list" ,adminAuthorization, restaurantController.listMenuItems)
router.post("/restaurant/menuItems/update" ,adminAuthorization, restaurantController.updateMenuItems)
router.post("/restaurant/menuItems/toggleStatus" ,adminAuthorization, restaurantController.enableDisableMenuItems)
module.exports = router