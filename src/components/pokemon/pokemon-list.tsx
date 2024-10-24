import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/app/api/pokemon';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PokemonList() {
  const t = useTranslations('Fetch');
  const PAGE_SIZE = 20;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery<PokemonListResponse, Error>({
      queryKey: ['infinitePokemon'],
      queryFn: ({ pageParam = 0 }) => fetchPokemonList(PAGE_SIZE, pageParam),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) return pages.length * PAGE_SIZE;
        return undefined;
      },
      initialPageParam: 0,
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
