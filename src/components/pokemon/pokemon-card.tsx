import { PokemonDetails } from '@/types/pokemon';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TYPE_COLORS } from '@/lib/constants';
import { PokemonTypeName } from '@/types/pokemon';
import PokemonTypeBadge from '@/components/pokemon/pokemon-type-badge';
import Image from 'next/image';

export default function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  const mainType = pokemon.types[0].type.name as PokemonTypeName;
  const hoverShadow = `hover:shadow-${TYPE_COLORS[mainType]}/20`;

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', hoverShadow)}>
      <div className="grid grid-row-1 grid-cols-3 gap-2 h-full">
        <div className="col-span-1 flex content-center justify-center p-2">
          <div className="col-span-1 relative aspect-square">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              priority={true}
              className="object-contain p-3"
            />
          </div>
        </div>

        <div className="col-span-2">
          <CardHeader className="pl-2 pb-4">
            <CardTitle className="capitalize">{pokemon.name}</CardTitle>
            <CardDescription>#{pokemon.id.toString().padStart(3, '0')}</CardDescription>
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
