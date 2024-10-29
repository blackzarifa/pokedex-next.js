'use client';

import { usePokemonDetailsById } from '@/lib/hooks/use-pokemon-queries';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PokemonSprites from '@/components/pokemon-details/pokemon-sprites';
import PokemonStats from '@/components/pokemon-details/pokemon-stats';
import PokemonDetails from '@/components/pokemon-details/pokemon-details';
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
        {isLoading ? <Skeleton className="h-96 w-full" /> : <PokemonSprites pokemon={pokemon} />}

        <div className="space-y-6">
          <PokemonStats stats={pokemon?.stats || null} isLoading={isLoading} />

          <PokemonDetails
            height={pokemon?.height || null}
            weight={pokemon?.weight || null}
            abilities={pokemon?.abilities || null}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
