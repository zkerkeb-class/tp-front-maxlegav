export const API_BASE_URL = 'http://localhost:3000';

export const endpoints = {
  pokemons: `${API_BASE_URL}/pokemons`,
  pokemon: (id) => `${API_BASE_URL}/pokemons/${id}`,
  search: (name) => `${API_BASE_URL}/pokemons/search?name=${encodeURIComponent(name)}`,
};
