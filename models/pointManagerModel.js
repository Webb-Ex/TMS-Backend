// models/PointManager.js

const mongoose = require('mongoose');

const pointManagerSchema = mongoose.Schema(
  {
    ManagerStaffID: {
      type: String,
      unique: true,
    },
    ManagerImage: String,
    ManagerPassword: String,
    ManagerFName: {
      type: String,
      required: [true, 'Please Add the Manager First Name'],
    },
    ManagerLName: {
      type: String,
      required: [true, 'Please Add the Manager Last Name'],
    },
    ManagerPhone: {
      type: String,
      required: [true, 'Please Add the Manager Phone Number'],
    },
    ManagerEmail: {
      type: String,
    },
    
    ManagerCNIC: String,
    AddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    ManagerOTP: String,
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

const PointManager = mongoose.model('PointManager', pointManagerSchema);

module.exports = PointManager;
