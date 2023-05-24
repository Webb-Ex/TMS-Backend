// models/Rider.js

const mongoose = require('mongoose');

const riderSchema = mongoose.Schema(
  {
    RiderImage: String,
    RiderPassword: String,
    RiderFName: {
      type: String,
      required: [true, 'Please Add the Rider First Name'],
    },
    RiderLName: {
      type: String,
      required: [true, 'Please Add the Rider Last Name'],
    },
    RiderPhone: {
      type: String,
      required: [true, 'Please Add the Rider Phone Number'],
    },
    RiderEmail: {
      type: String,
    },
    RiderCNIC: String,
    AddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    RiderOTP: String,
    IsVerified: Boolean,
    IsActive: Boolean,
    IsArchive: Boolean,
    CreatedBy: Number,
    UpdatedBy: Number,
    VehicleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VehicleInfo',
    },
  },
  {
    timestamps: true,
  }
);

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
