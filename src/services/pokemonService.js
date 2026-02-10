import { endpoints } from '../config/api';

export const pokemonService = {
  async getPokemons(page = 1, limit = 20) {
    const response = await fetch(`${endpoints.pokemons}?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch pokemons');
    return response.json();
  },

  async getPokemonById(id) {
    const response = await fetch(endpoints.pokemon(id));
    if (!response.ok) throw new Error('Pokemon not found');
    return response.json();
  },

  async searchPokemons(name) {
    const response = await fetch(endpoints.search(name));
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  async createPokemon(pokemonData) {
    const response = await fetch(endpoints.pokemons, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemonData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create pokemon');
    }
    return response.json();
  },

  async updatePokemon(id, pokemonData) {
    const response = await fetch(endpoints.pokemon(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemonData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update pokemon');
    }
    return response.json();
  },

  async deletePokemon(id) {
    const response = await fetch(endpoints.pokemon(id), {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete pokemon');
    return response.json();
  },
};
