const analyticService = require(
  "../services/analyticService"
);


const getAnalytics = async (req, res) => {

  try {

    const userId = req.user.id;


    const analytic =
      await analyticService
        .getAnalyticsByUser(userId);


    return res.status(200).json(
      analytic
    );


  } catch (error) {

    console.error(
      "Analytic controller error :",
      error
    );


    return res.status(500).json({

      message:
        "Erreur lors du chargement des analytics"

    });

  }

};


module.exports = {

  getAnalytics

};