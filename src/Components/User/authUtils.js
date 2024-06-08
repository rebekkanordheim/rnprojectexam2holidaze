/**
 * Checks if a user is logged in based on the presence of a JWT token in the localStorage.
 *
 * @returns {boolean} Returns true if a user is logged in, otherwise false.
 */
export function isLoggedIn() {
  return !!localStorage.getItem("jwtToken");
}
