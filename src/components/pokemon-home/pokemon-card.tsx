import { PokemonDetails } from '@/types/pokemon';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';
import { PokemonTypeName } from '@/types/pokemon';
import PokemonImage from '@/components/pokemon-home/pokemon-image';
import PokemonTypeBadge from '@/components/pokemon-home/pokemon-type-badge';
import { useState } from 'react';

export default function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const mainType = pokemon.types[0].type.name as PokemonTypeName;
  const hoverShadow = `hover:shadow-${TYPE_COLORS[mainType]}/20`;

  const triggerImageAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Card
      className={cn('hover:shadow-lg hover:scale-105 transition-all', hoverShadow)}
      onMouseEnter={() => triggerImageAnimation()}
    >
      <div className="grid grid-row-1 grid-cols-3 gap-2 h-full">
        <div className="col-span-1 flex content-center justify-center p-2">
          <PokemonImage
            src={pokemon.sprites.other['official-artwork'].front_default}
            cry={pokemon.cries.latest}
            alt={`${pokemon.name} image`}
            isAnimating={isAnimating}
          />
        </div>

        <div className="col-span-2">
          <CardHeader className="pl-2 pb-4">
            <CardDescription className="font-mono">
              #{pokemon.id.toString().padStart(3, '0')}
            </CardDescription>
            <CardTitle className="capitalize">{pokemon.name}</CardTitle>
          </CardHeader>

          <CardContent className="pl-2">
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map(({ type }) => (
                <PokemonTypeBadge key={type.name} type={type.name} />
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
