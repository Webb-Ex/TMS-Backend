// routes/pointDriverRoutes.js

const express = require('express');
const router = express.Router();
const { getPointDrivers, getPointDriver, createPointDriver, updatePointDriver, deletePointDriver } = require("../controllers/PointDriverController");

router.route("/pointdrivers")
  .get(getPointDrivers)
  .post(createPointDriver);

router.route("/pointdrivers/:id")
  .get(getPointDriver)
  .put(updatePointDriver)
  .delete(deletePointDriver);

module.exports = router;
