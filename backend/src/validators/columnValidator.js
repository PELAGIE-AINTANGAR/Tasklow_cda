const { body } = require("express-validator");

const columnValidation = [
  body("title")
    .notEmpty()
    .withMessage("Column title is required"),

  body("position")
    .isInt()
    .withMessage("Position must be a number"),

  body("boardId")
    .isInt()
    .withMessage("Board ID must be a number"),
];

module.exports = columnValidation;