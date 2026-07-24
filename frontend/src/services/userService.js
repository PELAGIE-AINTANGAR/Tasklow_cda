const API_URL =
  "http://api.localhost/api/users";


const getToken = () => {

  return localStorage.getItem("token");

};



export const getCurrentUser = async () => {

  const response = await fetch(

    `${API_URL}/me`,

    {

      headers: {

        Authorization:
          `Bearer ${getToken()}`

      }

    }

  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.message
    );

  }


  return data;

};



export const updateEmail = async (
  email
) => {

  const response = await fetch(

    `${API_URL}/me`,

    {

      method: "PUT",

      headers: {

        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${getToken()}`

      },

      body: JSON.stringify({

        email

      })

    }

  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.message
    );

  }


  return data;

};



export const updatePassword = async (

  currentPassword,

  newPassword

) => {

  const response = await fetch(

    `${API_URL}/me/password`,

    {

      method: "PUT",

      headers: {

        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${getToken()}`

      },

      body: JSON.stringify({

        currentPassword,

        newPassword

      })

    }

  );


  const data = await response.json();


  if (!response.ok) {

    throw new Error(
      data.message
    );

  }


  return data;

};