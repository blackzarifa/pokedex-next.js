'use client';

import { usePokemonDetailsById } from '@/lib/hooks/use-pokemon-queries';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PokemonSpritesLoader from '@/components/pokemon-details/pokemon-sprites-loader';
import PokemonStats from '@/components/pokemon-details/pokemon-stats';
import PokemonDetails from '@/components/pokemon-details/pokemon-details';
import StatsColumn from '@/components/pokemon-details/stats-column';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname } from 'next/navigation';
import { PokemonTypeName } from '@/types/pokemon';
import { TYPE_COLORS } from '@/lib/constants';

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export default function PokemonPage({ params }: PokemonPageProps) {
  const pathName = usePathname();
  const pokemonId = params.id ? parseInt(params.id) : parseInt(pathName.split('/').pop() || '');
  if (isNaN(pokemonId)) notFound();

  const t = useTranslations('Fetch');
  const { data: pokemon, isLoading, error } = usePokemonDetailsById(pokemonId);

  const primaryType = pokemon?.types?.[0]?.type?.name as PokemonTypeName;
  const gradientColor = primaryType ? TYPE_COLORS[primaryType] : 'gray-400';

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
              <span className="font-mono">#{String(pokemon?.id).padStart(3, '0')}</span>
              &nbsp;- {pokemon?.name}
            </>
          )}
        </h1>
      </div>

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2">
        <PokemonSpritesLoader
          pokemon={pokemon}
          isLoading={isLoading}
          gradientColor={gradientColor}
        />

        <StatsColumn typeColor={gradientColor}>
          <PokemonStats stats={pokemon?.stats || null} isLoading={isLoading} />
          <PokemonDetails
            height={pokemon?.height || null}
            weight={pokemon?.weight || null}
            abilities={pokemon?.abilities || null}
            isLoading={isLoading}
          />
        </StatsColumn>
      </div>
    </div>
  );
}
