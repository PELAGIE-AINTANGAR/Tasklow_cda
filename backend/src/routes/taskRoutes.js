const express = require("express");

const router = express.Router();

const taskController =
  require("../controllers/taskController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const taskValidation =
  require("../validators/taskValidator");

const handleValidationErrors =
  require("../middlewares/validationMiddleware");

router.get(
  "/",
  authMiddleware,
  taskController.getTasks
);

router.post(
  "/",
  authMiddleware,
  taskValidation,
  handleValidationErrors,
  taskController.createTask
);

router.put(
  "/:id",
  authMiddleware,
  taskController.updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  taskController.deleteTask
);

module.exports = router;