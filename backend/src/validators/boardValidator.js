const { body } = require("express-validator");

const boardValidation = [
  body("title")
    .notEmpty()
    .withMessage("Board title is required")
    .isLength({ min: 2 })
    .withMessage("Board title is too short"),
];

module.exports = boardValidation;