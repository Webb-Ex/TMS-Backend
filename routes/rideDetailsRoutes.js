// routes/rideDetailsRoutes.js

const express = require('express');
const router = express.Router();
const { getRideDetails, getRideDetail, createRideDetail, updateRideDetail, deleteRideDetail } = require("../controllers/RideDetailsController");

router.route("/ridedetails")
  .get(getRideDetails)
  .post(createRideDetail);

router.route("/ridedetails/:id")
  .get(getRideDetail)
  .put(updateRideDetail)
  .delete(deleteRideDetail);

module.exports = router;
