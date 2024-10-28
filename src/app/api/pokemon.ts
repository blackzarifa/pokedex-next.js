import { PokemonListResponse, PokemonDetails } from '@/types/pokemon';
import Bottleneck from 'bottleneck';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const limiter = new Bottleneck({
  reservoir: 100,
  reservoirRefreshAmount: 100,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 10,
});
limiter.on('failed', async (error, jobInfo) => {
  console.warn(`Job ${jobInfo.options.id} failed: ${error}`);
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

export async function fetchPokemonById(pokemonId: number): Promise<PokemonDetails> {
  const url = `${API_BASE_URL}/pokemon/${pokemonId}`;
  const response = await limiter.schedule(() => fetch(url));
  if (!response.ok) throw new Error('Failed to fetch Pokémon details');
  return response.json();
}

export async function fetchPokemonByName(name: string): Promise<PokemonDetails> {
  const response = await limiter.schedule(() =>
    fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`)
  );
  if (!response.ok) throw new Error('Pokemon not found');
  return response.json();
}
