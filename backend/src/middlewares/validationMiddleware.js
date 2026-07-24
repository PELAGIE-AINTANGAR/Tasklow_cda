// const validateTask = (req, res, next) => {

//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({
//       message: "Title is required"
//     });
//   }

//   next();
// };

// module.exports = {
//   validateTask
// };


const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = handleValidationErrors;