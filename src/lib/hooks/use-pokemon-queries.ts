import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonByName,
  fetchPokemonById,
} from '@/app/api/pokemon';
import type { PokemonListResponse, PokemonDetails } from '@/types/pokemon';

const PAGE_SIZE = 20;

const LIST_CACHE_TIME = {
  staleTime: 1000 * 60 * 60, // 1 hour
  gcTime: 1000 * 60 * 60 * 24, // 24 hours
};

const DETAILS_CACHE_TIME = {
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
  gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
};

export const useInfinitePokemonQuery = (search?: string) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ['infinitePokemon', search],
    queryFn: async ({ pageParam = 0 }) => {
      if (search) {
        try {
          const pokemon = await fetchPokemonByName(search);
          return {
            count: 1,
            next: null,
            previous: null,
            results: [],
            pokemonWithDetails: [pokemon],
          };
        } catch {
          return {
            count: 0,
            next: null,
            previous: null,
            results: [],
            pokemonWithDetails: [],
          };
        }
      }

      const list = await fetchPokemonList(PAGE_SIZE, pageParam);

      const pokemonWithDetails = await Promise.all(
        list.results.map(async (pokemon) => {
          const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
          if (!pokemonId) return null;

          const cacheKey = ['pokemon', 'details', pokemonId];
          const cachedData = queryClient.getQueryData<PokemonDetails>(cacheKey);
          if (cachedData) return cachedData;

          try {
            const details = await fetchPokemonDetails(pokemon.url);
            queryClient.setQueryData(cacheKey, details);

            return details;
          } catch (error) {
            console.error(`Failed to fetch details for Pokemon ${pokemonId}:`, error);
            return null;
          }
        })
      );

      return {
        ...list,
        pokemonWithDetails: pokemonWithDetails.filter(Boolean) as PokemonDetails[],
      };
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) return pages.length * PAGE_SIZE;
      return undefined;
    },
    initialPageParam: 0,
    ...LIST_CACHE_TIME,
  });
};

export const usePokemonDetails = (url: string) => {
  const pokemonId = url.split('/').filter(Boolean).pop();

  return useQuery<PokemonDetails, Error>({
    queryKey: ['pokemon', 'details', pokemonId],
    queryFn: () => fetchPokemonDetails(url),
    ...DETAILS_CACHE_TIME,
  });
};

export const usePokemonDetailsById = (pokemonId: number) => {
  return useQuery<PokemonDetails, Error>({
    queryKey: ['pokemon', 'details', pokemonId],
    queryFn: () => fetchPokemonById(pokemonId),
    ...DETAILS_CACHE_TIME,
  });
};
