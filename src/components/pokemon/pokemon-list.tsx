import React from 'react';
import { useTranslations } from 'next-intl';
import { useInfinitePokemonQuery } from '@/lib/hooks/use-pokemon-queries';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import PokemonCard from '@/components/pokemon/pokemon-card';

export default function PokemonList() {
  const t = useTranslations('Fetch');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfinitePokemonQuery();

  if (error)
    return (
      <h1 className="text-xl text-red-800">
        {t('error')} {error.message}
      </h1>
    );

  return (
    <div className="container flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-36">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
          : data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.pokemonWithDetails?.map((pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} />
                ))}
              </React.Fragment>
            ))}
      </div>

      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="my-6 mx-auto"
        variant={hasNextPage ? 'default' : 'secondary'}
      >
        {isFetchingNextPage ? t('loadingMore') : hasNextPage ? t('loadMore') : t('noMoreToLoad')}
      </Button>
    </div>
  );
}
