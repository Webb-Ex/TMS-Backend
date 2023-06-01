// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")
const { getUsers, getUser, signup, verifyOTP, updateUser, deleteUser } = require("../controllers/UserController");

router.route("/users")
  .get(getUsers);

router.route("/users/signup").post(signup);

router.route("/users/verifyOTP").post(verifyOTP);

router.route("/users/update").put(validateToken,updateUser);

router.route("/users/:id")
  .get(getUser)
  .delete(deleteUser);


module.exports = router;
