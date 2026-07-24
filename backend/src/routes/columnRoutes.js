const express = require("express");

const router = express.Router();
const columnValidation = require("../validators/columnValidator");


const columnController = require("../controllers/columnController");

const authMiddleware = require("../middlewares/authMiddleware");
const handleValidationErrors = require("../middlewares/validationMiddleware");
router.get(
  "/board/:boardId",
  authMiddleware,
  columnController.getColumns
);
router.post("/",authMiddleware,columnValidation,handleValidationErrors,columnController.createColumn);


router.put("/:id", authMiddleware, columnController.updateColumn);

router.delete("/:id", authMiddleware, columnController.deleteColumn);

module.exports = router;