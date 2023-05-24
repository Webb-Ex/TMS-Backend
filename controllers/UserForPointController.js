// controllers/UserForPointController.js

const asyncHandler = require("express-async-handler");
const UserForPoint = require("../models/userForPointModel");

//@desc Get all UserForPoints
//@route GET /api/userforpoints
//@access public
const getUserForPoints = asyncHandler(async (req, res) => {
  const userForPoints = await UserForPoint.find();
  res.status(200).json(userForPoints);
});

//@desc Get Individual UserForPoint
//@route GET /api/userforpoints/:id
//@access public
const getUserForPoint = asyncHandler(async (req, res) => {
  const userForPoint = await UserForPoint.findById(req.params.id);

  if (!userForPoint) {
    res.status(404);
    throw new Error("UserForPoint Not Found");
  }
  res.status(200).json(userForPoint);
});

//@desc Create New UserForPoint
//@route POST /api/userforpoints
//@access public
const createUserForPoint = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { StdID, StudentPassword, StudentImage, StudentFName, StudentLName, StudentPhone, StudentEmail, Semester, Year, StartMonth, EndMonth, AddressID, PaymentID, UserOTP, IsVerified, IsActive, IsArchive, CreatedBy, UpdatedBy } = req.body;

  const userForPoint = await UserForPoint.create({
    StdID,
    StudentPassword,
    StudentImage,
    StudentFName,
    StudentLName,
    StudentPhone,
    StudentEmail,
    Semester,
    Year,
    StartMonth,
    EndMonth,
    AddressID,
    PaymentID,
    UserOTP,
    IsVerified,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
  });
  res.status(201).json(userForPoint);
});

//@desc Update UserForPoint
//@route PUT /api/userforpoints/:id
//@access public
const updateUserForPoint = asyncHandler(async (req, res) => {
  const userForPoint = await UserForPoint.findById(req.params.id);

  if (!userForPoint) {
    res.status(404);
    throw new Error("UserForPoint Not Found");
  }

  const updatedUserForPoint = await UserForPoint.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated UserForPoint with id ${req.params.id}` });
});

//@desc Delete UserForPoint
//@route DELETE /api/userforpoints/:id
//@access public
const deleteUserForPoint = asyncHandler(async (req, res) => {
  const userForPoint = await UserForPoint.findById(req.params.id);

  if (!userForPoint) {
    res.status(404);
    throw new Error("UserForPoint Not Found");
  }

  await UserForPoint.deleteOne({ _id: req.params.id });

  res.status(200).json(userForPoint);
});

module.exports = {
  getUserForPoints,
  getUserForPoint,
  createUserForPoint,
  updateUserForPoint,
  deleteUserForPoint,
};
