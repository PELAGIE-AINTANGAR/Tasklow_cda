const API_URL = "http://api.localhost/api/dod";

const getToken = () => localStorage.getItem("token");

export const updateDoD = async (taskId, dod) => {

    const response = await fetch(`${API_URL}/${taskId}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        },

        body: JSON.stringify(dod)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Erreur lors de la mise à jour du DoD.");

    }

    return data;

};