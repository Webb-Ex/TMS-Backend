// controllers/VehicleInfoController.js

const asyncHandler = require("express-async-handler");
const VehicleInfo = require("../models/vehicleInfoModel");

//@desc Get all VehicleInfos
//@route GET /api/vehicleinfos
//@access public
const getVehicleInfos = asyncHandler(async (req, res) => {
  const vehicleInfos = await VehicleInfo.find();
  res.status(200).json(vehicleInfos);
});

//@desc Get Individual VehicleInfo
//@route GET /api/vehicleinfos/:id
//@access public
const getVehicleInfo = asyncHandler(async (req, res) => {
  const vehicleInfo = await VehicleInfo.findById(req.params.id);

  if (!vehicleInfo) {
    res.status(404);
    throw new Error("VehicleInfo Not Found");
  }
  res.status(200).json(vehicleInfo);
});

//@desc Create New VehicleInfo
//@route POST /api/vehicleinfos
//@access public
const createVehicleInfo = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { VehiclePlateNo, VehicleType, RiderDrivingLicense, IsActive, IsArchive, CreatedBy, UpdatedBy } = req.body;

  const vehicleInfo = await VehicleInfo.create({
    VehiclePlateNo,
    VehicleType,
    RiderDrivingLicense,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
  });
  res.status(201).json(vehicleInfo);
});

//@desc Update VehicleInfo
//@route PUT /api/vehicleinfos/:id
//@access public
const updateVehicleInfo = asyncHandler(async (req, res) => {
  const vehicleInfo = await VehicleInfo.findById(req.params.id);

  if (!vehicleInfo) {
    res.status(404);
    throw new Error("VehicleInfo Not Found");
  }

  const updatedVehicleInfo = await VehicleInfo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated VehicleInfo with id ${req.params.id}` });
});

//@desc Delete VehicleInfo
//@route DELETE /api/vehicleinfos/:id
//@access public
const deleteVehicleInfo = asyncHandler(async (req, res) => {
  const vehicleInfo = await VehicleInfo.findById(req.params.id);

  if (!vehicleInfo) {
    res.status(404);
    throw new Error("VehicleInfo Not Found");
  }

  await VehicleInfo.deleteOne({ _id: req.params.id });

  res.status(200).json(vehicleInfo);
});

module.exports = {
  getVehicleInfos,
  getVehicleInfo,
  createVehicleInfo,
  updateVehicleInfo,
  deleteVehicleInfo,
};
