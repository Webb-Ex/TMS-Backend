// models/VehicleInfo.js

const mongoose = require('mongoose');

const vehicleInfoSchema = mongoose.Schema(
  {
    VehiclePlateNo: String,
    VehicleType: String,
    RiderDrivingLicense: String,
    IsActive: Boolean,
    IsArchive: Boolean,
    CreatedBy: Number,
    UpdatedBy: Number,
  },
  {
    timestamps: true,
  }
);

const VehicleInfo = mongoose.model('VehicleInfo', vehicleInfoSchema);

module.exports = VehicleInfo;
