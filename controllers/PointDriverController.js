// controllers/PointDriverController.js

const asyncHandler = require("express-async-handler");
const PointDriver = require("../models/pointDriverModel");
const Address = require("../models/addressModel");
const VehicleInfo = require("../models/vehicleInfoModel");
const { default: mongoose } = require("mongoose");

//@desc Get all PointDrivers
//@route GET /api/pointdrivers
//@access public
const getPointDrivers = asyncHandler(async (req, res) => {
  const pointDrivers = await PointDriver.find();
  res.status(200).json(pointDrivers);
});

//@desc Get Individual PointDriver
//@route GET /api/pointdrivers/:id
//@access public
const getPointDriver = asyncHandler(async (req, res) => {
  const pointDriver = await PointDriver.findById(req.params.id);

  if (!pointDriver) {
    res.status(404);
    throw new Error("PointDriver Not Found");
  }
  res.status(200).json(pointDriver);
});

//@desc Create New PointDriver
//@route POST /api/pointdrivers
//@access public
const createPointDriver = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { DriverStaffID, DriverPassword, DriverImage, DriverFName, DriverLName, DriverPhone, DriverEmail, DriverCNIC, AddressID, VehicleID, DriverOTP, IsVerified, IsActive, IsArchive, CreatedBy, UpdatedBy } = req.body;

  if(!DriverStaffID || !DriverFName || !DriverLName || !DriverPhone)
  {
    res.status(400).json("Please Fill the required fields");
    //throw new Error("Please Fill the required fields");
  }

  
// Check if DriverStaffID already exists
const existingDriver = await PointDriver.findOne({ DriverStaffID });
if (existingDriver) {
  res.status(400);
  throw new Error("DriverStaffID already exists");
}

  const pointDriver = await PointDriver.create({
    DriverStaffID,
    DriverPassword,
    DriverImage,
    DriverFName,
    DriverLName,
    DriverPhone,
    DriverEmail,
    DriverCNIC,
    AddressID,
    VehicleID,
    DriverOTP,
    IsVerified,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
  });
  console.log("The created pointDriver is", pointDriver);
  res.status(201).json(pointDriver);
  
});

//@desc Update PointDriver
//@route PUT /api/pointdrivers/:id
//@access public
const updatePointDriver = asyncHandler(async (req, res) => {
  const pointDriver = await PointDriver.findById(req.params.id);

  if (!pointDriver) {
    res.status(404);
    throw new Error("PointDriver Not Found");
  }

  const updatedPointDriver = await PointDriver.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated PointDriver with id ${req.params.id}` });
});

//@desc Delete PointDriver
//@route DELETE /api/pointdrivers/:id
//@access public
const deletePointDriver = asyncHandler(async (req, res) => {
  const pointDriver = await PointDriver.findById(req.params.id);

  if (!pointDriver) {
    res.status(404);
    throw new Error("PointDriver Not Found");
  }

  await PointDriver.deleteOne({ _id: req.params.id });

  res.status(200).json(pointDriver);
});

module.exports = {
  getPointDrivers,
  getPointDriver,
  createPointDriver,
  updatePointDriver,
  deletePointDriver,
};
