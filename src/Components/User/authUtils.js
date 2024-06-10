/**
 * Checks if a user is authenticated based on the presence of a JWT token in the localStorage.
 *
 * @returns {boolean} Returns true if a user is authenticated, otherwise false.
 */
export function isAuthenticated() {
  return !!localStorage.getItem("jwtToken");
}
