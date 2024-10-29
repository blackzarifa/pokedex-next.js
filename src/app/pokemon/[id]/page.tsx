'use client';

import { usePokemonDetailsById } from '@/lib/hooks/use-pokemon-queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PokemonDetailCard from '@/components/pokemon-details/pokemon-detail-card';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export default function PokemonPage({ params }: PokemonPageProps) {
  const pokemonId = parseInt(params.id);
  if (isNaN(pokemonId)) notFound();

  const t = useTranslations('Fetch');
  const { data: pokemon, isLoading, error } = usePokemonDetailsById(pokemonId);

  if (!isLoading && (error || !pokemon)) {
    return (
      <div className="text-center">
        <p className="text-red-500">
          {t('error')} {error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="container flex items-center gap-4">
        <Link href="/pokemon">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-4xl font-bold capitalize">
          {isLoading ? (
            <Skeleton className="h-10 w-72" />
          ) : (
            <>
              <span className="font-mono">#{String(pokemon.id).padStart(3, '0')}</span>
              &nbsp;- {pokemon.name}
            </>
          )}
        </h1>
      </div>

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2">
        {isLoading ? <Skeleton className="h-96 w-full" /> : <PokemonDetailCard pokemon={pokemon} />}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{isLoading ? <Skeleton className="h-6 w-32" /> : 'Base Stats'}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              ) : (
                pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isLoading ? <Skeleton className="h-6 w-32" /> : 'Details'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold">Height</h3>
                    <p>{(pokemon.height / 10).toFixed(1)}m</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Weight</h3>
                    <p>{(pokemon.weight / 10).toFixed(1)}kg</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Abilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.abilities.map((ability) => (
                        <span
                          key={ability.ability.name}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize"
                        >
                          {ability.ability.name.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
