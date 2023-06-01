// models/User.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    UserImage: String,
    UserFName: {
      type: String,
      //required: [true, 'Please Add the User First Name'],
    },
    UserLName: {
      type: String,
      //required: [true, 'Please Add the User Last Name'],
    },
    UserPhone: {
      type: String,
      required: [true, 'Please Add the User Phone Number'],
    },
    UserEmail: {
      type: String,
    },
    AddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    UserOTP: String,
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


const User = mongoose.model('User', userSchema);

module.exports = User;
