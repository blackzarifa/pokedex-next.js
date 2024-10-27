import { PokemonDetails } from '@/types/pokemon';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { TYPE_COLORS } from '@/lib/constants';

export default function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="grid grid-row-1 grid-cols-3 gap-2 h-full">
        <div className="col-span-1 flex content-center justify-center p-2">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width={120}
            height={120}
          ></Image>
        </div>

        <div className="col-span-2">
          <CardHeader className="pl-2 pb-4">
            <CardTitle className="capitalize">{pokemon.name}</CardTitle>
            <CardDescription>#{pokemon.id.toString().padStart(3, '0')}</CardDescription>
          </CardHeader>

          <CardContent className="pl-2">
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map(({ type }) => (
                <Badge key={type.name} className="capitalize">
                  {type.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
