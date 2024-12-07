// Base API URL
/**
 * Base URL for the API used across the application.
 * @constant {string}
 */
export const BASE_API_URL = "https://v2.api.noroff.dev";

// Base endpoint for Holidaze API
/**
 * Base endpoint for the Holidaze API.
 * @constant {string}
 */
export const BASE_API_ENDPOINT = `${BASE_API_URL}/holidaze`;

// Endpoint for venues
/**
 * API endpoint for accessing venue data.
 * @constant {string}
 */
export const VENUES_API_ENDPOINT = `${BASE_API_ENDPOINT}/venues`;

// Authentication endpoints

/**
 * API endpoint for user registration.
 * @constant {string}
 */
export const AUTH_ENDPOINT_REGISTER = `${BASE_API_URL}/auth/register`;

/**
 * API endpoint for user login.
 * @constant {string}
 */
export const AUTH_ENDPOINT_LOGIN = `${BASE_API_URL}/auth/login`;

/**
 * API endpoint for creating a new API key for authentication.
 * @constant {string}
 */
export const AUTH_ENDPOINT_CREATE_API_KEY = `${BASE_API_URL}/auth/create-api-key`;

// User profile endpoints

/**
 * API endpoint for updating user profile information.
 * @constant {string}
 */
export const USER_API_UPDATE = `${BASE_API_ENDPOINT}/profiles`;

/**
 * API endpoint for retrieving bookings made by a specific user.
 * @constant {string}
 * @param {string} userName - The username of the user whose bookings are being fetched.
 */
export const USER_BOOKINGS_ENDPOINT = `${BASE_API_ENDPOINT}/profiles/{userName}/bookings`;

/**
 * API endpoint for retrieving venues owned by a specific user.
 * @constant {string}
 * @param {string} userName - The username of the user whose venues are being fetched.
 */
export const USER_MADE_VENUES = `${BASE_API_ENDPOINT}/profiles/{userName}/venues`;

/**
 * API endpoint for retrieving bookings for a specific venue.
 * @constant {string}
 * @param {string} venueId - The ID of the venue whose bookings are being fetched.
 */
export const VENUE_BOOKINGS_ENDPOINT = `${BASE_API_ENDPOINT}/venues/{venueId}/bookings`;
