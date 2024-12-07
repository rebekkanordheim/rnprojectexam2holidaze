/**
 * Checks if a user is authenticated based on the presence of a JWT token and an API key in the localStorage.
 *
 * @returns {boolean} Returns `true` if both the JWT token and API key are present in localStorage, indicating the user is authenticated; otherwise, returns `false`.
 */
export function isAuthenticated() {
  const jwtToken = localStorage.getItem("jwtToken");
  const apiKey = localStorage.getItem("apiKey");
  return !!(jwtToken && apiKey);
}
