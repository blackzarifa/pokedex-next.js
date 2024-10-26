import React from 'react';
import { PokemonDetails } from '@/types/pokemon';
import { useTranslations } from 'next-intl';
import { useInfinitePokemonQuery } from '@/lib/hooks/use-pokemon-queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TYPE_COLORS } from '@/lib/constants';

export default function PokemonList() {
  const t = useTranslations('Fetch');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfinitePokemonQuery();

  const capitalizeFirst = (str: string) => {
    const fc = str.split('')[0].toUpperCase();
    return fc + str.slice(1);
  };

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
              <Card key={pokemon.name} className="grid grid-row-1 grid-cols-3 gap-2">
                <div className="col-span-1 flex content-center justify-center p-2">
                  <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    width={120}
                    height={120}
                  ></Image>
                </div>
                <div className="col-span-2">
                  <CardHeader className="pl-2">
                    <CardTitle>{capitalizeFirst(pokemon.name)}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <p>More details coming soon!</p>
                  </CardContent>
                </div>
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
