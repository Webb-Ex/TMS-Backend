// controllers/UserController.js

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const _ = require("lodash");
const bcrypt = require("bcrypt");

//@desc Get all Users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc Get Individual User
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  res.status(200).json(user);
});

//@desc Signup
//@route POST /api/users
//@access public
const signup = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { UserPhone, } = req.body;

  if(!UserPhone){
    res.status(400).json("Please Enter Phone Number");
  }

  //Generate OTP
  const OTP = otpGenerator.generate(6, { 
    digits: true,    // Allow digits (0-9)
    alphabets: false, // Do not allow alphabets
    upperCase: false, // Do not allow uppercase letters
    specialChars: false, // Do not allow special characters
  });

  const existingUser = await User.findOne({ UserPhone });
  if (existingUser) {
    // User already exists, update UserOTP field and send OTP
    const salt = await bcrypt.genSalt(10);
    existingUser.UserOTP = await bcrypt.hash(OTP, salt);
  //    existingUser.updatedAt = Date.now();

    await existingUser.save();

    console.log("The OTP is", OTP);
    return res.status(200).json("OTP Sent Successfully");

  }
  
  const number = UserPhone;
  console.log("The OTP is", OTP);

  //Save OTP to DB
  const otp = new User({ UserPhone: number, UserOTP: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.UserOTP = await bcrypt.hash(otp.UserOTP, salt);
  const result = await otp.save();
  return res.status(200).json("OTP Send Successfully");

});

// Function to generate JWT token
const generateToken = (userId, userPhone) => {
  const token = jwt.sign({ userId, userPhone }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expiration time
  });
  return token;
};


//@desc Verify OTP and Register User
//@route POST /api/users/verify
//@access public
const verifyOTP = asyncHandler(async (req, res) => {
  const { UserPhone, UserOTP } = req.body;

  // Find the user by phone number
  const user = await User.findOne({ UserPhone });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Compare the entered OTP with the stored OTP
  const isMatch = await bcrypt.compare(UserOTP, user.UserOTP);
  console.log(isMatch);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid OTP");
  }

  if (user.IsVerified) {
    // User is already verified, update the OTP expiration based on updatedAt
    const otpExpiration = 120; // OTP expiration time in seconds
    const currentTime = new Date().getTime() / 1000; // Current time in seconds
    const otpUpdateTime = user.updatedAt.getTime() / 1000; // OTP update time in seconds
    const otpElapsedTime = currentTime - otpUpdateTime;

    console.log("The otpElapsedTime is", otpElapsedTime)

    if (otpElapsedTime > otpExpiration) {
      // OTP has expired, clear the UserOTP field
      user.UserOTP = undefined; // or user.UserOTP = null
      user.updatedAt = undefined; // or user.updatedAt = null

      await user.save();

      res.status(401);
      throw new Error("OTP has expired");
    }

    // Update the user's verification status and save the user
    user.IsVerified = true;
    const updatedUser = await user.save();

    // Generate JWT token
    const token = generateToken(updatedUser._id, updatedUser.UserPhone);

    // Return the token as the response
    res.status(201).json({ token });
  } else {
    // User is not verified, check the OTP expiration based on createdAt
    const otpExpiration = 120; // OTP expiration time in seconds
    const currentTime = new Date().getTime() / 1000; // Current time in seconds
    const otpCreationTime = user.createdAt.getTime() / 1000; // OTP creation time in seconds
    const otpElapsedTime = currentTime - otpCreationTime;

    console.log("The otpElapsedTime is", otpElapsedTime);

    if (otpElapsedTime > otpExpiration) {
      // OTP has expired, delete the user document
      await User.deleteOne({ _id: user._id });
      res.status(401);
      throw new Error("OTP has expired");
    }

    // Update the user's verification status and save the user
    user.IsVerified = true;
    const updatedUser = await user.save();

  // Generate JWT token
  const token = generateToken(updatedUser._id, updatedUser.UserPhone);

  // Return the token as the response
  res.status(201).json({ token });
}});


//@desc Update User
//@route PUT /api/users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({UserPhone: req.body.UserPhone});
  console.log("The user is", user);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: `Updated User with id ${updatedUser._id}`, UserPhone: updatedUser.UserPhone });
});

//@desc Delete User
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  await User.deleteOne({ _id: req.params.id });

  res.status(200).json(user);
});

module.exports = {
  getUsers,
  getUser,
  signup,
  updateUser,
  deleteUser,
  verifyOTP,
};
