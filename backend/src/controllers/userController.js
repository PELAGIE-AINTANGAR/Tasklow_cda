const userService = require(
  "../services/userService"
);


const getCurrentUser = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;


    const user =
      await userService.getUserById(
        userId
      );


    return res.status(200).json(
      user
    );


  } catch (error) {

    console.error(
      "Get user error :",
      error
    );


    return res.status(500).json({

      message: error.message

    });

  }

};



const updateEmail = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;

    const {
      email
    } = req.body;


    if (!email) {

      return res.status(400).json({

        message:
          "L'email est obligatoire"

      });

    }


    const user =
      await userService.updateUserEmail(

        userId,

        email

      );


    return res.status(200).json(
      user
    );


  } catch (error) {

    console.error(
      "Update email error :",
      error
    );


    return res.status(400).json({

      message: error.message

    });

  }

};



const updatePassword = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;


    const {

      currentPassword,

      newPassword

    } = req.body;


    if (
      !currentPassword ||
      !newPassword
    ) {

      return res.status(400).json({

        message:
          "Tous les champs sont obligatoires"

      });

    }


    if (newPassword.length < 8) {

      return res.status(400).json({

        message:
          "Le nouveau mot de passe doit contenir au moins 8 caractères"

      });

    }


    const result =
      await userService.updateUserPassword(

        userId,

        currentPassword,

        newPassword

      );


    return res.status(200).json(
      result
    );


  } catch (error) {

    console.error(
      "Update password error :",
      error
    );


    return res.status(400).json({

      message: error.message

    });

  }

};



module.exports = {

  getCurrentUser,

  updateEmail,

  updatePassword

};