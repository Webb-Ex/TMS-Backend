// models/RideDetailsPoint.js

const mongoose = require('mongoose');

const rideDetailsPointSchema = mongoose.Schema(
  {
    RideStartTime: Date,
    RideEndTime: Date,
    RideStartLocation: Number,
    RideEndLocation: Number,
    IsActive: Boolean,
    IsArchive: Boolean,
    CreatedBy: Number,
    UpdatedBy: Number,
    DriverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PointDriver',
    },
    StudentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserForPoint',
    },
  },
  {
    timestamps: true,
  }
);

const RideDetailsPoint = mongoose.model('RideDetailsPoint', rideDetailsPointSchema);

module.exports = RideDetailsPoint;
