export const BASE_API_URL = "https://v2.api.noroff.dev";
export const BASE_API_ENDPOINT = `${BASE_API_URL}/holidaze`;
export const VENUES_API_ENDPOINT = `${BASE_API_ENDPOINT}/venues`;

// Authentication endpoints
export const AUTH_ENDPOINT_REGISTER = `${BASE_API_URL}/auth/register`;
export const AUTH_ENDPOINT_LOGIN = `${BASE_API_URL}/auth/login`;
export const AUTH_ENDPOINT_CREATE_API_KEY = `${BASE_API_URL}/auth/create-api-key`;

// User profile endpoints
export const USER_API_UPDATE = `${BASE_API_ENDPOINT}/profiles`;
export const USER_BOOKINGS_ENDPOINT = `${BASE_API_ENDPOINT}/profiles/{userName}/bookings`;
export const USER_MADE_VENUES = `${BASE_API_ENDPOINT}/profiles/{userName}/venues`;
export const VENUE_BOOKINGS_ENDPOINT = `${BASE_API_ENDPOINT}/venues/{venueId}/bookings`;

