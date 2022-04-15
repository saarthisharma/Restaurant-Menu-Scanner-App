const express = require("express");
const router = express.Router();

const appUserController = require("../controllers/appUserController")

router.post("/register", appUserController.registerViaNumber)
router.post("/verifyOtp" , appUserController.verifyOtp)
router.post("/resendOtp" , appUserController.resendOTP)

module.exports = router