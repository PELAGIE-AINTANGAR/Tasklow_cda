// const authService = require('../services/authService');

// // Register a new user
// exports.register = async (req, res) => {
//   const { username, email, password } = req.body;
//     try {
//     const result = await authService.register(username, email, password);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Login a user 
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await authService.login(email, password);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   } 
// };

// module.exports = {
//   register: exports.register,
//   login: exports.login
// };    


const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {

    const result = await authService.login(
      req.body.email,
      req.body.password
    );

    res.status(200).json(result);

  } catch (error) {

    res.status(401).json({
      message: error.message
    });

  }
};

module.exports = {
  register,
  login
};