import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PokemonImage from '@/components/pokemon-home/pokemon-image';
import PokemonTypeBadge from '@/components/pokemon-home/pokemon-type-badge';
import SpriteSelector from '@/components/pokemon-details/sprite-selector';
import { usePokemonSprites } from '@/lib/hooks/use-pokemon-sprites';
import { PokemonDetails } from '@/types/pokemon';

interface PokemonSpritesProps {
  pokemon: PokemonDetails;
}

export default function PokemonSprites({ pokemon }: PokemonSpritesProps) {
  const { selectedSprite, availableGroups, handleSpriteChange } = usePokemonSprites(pokemon);

  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md aspect-square relative">
            <PokemonImage
              src={selectedSprite}
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

          <SpriteSelector availableGroups={availableGroups} onSpriteChange={handleSpriteChange} />
        </div>
      </CardContent>
    </Card>
  );
}
