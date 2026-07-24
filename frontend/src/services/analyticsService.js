const API_URL = "http://api.localhost/api/analytics";

export const getAnalytics = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Analytics API error :",
      errorText
    );

    throw new Error(
      `Erreur analytics : ${response.status}`
    );
  }

  return response.json();
};