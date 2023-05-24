// controllers/UserController.js

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Get all Users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc Get Individual User
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  res.status(200).json(user);
});

//@desc Create New User
//@route POST /api/users
//@access public
const createUser = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { UserImage, UserFName, UserLName, UserPhone, UserEmail, AddressID, UserOTP, IsVerified, IsActive, IsArchive, CreatedBy, UpdatedBy } = req.body;

  const user = await User.create({
    UserImage,
    UserFName,
    UserLName,
    UserPhone,
    UserEmail,
    AddressID,
    UserOTP,
    IsVerified,
    IsActive,
    IsArchive,
    CreatedBy,
    UpdatedBy,
  });
  res.status(201).json(user);
});

//@desc Update User
//@route PUT /api/users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated User with id ${req.params.id}` });
});

//@desc Delete User
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  await User.deleteOne({ _id: req.params.id });

  res.status(200).json(user);
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
