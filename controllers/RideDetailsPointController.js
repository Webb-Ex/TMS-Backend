// controllers/RideDetailsPointController.js

const asyncHandler = require("express-async-handler");
const RideDetailsPoint = require("../models/rideDetailsPointModel");

//@desc Get all RideDetailsPoint
//@route GET /api/ridedetailspoint
//@access public
const getRideDetailsPoint = asyncHandler(async (req, res) => {
  const rideDetailsPoint = await RideDetailsPoint.find();
  res.status(200).json(rideDetailsPoint);
});

//@desc Get Individual RideDetailsPoint
//@route GET /api/ridedetailspoint/:id
//@access public
const getRideDetailPoint = asyncHandler(async (req, res) => {
  const rideDetailPoint = await RideDetailsPoint.findById(req.params.id);

  if (!rideDetailPoint) {
    res.status(404);
    throw new Error("RideDetailsPoint Not Found");
  }
  res.status(200).json(rideDetailPoint);
});

//@desc Create New RideDetailsPoint
//@route POST /api/ridedetailspoint
//@access public
const createRideDetailPoint = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const {
    RideStartTime,
    RideEndTime,
    RideStartLocation,
    RideEndLocation,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
    DriverID,
    StudentID,
  } = req.body;

  const rideDetailPoint = await RideDetailsPoint.create({
    RideStartTime,
    RideEndTime,
    RideStartLocation,
    RideEndLocation,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
    DriverID,
    StudentID,
  });
  res.status(201).json(rideDetailPoint);
});

//@desc Update RideDetailsPoint
//@route PUT /api/ridedetailspoint/:id
//@access public
const updateRideDetailPoint = asyncHandler(async (req, res) => {
  const rideDetailPoint = await RideDetailsPoint.findById(req.params.id);

  if (!rideDetailPoint) {
    res.status(404);
    throw new Error("RideDetailsPoint Not Found");
  }

  const updatedRideDetailPoint = await RideDetailsPoint.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated RideDetailsPoint with id ${req.params.id}` });
});

//@desc Delete RideDetailsPoint
//@route DELETE /api/ridedetailspoint/:id
//@access public
const deleteRideDetailPoint = asyncHandler(async (req, res) => {
  const rideDetailPoint = await RideDetailsPoint.findById(req.params.id);

  if (!rideDetailPoint) {
    res.status(404);
    throw new Error("RideDetailsPoint Not Found");
  }

  await RideDetailsPoint.deleteOne({ _id: req.params.id });

  res.status(200).json(rideDetailPoint);
});

module.exports = {
  getRideDetailsPoint,
  getRideDetailPoint,
  createRideDetailPoint,
  updateRideDetailPoint,
  deleteRideDetailPoint,
};
