import React from 'react';
import { PokemonDetails } from '@/types/pokemon';
import { useTranslations } from 'next-intl';
import { useInfinitePokemonQuery } from '@/lib/hooks/use-pokemon-queries';
import { Button } from '@/components/ui/button';
import PokemonCard from '@/components/pokemon/pokemon-card';

export default function PokemonList() {
  const t = useTranslations('Fetch');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfinitePokemonQuery();

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
            {page.pokemonWithDetails?.map((pokemon: PokemonDetails) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
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
