const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin")
router.post("/register/admin" , adminController.adminSignup)
router.post("/login/admin" , adminController.adminLogin)
router.post("/logout/admin" , adminController.adminLogout)
router.post("/forgot-password/admin" , adminController.adminForgotPassword)
router.post("/reset-password/admin" , adminController.adminResetPassword)

module.exports = router