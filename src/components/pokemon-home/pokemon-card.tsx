import { PokemonDetails } from '@/types/pokemon';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';
import { PokemonTypeName } from '@/types/pokemon';
import PokemonTypeBadge from '@/components/pokemon-home/pokemon-type-badge';
import Image from 'next/image';
import { useState } from 'react';

export default function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  const [isImageAnimating, setIsImageAnimating] = useState(false);

  const mainType = pokemon.types[0].type.name as PokemonTypeName;
  const hoverShadow = `hover:shadow-${TYPE_COLORS[mainType]}/20`;

  const triggerImageAnimation = () => {
    setIsImageAnimating(true);
    setTimeout(() => setIsImageAnimating(false), 600);
  };

  return (
    <Card
      className={cn('hover:shadow-lg hover:scale-105 transition-all', hoverShadow)}
      onMouseEnter={() => triggerImageAnimation()}
    >
      <div className="grid grid-row-1 grid-cols-3 gap-2 h-full">
        <div className="col-span-1 flex content-center justify-center p-2">
          <div className="col-span-1 relative aspect-square">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              priority={true}
              className={cn(
                'object-contain p-3 transition-transform',
                isImageAnimating && 'scale-up-down'
              )}
              onMouseEnter={triggerImageAnimation}
            />
          </div>
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
