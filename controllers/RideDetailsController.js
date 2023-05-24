// controllers/RideDetailsController.js

const asyncHandler = require("express-async-handler");
const RideDetails = require("../models/rideDetailsModel");

//@desc Get all RideDetails
//@route GET /api/ridedetails
//@access public
const getRideDetails = asyncHandler(async (req, res) => {
  const rideDetails = await RideDetails.find();
  res.status(200).json(rideDetails);
});

//@desc Get Individual RideDetails
//@route GET /api/ridedetails/:id
//@access public
const getRideDetail = asyncHandler(async (req, res) => {
  const rideDetail = await RideDetails.findById(req.params.id);

  if (!rideDetail) {
    res.status(404);
    throw new Error("RideDetails Not Found");
  }
  res.status(200).json(rideDetail);
});

//@desc Create New RideDetails
//@route POST /api/ridedetails
//@access public
const createRideDetail = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const {
    RideStartTime,
    RideEndTime,
    RideStartLocation,
    RideEndLocation,
    RideCharges,
    RidePromoCode,
    RideDiscount,
    RideTax,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
    RiderID,
    UserID,
  } = req.body;

  const rideDetail = await RideDetails.create({
    RideStartTime,
    RideEndTime,
    RideStartLocation,
    RideEndLocation,
    RideCharges,
    RidePromoCode,
    RideDiscount,
    RideTax,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
    RiderID,
    UserID,
  });
  res.status(201).json(rideDetail);
});

//@desc Update RideDetails
//@route PUT /api/ridedetails/:id
//@access public
const updateRideDetail = asyncHandler(async (req, res) => {
  const rideDetail = await RideDetails.findById(req.params.id);

  if (!rideDetail) {
    res.status(404);
    throw new Error("RideDetails Not Found");
  }

  const updatedRideDetail = await RideDetails.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated RideDetails with id ${req.params.id}` });
});

//@desc Delete RideDetails
//@route DELETE /api/ridedetails/:id
//@access public
const deleteRideDetail = asyncHandler(async (req, res) => {
  const rideDetail = await RideDetails.findById(req.params.id);

  if (!rideDetail) {
    res.status(404);
    throw new Error("RideDetails Not Found");
  }

  await RideDetails.deleteOne({ _id: req.params.id });

  res.status(200).json(rideDetail);
});

module.exports = {
  getRideDetails,
  getRideDetail,
  createRideDetail,
  updateRideDetail,
  deleteRideDetail,
};
