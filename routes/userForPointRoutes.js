// routes/userForPointRoutes.js

const express = require('express');
const router = express.Router();
const { getUserForPoints, getUserForPoint, createUserForPoint, updateUserForPoint, deleteUserForPoint } = require("../controllers/UserForPointController");

router.route("/userforpoints")
  .get(getUserForPoints)
  .post(createUserForPoint);

router.route("/userforpoints/:id")
  .get(getUserForPoint)
  .put(updateUserForPoint)
  .delete(deleteUserForPoint);

module.exports = router;
