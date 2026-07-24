const API_URL = "http://api.localhost/api/columns";

const getToken = () =>
  localStorage.getItem("token");

export const createColumn = async (column) => {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${getToken()}`

    },
    
    body: JSON.stringify(column)

  });
    alert("Status colonne : " + response.status);

   const data = await response.json();
    alert(JSON.stringify(data));

  if (!response.ok) {

    throw new Error(data.message);

  }

  return data;

};

export const updateColumn = async (id, column) => {

  const response = await fetch(`${API_URL}/${id}`, {

    method: "PUT",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${getToken()}`

    },

    body: JSON.stringify(column)

  });

  return response.json();

};

export const deleteColumn = async (id) => {

  const response = await fetch(`${API_URL}/${id}`, {

    method: "DELETE",

    headers: {

      Authorization: `Bearer ${getToken()}`

    }

  });

  return response.json();

};