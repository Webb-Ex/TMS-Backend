// routes/vehicleInfoRoutes.js

const express = require('express');
const router = express.Router();
const { getVehicleInfos, getVehicleInfo, createVehicleInfo, updateVehicleInfo, deleteVehicleInfo } = require("../controllers/VehicleInfoController");

router.route("/vehicleinfos")
  .get(getVehicleInfos)
  .post(createVehicleInfo);

router.route("/vehicleinfos/:id")
  .get(getVehicleInfo)
  .put(updateVehicleInfo)
  .delete(deleteVehicleInfo);

module.exports = router;
