// models/UserForPoint.js

const mongoose = require('mongoose');

const userForPointSchema = mongoose.Schema(
  {
    StdID: {
      type: Number,
      unique: true,
    },
    StudentPassword: String,
    StudentImage: String,

    StudentFName: {
      type: String,
      required: [true, 'Please Add the Student First Name'],
    },
    StudentLName: {
      type: String,
      required: [true, 'Please Add the Student Last Name'],
    },
    StudentPhone: {
      type: String,
      required: [true, 'Please Add the Student Phone Number'],
    },
    StudentEmail: {
      type: String,
    },
    
    Semester: String,
    Year: Date,
    StartMonth: Date,
    EndMonth: Date,
    AddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    PaymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
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

const UserForPoint = mongoose.model('UserForPoint', userForPointSchema);

module.exports = UserForPoint;
