const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController")
router.get("/get" , cartController.getCompleteMenuItems)

module.exports = router