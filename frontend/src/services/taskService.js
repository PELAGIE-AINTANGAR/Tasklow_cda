const API_URL = "http://api.localhost/api/tasks";

const getToken = () => localStorage.getItem("token");

export const getTasks = async () => {

    const response = await fetch(API_URL, {

        headers: {

            Authorization: `Bearer ${getToken()}`

        }

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message);

    }

    return data;

};

export const createTask = async (task) => {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        },

        body: JSON.stringify(task)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Erreur lors de la création.");

    }

    return data;

};

export const updateTask = async (id, task) => {

    const response = await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        },

        body: JSON.stringify(task)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Erreur lors de la mise à jour.");

    }

    return data;

};

export const deleteTask = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${getToken()}`

        }

    });

    if (response.status === 204) {

        return;

    }

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Erreur lors de la suppression.");

    }

    return data;

};