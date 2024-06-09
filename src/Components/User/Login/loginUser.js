import {
  AUTH_ENDPOINT_LOGIN,
  AUTH_ENDPOINT_CREATE_API_KEY,
} from "../../../Common/constants";

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
  const createApiKeyUrl = AUTH_ENDPOINT_CREATE_API_KEY;

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

      // Store JWT token, user name, and image URL
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("imageUrl", imageUrl);

      // Generate and store API key
      await generateAndStoreApiKey(token, createApiKeyUrl);

      console.log(
        "Login successful. JWT token, user name, image URL, and API key stored."
      );
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed. Please try again.");
    }
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
}

/**
 * Generates and stores an API key using the provided JWT token.
 *
 * @param {string} jwtToken - The JWT token of the user.
 * @param {string} createApiKeyUrl - The URL for creating an API key.
 */
async function generateAndStoreApiKey(jwtToken, createApiKeyUrl) {
  try {
    const response = await fetch(createApiKeyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        name: "My API Key",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create API key");
    }

    const data = await response.json();
    const apiKey = data.data.key;

    // Store API key
    localStorage.setItem("apiKey", apiKey);

    console.log("API key generated and stored.");
  } catch (error) {
    console.error("Error generating API key:", error);
  }
}
