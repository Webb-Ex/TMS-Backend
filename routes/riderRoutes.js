// routes/riderRoutes.js

const express = require('express');
const router = express.Router();
const { getRiders, getRider, createRider, updateRider, deleteRider } = require("../controllers/RiderController");

router.route("/riders")
  .get(getRiders)
  .post(createRider);

router.route("/riders/:id")
  .get(getRider)
  .put(updateRider)
  .delete(deleteRider);

module.exports = router;
