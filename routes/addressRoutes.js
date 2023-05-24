// routes/addressRoutes.js

const express = require('express');
const router = express.Router();
const { getAddresses, getAddress, createAddress, updateAddress, deleteAddress } = require("../controllers/AddressController");

router.route("/addresses")
  .get(getAddresses)
  .post(createAddress);

router.route("/addresses/:id")
  .get(getAddress)
  .put(updateAddress)
  .delete(deleteAddress);

module.exports = router;
