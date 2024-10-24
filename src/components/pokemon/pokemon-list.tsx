import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonDetails } from '@/app/api/pokemon';
import { Pokemon, PokemonListResponse, PokemonDetails } from '@/types/pokemon';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TYPE_COLORS } from '@/lib/constants';

export default function PokemonList() {
  const queryClient = useQueryClient();
  const t = useTranslations('Fetch');
  const PAGE_SIZE = 20;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery<PokemonListResponse, Error>({
      queryKey: ['infinitePokemon'],
      queryFn: async ({ pageParam = 0 }) => {
        const list = await fetchPokemonList(PAGE_SIZE, pageParam);

        const pokemonWithDetails = await Promise.all(
          list.results.map(async (pokemon) => {
            const cacheKey = ['pokemon', 'details', pokemon.url];
            const cachedData = queryClient.getQueryData<PokemonDetails>(cacheKey);
            if (cachedData) return cachedData;

            const details = await fetchPokemonDetails(pokemon.url);

            queryClient.setQueryData(cacheKey, details, {
              staleTime: 1000 * 60 * 60 * 24,
              gcTime: 1000 * 60 * 60 * 24 * 7,
            });

            return details;
          })
        );
        return { ...list, pokemonWithDetails };
      },
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) return pages.length * PAGE_SIZE;
        return undefined;
      },
      initialPageParam: 0,
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24,
    });

  if (isLoading) return <h1>{t('loading')}</h1>;
  if (error)
    return (
      <h1>
        {t('error')} {error.message}
      </h1>
    );

  return (
    <div className="container flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.results.map((pokemon: Pokemon) => (
              <Card key={pokemon.name}>
                <CardHeader>
                  <CardTitle>{pokemon.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>More details coming soon!</p>
                </CardContent>
              </Card>
            ))}
          </React.Fragment>
        ))}
      </div>

      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="my-6 mx-auto disabled:bg-gray-300 disabled:text-gray-600"
      >
        {isFetchingNextPage ? t('loadingMore') : hasNextPage ? t('loadMore') : t('noMoreToLoad')}
      </Button>
    </div>
  );
}
