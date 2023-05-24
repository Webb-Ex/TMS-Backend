// models/Address.js

const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    Country: String,
    Cordinates: String,
    State: String,
    City: String,
    Area: String,
    CompleteAddress: String,
    IsActive: Boolean,
    IsArchive: Boolean,
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
