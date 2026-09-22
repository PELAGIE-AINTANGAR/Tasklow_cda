const API_URL = "http://localhost:5000/api";

export const analyzeUserStory = async (task) => {
  const response = await fetch(`${API_URL}/ai/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      businessValue: task.businessValue,
      acceptanceCriteria: task.acceptanceCriteria,
      priority: task.priority,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Erreur lors de l'analyse IA"
    );
  }

  return data.result;
};