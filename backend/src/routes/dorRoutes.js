const express = require("express");

const router = express.Router();

///api/dor/:taskId
const dorController = require("../controllers/dorController");

const authMiddleware = require("../middlewares/authMiddleware");

router.put("/dor/:taskId", authMiddleware, dorController.updateDoR);

module.exports = router;