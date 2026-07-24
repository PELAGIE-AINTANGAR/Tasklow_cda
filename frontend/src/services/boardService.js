const API_URL = "http://api.localhost/api/boards";

const getToken = () =>
  localStorage.getItem("token");

export const getBoards = async () => {

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

export const createBoard = async (board) => {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${getToken()}`

    },

    body: JSON.stringify({

      title: board.title,

      description: board.description,

      startDate: board.startDate,

      endDate: board.endDate
    })

  });
  alert("Statuspepe : " + response.status);

  const data = await response.json();
  alert(JSON.stringify(data));

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
  
};

export const updateBoard = async (id, board) => {

  const response = await fetch(`${API_URL}/${id}`, {

    method: "PUT",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${getToken()}`

    },

    body: JSON.stringify({

      title: board.title,

      description: board.description,

      startDate: board.startDate,

      endDate: board.endDate

    })

  });

  return response.json();

};

export const deleteBoard = async (id) => {

  const response = await fetch(`${API_URL}/${id}`, {

    method: "DELETE",

    headers: {

      Authorization: `Bearer ${getToken()}`

    }

  });

  return response.json();

};