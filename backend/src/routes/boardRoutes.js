const express = require("express");

const router = express.Router();
const boardValidation = require("../validators/boardValidator");

const boardController = require("../controllers/boardController");

const authMiddleware = require("../middlewares/authMiddleware");

const handleValidationErrors =
  require("../middlewares/validationMiddleware");

router.get("/", authMiddleware, boardController.getBoards);

router.post("/",authMiddleware,boardValidation,handleValidationErrors,boardController.createBoard);

// router.post("/", authMiddleware, boardController.createBoard);

router.put("/:id", authMiddleware, boardController.updateBoard);

router.delete("/:id", authMiddleware, boardController.deleteBoard);

module.exports = router;