const express = require("express");
const router = express.Router();

const restaurantManagerController = require("../controllers/restaurantManager")
router.post("/register/restaurantManager" , restaurantManagerController.restaurantManagerSignup)
router.post("/login/restaurantManager" , restaurantManagerController.restaurantManagerLogin)
router.post("/logout/restaurantManager" , restaurantManagerController.restaurantManagerLogout)
router.post("/forgotPassword/restaurantManager" , restaurantManagerController.restaurantManagerForgotPassword)
router.post("/resetPassword/restaurantManager" , restaurantManagerController.restaurantManagerResetPassword)

module.exports = router