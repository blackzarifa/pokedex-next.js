import { PokemonListResponse, PokemonDetails } from '@/types/pokemon';
import Bottleneck from 'bottleneck';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const limiter = new Bottleneck({
  minTime: 600,
  maxConcurrent: 1,
});

export async function fetchPokemonList(
  limit: number = 20,
  offset: unknown = 0
): Promise<PokemonListResponse> {
  const response = await limiter.schedule(() =>
    fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  );
  if (!response.ok) throw new Error('Failed to fetch list');
  return response.json();
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetails> {
  const response = await limiter.schedule(() => fetch(url));
  if (!response.ok) throw new Error('Failed to fetch Pokémon details');
  return response.json();
}
