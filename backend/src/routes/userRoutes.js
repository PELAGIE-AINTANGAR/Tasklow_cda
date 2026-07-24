const express = require("express");

const router = express.Router();


const {

  getCurrentUser,

  updateEmail,

  updatePassword

} = require(
  "../controllers/userController"
);


const authMiddleware = require(
  "../middlewares/authMiddleware"
);



router.get(

  "/me",

  authMiddleware,

  getCurrentUser

);



router.put(

  "/me",

  authMiddleware,

  updateEmail

);



router.put(

  "/me/password",

  authMiddleware,

  updatePassword

);



module.exports = router;