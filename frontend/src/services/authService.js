const API_URL =
  "http://api.localhost/api/auth";
export const login = async (
  credentials
) => {

  const response =
    await fetch(
      `${API_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          credentials
        )
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message
    );
  }

  return data;
};

export const register = async (
  userData
) => {

  const response =
    await fetch(
      `${API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          userData
        )
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message
    );
  }

  return data;
};