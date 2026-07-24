const express = require("express");

const router = express.Router();
///api/dod/:taskId
const dodController = require("../controllers/dodController");

const authMiddleware = require("../middlewares/authMiddleware");

router.put("/dod/:taskId", authMiddleware, dodController.updateDoD);

module.exports = router;