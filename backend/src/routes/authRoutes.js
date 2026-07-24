const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const handleValidationErrors =
  require("../middlewares/validationMiddleware");

router.post( "/register",registerValidation,handleValidationErrors,authController.register);

router.post("/login",loginValidation,handleValidationErrors,authController.login);

//router.post("/register", authController.register);

//router.post("/login", authController.login);

module.exports = router;