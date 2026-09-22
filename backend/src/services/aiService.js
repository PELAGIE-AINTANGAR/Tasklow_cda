const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeUserStory = async (task) => {
  console.log("➡️ analyzeUserStory() appelée");

  const prompt = `
Tu es un expert en gestion de projets Agile et en User Stories.

Tu dois analyser la User Story suivante dans le contexte de l'application TaskFlow.

Titre :
${task.title || "Non renseigné"}

Description :
${task.description || "Non renseignée"}

Business Value :
${task.businessValue || "Non renseignée"}

Critères d'acceptation :
${
  Array.isArray(task.acceptanceCriteria)
    ? task.acceptanceCriteria.join("\n- ")
    : task.acceptanceCriteria || "Non renseignés"
}

Priorité :
${task.priority || "Non renseignée"}

Analyse cette User Story.

Vérifie notamment :
- si elle est claire ;
- si elle respecte le principe d'une User Story ;
- quelles informations sont manquantes ;
- quels critères d'acceptation doivent être améliorés ;
- quelles améliorations concrètes peuvent être proposées.

Retourne UNIQUEMENT un JSON valide.
Ne mets pas de Markdown.
Ne mets pas de texte avant ou après le JSON.

Le JSON doit respecter exactement cette structure :

{
  "isClear": true,
  "missingInformation": [],
  "criteriaImprovements": [],
  "suggestions": [],
  "improvedUserStory": {
    "title": "",
    "description": "",
    "businessValue": "",
    "acceptanceCriteria": []
  }
}

Règles :
- isClear doit être un booléen.
- missingInformation doit être un tableau de chaînes de caractères.
- criteriaImprovements doit être un tableau de chaînes de caractères.
- suggestions doit être un tableau de chaînes de caractères.
- improvedUserStory doit contenir un titre, une description, une business value et des critères d'acceptation.
- acceptanceCriteria doit être un tableau de chaînes de caractères.
`;

  console.log("🤖 Appel de Gemini...");

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  console.log("✅ Réponse Gemini reçue");

  const text = response.text.trim();

  console.log("📄 Réponse brute Gemini :", text);

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("❌ Impossible de parser la réponse Gemini :", error);

    throw new Error("La réponse de Gemini n'est pas un JSON valide.");
  }
};

module.exports = {
  analyzeUserStory,
};