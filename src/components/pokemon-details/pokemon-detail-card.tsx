import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PokemonImage from '@/components/pokemon-home/pokemon-image';
import PokemonTypeBadge from '@/components/pokemon-home/pokemon-type-badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PokemonDetails } from '@/types/pokemon';

interface PokemonDetailCardProps {
  pokemon: PokemonDetails;
}

export default function PokemonDetailCard({ pokemon }: PokemonDetailCardProps) {
  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md aspect-square relative">
            <PokemonImage
              src={pokemon.sprites.other['official-artwork'].front_default}
              cry={pokemon.cries.latest}
              alt={pokemon.name}
              isAnimating={false}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.types.map((type) => (
              <PokemonTypeBadge key={type.type.name} type={type.type.name} />
            ))}
          </div>

          <div className="w-full max-w-xs mx-auto">
            <Select disabled defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="Select sprite version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="shiny">Shiny</SelectItem>
                <SelectItem value="artwork">Official Artwork</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
