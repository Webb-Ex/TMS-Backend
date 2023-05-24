// controllers/RiderController.js

const asyncHandler = require("express-async-handler");
const Rider = require("../models/riderModel");

//@desc Get all Riders
//@route GET /api/riders
//@access public
const getRiders = asyncHandler(async (req, res) => {
  const riders = await Rider.find();
  res.status(200).json(riders);
});

//@desc Get Individual Rider
//@route GET /api/riders/:id
//@access public
const getRider = asyncHandler(async (req, res) => {
  const rider = await Rider.findById(req.params.id);

  if (!rider) {
    res.status(404);
    throw new Error("Rider Not Found");
  }
  res.status(200).json(rider);
});

//@desc Create New Rider
//@route POST /api/riders
//@access public
const createRider = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { RiderImage, RiderPassword, RiderFName, RiderLName, RiderPhone, RiderEmail, RiderCNIC, AddressID, RiderOTP, IsVerified, IsActive, IsArchive, CreatedBy, UpdatedBy, VehicleID } = req.body;

  const rider = await Rider.create({
    RiderImage,
    RiderPassword,
    RiderFName,
    RiderLName,
    RiderPhone,
    RiderEmail,
    RiderCNIC,
    AddressID,
    RiderOTP,
    IsVerified,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
    VehicleID,
  });
  res.status(201).json(rider);
});

//@desc Update Rider
//@route PUT /api/riders/:id
//@access public
const updateRider = asyncHandler(async (req, res) => {
  const rider = await Rider.findById(req.params.id);

  if (!rider) {
    res.status(404);
    throw new Error("Rider Not Found");
  }

  const updatedRider = await Rider.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated Rider with id ${req.params.id}` });
});

//@desc Delete Rider
//@route DELETE /api/riders/:id
//@access public
const deleteRider = asyncHandler(async (req, res) => {
  const rider = await Rider.findById(req.params.id);

  if (!rider) {
    res.status(404);
    throw new Error("Rider Not Found");
  }

  await Rider.deleteOne({ _id: req.params.id });

  res.status(200).json(rider);
});

module.exports = {
  getRiders,
  getRider,
  createRider,
  updateRider,
  deleteRider,
};
