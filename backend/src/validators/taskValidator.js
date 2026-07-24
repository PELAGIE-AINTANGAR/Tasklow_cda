const { body } = require("express-validator");

const taskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 2 })
    .withMessage("Task title is too short"),

  body("description")
    .optional()
    .isString(),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isString()
    .withMessage("Invalid status"),

  body("columnId")
    .isInt()
    .withMessage("Column ID must be a number"),
];

module.exports = taskValidation;