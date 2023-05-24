// models/RideDetails.js

const mongoose = require('mongoose');

const rideDetailsSchema = mongoose.Schema(
  {
    RideStartTime: Date,
    RideEndTime: Date,
    RideStartLocation: String,
    RideEndLocation: String,
    RideCharges: Number,
    RidePromoCode: String,
    RideDiscount: Number,
    RideTax: Number,
    IsActive: Boolean,
    IsArchive: Boolean,
    CreatedBy: Number,
    UpdatedBy: Number,
    RiderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
    },
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const RideDetails = mongoose.model('RideDetails', rideDetailsSchema);

module.exports = RideDetails;
