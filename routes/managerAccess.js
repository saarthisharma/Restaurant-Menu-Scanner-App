const express = require("express");
const router = express.Router();

const {managerAuthorization} = require('../middleware/ManagerAuthorization.js')

const restaurantController = require("../controllers/restaurantCrud")

// router.post("/restaurant/create" ,managerAuthorization, restaurantController.createRestaurant)
router.get("/restaurant/list" ,managerAuthorization, restaurantController.listRestaurant)
router.post("/restaurant/toggleStatus" ,managerAuthorization, restaurantController.enableDisableRestaurant)
router.patch("/restaurant/update" ,managerAuthorization, restaurantController.updateRestaurant)
router.post("/restaurant/categories/create" ,managerAuthorization, restaurantController.addMenuCategories)
router.get("/restaurant/categories/list" ,managerAuthorization, restaurantController.listMenuCategories)
router.post("/restaurant/categories/toggleStatus" ,managerAuthorization, restaurantController.enableDisableMenuCategories)
router.post("/restaurant/categories/update" ,managerAuthorization, restaurantController.updateMenuCategories)
router.post("/restaurant/menuItems/create" ,managerAuthorization, restaurantController.addMenuItems)
router.get("/restaurant/menuItems/list" ,managerAuthorization, restaurantController.listMenuItems)
router.post("/restaurant/menuItems/update" ,managerAuthorization, restaurantController.updateMenuItems)
router.post("/restaurant/menuItems/toggleStatus" ,managerAuthorization, restaurantController.enableDisableMenuItems)
module.exports = router