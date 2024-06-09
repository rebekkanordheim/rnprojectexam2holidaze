import { AUTH_ENDPOINT_REGISTER } from "../../../Common/constants";

/**
 * Registers a new user with the provided form data.
 *
 * @param {Object} formData - The user registration form data.
 * @param {string} formData.name - The user's name.
 * @param {string} formData.email - The user's email.
 * @param {string} formData.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the registration data.
 * @throws {Error} If registration fails.
 */
export async function registerUser(formData) {
  const registerUrl = AUTH_ENDPOINT_REGISTER;

  try {
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(registerUrl, postData);

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("userName", formData.name);

      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
}
