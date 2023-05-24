// controllers/PointManagerController.js

const asyncHandler = require("express-async-handler");
const PointManager = require("../models/pointManagerModel");

//@desc Get all PointManagers
//@route GET /api/pointmanagers
//@access public
const getPointManagers = asyncHandler(async (req, res) => {
  const pointManagers = await PointManager.find();
  res.status(200).json(pointManagers);
});

//@desc Get Individual PointManager
//@route GET /api/pointmanagers/:id
//@access public
const getPointManager = asyncHandler(async (req, res) => {
  const pointManager = await PointManager.findById(req.params.id);

  if (!pointManager) {
    res.status(404);
    throw new Error("PointManager Not Found");
  }
  res.status(200).json(pointManager);
});

//@desc Create New PointManager
//@route POST /api/pointmanagers
//@access public
const createPointManager = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { ManagerStaffID, ManagerImage, ManagerPassword, MangerFName, MangerLName, MangerPhone, ManagerEmail, MangerCNIC, AddressID, ManagerOTP, IsVerified, IsActive, IsArchive, CreatedBy, UpdatedBy } = req.body;

  const pointManager = await PointManager.create({
    ManagerStaffID,
    ManagerImage,
    ManagerPassword,
    MangerFName,
    MangerLName,
    MangerPhone,
    ManagerEmail,
    MangerCNIC,
    AddressID,
    ManagerOTP,
    IsVerified,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
  });
  res.status(201).json(pointManager);
});

//@desc Update PointManager
//@route PUT /api/pointmanagers/:id
//@access public
const updatePointManager = asyncHandler(async (req, res) => {
  const pointManager = await PointManager.findById(req.params.id);

  if (!pointManager) {
    res.status(404);
    throw new Error("PointManager Not Found");
  }

  const updatedPointManager = await PointManager.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated PointManager with id ${req.params.id}` });
});

//@desc Delete PointManager
//@route DELETE /api/pointmanagers/:id
//@access public
const deletePointManager = asyncHandler(async (req, res) => {
  const pointManager = await PointManager.findById(req.params.id);

  if (!pointManager) {
    res.status(404);
    throw new Error("PointManager Not Found");
  }

  await PointManager.deleteOne({ _id: req.params.id });

  res.status(200).json(pointManager);
});

module.exports = {
  getPointManagers,
  getPointManager,
  createPointManager,
  updatePointManager,
  deletePointManager,
};
