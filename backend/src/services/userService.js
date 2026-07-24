const prisma = require("../config/prisma");

const bcrypt = require("bcrypt");


const getUserById = async (userId) => {

  const user = await prisma.user.findUnique({

    where: {
      id: userId
    },

    select: {

      id: true,

      username: true,

      email: true

    }

  });


  if (!user) {

    throw new Error(
      "Utilisateur introuvable"
    );

  }


  return user;

};



const updateUserEmail = async (
  userId,
  email
) => {

  const existingUser =
    await prisma.user.findUnique({

      where: {
        email: email
      }

    });


  if (
    existingUser &&
    existingUser.id !== userId
  ) {

    throw new Error(
      "Cet email est déjà utilisé"
    );

  }


  const user = await prisma.user.update({

    where: {
      id: userId
    },

    data: {
      email: email
    },

    select: {

      id: true,

      username: true,

      email: true

    }

  });


  return user;

};



const updateUserPassword = async (
  userId,
  currentPassword,
  newPassword
) => {

  const user = await prisma.user.findUnique({

    where: {
      id: userId
    }

  });


  if (!user) {

    throw new Error(
      "Utilisateur introuvable"
    );

  }


  const passwordIsValid =
    await bcrypt.compare(

      currentPassword,

      user.password

    );


  if (!passwordIsValid) {

    throw new Error(
      "Mot de passe actuel incorrect"
    );

  }


  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );


  await prisma.user.update({

    where: {
      id: userId
    },

    data: {

      password: hashedPassword

    }

  });


  return {

    message:
      "Mot de passe modifié avec succès"

  };

};



module.exports = {

  getUserById,

  updateUserEmail,

  updateUserPassword

};