export function isLoggedIn() {
    return !!localStorage.getItem('jwtToken');
}