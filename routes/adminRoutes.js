const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin")
router.post("/register/admin" , adminController.adminSignup)

module.exports = router