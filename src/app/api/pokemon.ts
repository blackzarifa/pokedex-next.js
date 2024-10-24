import { PokemonListResponse, PokemonDetails } from '@/types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(
  limit: number = 20,
  offset: unknown = 0
): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Failed to fetch list');

  return response.json();
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetails> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Pokémon details');

  return response.json();
}
