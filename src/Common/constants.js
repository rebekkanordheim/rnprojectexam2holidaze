export const BASE_API_URL = 'https://v2.api.noroff.dev';

export const BASE_API_ENDPOINT = `${BASE_API_URL}/holidaze`;

export const VENUES_API_ENDPOINT = `${BASE_API_ENDPOINT}/venues`;

/* export const SPECIFIC_VENUE_API_ENDPOINT =`${VENUES_API_ENDPOINT}/${id}`; */

export const AUTH_ENDPOINT_REGISTER = `${BASE_API_URL}/auth/register`;

export const AUTH_ENDPOINT_LOGIN = `${BASE_API_URL}/auth/login`;

export const AUTH_ENDPOINT_CREATE_API_KEY = `${BASE_API_URL}/auth/create-api-key`;

export const USER_API_UPDATE = `${BASE_API_ENDPOINT}/profiles`;

export const USER_MADE_VENUES = `https://v2.api.noroff.dev/holidaze/profiles/{userName}/venues`;

export const VENUE_BOOKINGS_ENDPOINT = `https://v2.api.noroff.dev/holidaze/venues/{venueId}/bookings`;
