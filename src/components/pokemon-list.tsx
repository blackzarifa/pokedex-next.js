import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/app/api/pokemon';
import { Pokemon } from '@/types/pokemon';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PokemonList() {
  const t = useTranslations('Fetch');

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => fetchPokemonList(),
  });

  if (isLoading) return <h1>{t('loading')}</h1>;
  if (error)
    return (
      <h1>
        {t('error')} {error.message}
      </h1>
    );

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.results.map((pokemon: Pokemon) => (
          <Card key={pokemon.name}>
            <CardHeader>
              <CardTitle>{pokemon.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>test!</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
