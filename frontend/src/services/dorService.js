const API_URL = "http://api.localhost/api/dor";

const getToken = () => localStorage.getItem("token");

export const updateDoR = async (taskId, dor) => {

    const response = await fetch(`${API_URL}/${taskId}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        },

        body: JSON.stringify(dor)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Erreur lors de la mise à jour du DoR.");

    }

    return data;

};