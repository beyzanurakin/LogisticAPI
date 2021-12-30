const express = require("express");
const logTempatureController = require("../controllers/logTempatureController")
const router = express.Router();

router.route("/temp_list").get(logTempatureController.getTempList);
router.route("/temp_add").post(logTempatureController.createTemp);

module.exports=router;
