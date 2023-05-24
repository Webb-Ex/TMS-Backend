// controllers/AddressController.js

const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");

//@desc Get all Addresses
//@route GET /api/addresses
//@access public
const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find();
  res.status(200).json(addresses);
});

//@desc Get Individual Address
//@route GET /api/addresses/:id
//@access public
const getAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    res.status(404);
    throw new Error("Address Not Found");
  }
  res.status(200).json(address);
});

//@desc Create New Address
//@route POST /api/addresses
//@access public
const createAddress = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { Country, Cordinates, State, City, Area, CompleteAddress, IsActive, IsArchive } = req.body;

  const address = await Address.create({
    Country,
    Cordinates,
    State,
    City,
    Area,
    CompleteAddress,
    IsActive,
    IsArchive,
  });
  res.status(201).json(address);
});

//@desc Update Address
//@route PUT /api/addresses/:id
//@access public
const updateAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    res.status(404);
    throw new Error("Address Not Found");
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated Address with id ${req.params.id}` });
});

//@desc Delete Address
//@route DELETE /api/addresses/:id
//@access public
const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    res.status(404);
    throw new Error("Address Not Found");
  }

  await Address.deleteOne({ _id: req.params.id });

  res.status(200).json(address);
});

module.exports = {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
};
