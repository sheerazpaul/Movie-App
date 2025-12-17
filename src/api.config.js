
 const API_BASE_URL = import.meta.env.VITE_API_KEY;
export const GET_MOVIES_LIST = `${API_BASE_URL}/list_movies.json`;
export const GET_MOVIES_DETAIL = `${API_BASE_URL}/movie_details.json`;
export const GET_SIMILAR_MOVIES = `${API_BASE_URL}/movie_suggestions.json`;
