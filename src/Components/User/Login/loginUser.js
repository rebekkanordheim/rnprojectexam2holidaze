import { AUTH_ENDPOINT_LOGIN } from "../../../Common/constants";

/**
 * Sends a login request to the authentication endpoint.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} A promise that resolves with the login response data.
 * @throws {Error} If the login fails.
 */
export async function loginUser(email, password) {
  const loginUrl = AUTH_ENDPOINT_LOGIN;

  try {
    const loginData = {
      email: email,
      password: password,
    };

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    const response = await fetch(loginUrl, postData);

    if (response.ok) {
      const data = await response.json();
      const token = data.data.accessToken;
      const userName = data.data.name;
      const imageUrl = data.data.avatar.url;

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("imageUrl", imageUrl);

      console.log("Login successful. JWT token, user name, and image URL stored.");
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed. Please try again.");
    }
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
}
