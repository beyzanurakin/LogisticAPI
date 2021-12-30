const express = require("express");
const vehicleController=require("../controllers/vehicleController")
const router = express.Router();

router.route("/vehicle_list").get(vehicleController.getVehicles);
router.route("/vehicle_list/:id").get(vehicleController.getVehicleById);
router.route("/vehicle_add").post(vehicleController.createVehicle);
router.route("/vehicle_update/:id").patch(vehicleController.updateVehicle);
router.route("/vehicle_delete/:id").delete(vehicleController.deleteVehicle);

module.exports=router;
