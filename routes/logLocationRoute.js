const express = require("express");
const logLocationController = require("../controllers/logLocationController")
const router = express.Router();

router.route("/gps_list").get(logLocationController.getGpsList);
router.route("/gps_add").post(logLocationController.createGps);

module.exports=router;
