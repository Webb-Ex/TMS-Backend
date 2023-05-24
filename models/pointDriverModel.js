// models/PointDriver.js

const mongoose = require('mongoose');

const pointDriverSchema = mongoose.Schema(
  {
    DriverStaffID: {
      type: String,
      unique: true,
    },
    DriverPassword: String,
    DriverImage: String,
    DriverFName: {
      type: String,
      required: [true, 'Please Add the Driver First Name'],
    },
    DriverLName: {
      type: String,
      required: [true, 'Please Add the Driver Last Name'],
    },
    DriverPhone: {
      type: String,
      required: [true, 'Please Add the Driver Phone Number'],
    },
    DriverEmail: {
      type: String,
    },
    
    DriverCNIC: String,
    AddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    VehicleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VehicleInfo',
    },
    DriverOTP: String,
    IsVerified: Boolean,
    IsActive: Boolean,
    IsArchive: Boolean,
    CreatedBy: Number,
    UpdatedBy: Number,
  },
  {
    timestamps: true,
  }
);

const PointDriver = mongoose.model('PointDriver', pointDriverSchema);

module.exports = PointDriver;
