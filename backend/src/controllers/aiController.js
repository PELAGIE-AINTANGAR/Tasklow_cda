const aiService = require("../services/aiService");

const analyzeTask = async (req, res) => {
  try {
    const result = await aiService.analyzeUserStory(req.body);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
  console.error("❌ ERREUR IA :", error);
    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "Le service IA est temporairement indisponible. Veuillez réessayer dans quelques instants.",
      });
    }

  res.status(500).json({
    success: false,
    message: "Erreur lors de l'analyse IA",
    error: error.message,
  });
}
};

module.exports = {
  analyzeTask,
};