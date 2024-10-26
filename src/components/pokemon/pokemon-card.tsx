import { PokemonDetails } from '@/types/pokemon';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
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
  );
}
