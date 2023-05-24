// routes/rideDetailsPointRoutes.js

const express = require('express');
const router = express.Router();
const { getRideDetailsPoint, getRideDetailPoint, createRideDetailPoint, updateRideDetailPoint, deleteRideDetailPoint } = require("../controllers/RideDetailsPointController");

router.route("/ridedetailspoint")
  .get(getRideDetailsPoint)
  .post(createRideDetailPoint);

router.route("/ridedetailspoint/:id")
  .get(getRideDetailPoint)
  .put(updateRideDetailPoint)
  .delete(deleteRideDetailPoint);

module.exports = router;
