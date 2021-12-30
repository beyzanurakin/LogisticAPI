const express = require("express");
const deviceTypeController = require("../controllers/deviceTypeController")
const router = express.Router();

router.route("/type_list").get(deviceTypeController.getDeviceTypes);
router.route("/type_add").post(deviceController.createDeviceType);
router.route("/deviceType_delete/:id").delete(deviceController.deleteDeviceType);

module.exports=router;
