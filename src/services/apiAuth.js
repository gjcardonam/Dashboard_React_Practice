import axios from "axios";

axios.defaults.withCredentials = true;

export async function login({ username, password }) {

  const apiUrl = "http://localhost:8080/api/auth/signin";

  try {
    const response = await axios({
      method: "post",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        password
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const apiUrl = "http://localhost:8080/api/auth/me";

  try {
    const response = await axios({
      method: "get",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function logout() {
  const apiUrl = "http://localhost:8080/api/auth/signout";

  try {
    const response = await axios({
      method: "post",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function createUser({ email, password, fullName: username }) {
  const apiUrl = "http://localhost:8080/api/auth/signup";

  try {
    const response = await axios({
      method: "post",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        email,
        password
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}