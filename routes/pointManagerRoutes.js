// routes/pointManagerRoutes.js

const express = require('express');
const router = express.Router();
const { getPointManagers, getPointManager, createPointManager, updatePointManager, deletePointManager } = require("../controllers/PointManagerController");

router.route("/pointmanagers")
  .get(getPointManagers)
  .post(createPointManager);

router.route("/pointmanagers/:id")
  .get(getPointManager)
  .put(updatePointManager)
  .delete(deletePointManager);

module.exports = router;
