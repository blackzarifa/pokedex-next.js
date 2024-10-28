import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PokemonImage from '@/components/pokemon-home/pokemon-image';
import PokemonTypeBadge from '@/components/pokemon-home/pokemon-type-badge';
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PokemonDetails } from '@/types/pokemon';

interface PokemonDetailCardProps {
  pokemon: PokemonDetails;
}

type SpriteOption = {
  value: string;
  label: string;
  src: string | null;
};

export default function PokemonDetailCard({ pokemon }: PokemonDetailCardProps) {
  const [selectedSprite, setSelectedSprite] = useState<string>(
    pokemon.sprites.other['official-artwork'].front_default
  );

  const createSpriteOptions = (): { [key: string]: SpriteOption[] } => {
    const sprites = pokemon.sprites;

    return {
      'Official Artwork': [
        {
          value: 'official-default',
          label: 'Default',
          src: sprites.other['official-artwork'].front_default,
        },
        {
          value: 'official-shiny',
          label: 'Shiny',
          src: sprites.other['official-artwork'].front_shiny,
        },
      ].filter((option) => option.src !== null),
      'Front View': [
        {
          value: 'front-default',
          label: 'Default',
          src: sprites.front_default,
        },
        {
          value: 'front-shiny',
          label: 'Shiny',
          src: sprites.front_shiny,
        },
        {
          value: 'front-female',
          label: 'Female',
          src: sprites.front_female,
        },
        {
          value: 'front-shiny-female',
          label: 'Shiny Female',
          src: sprites.front_shiny_female,
        },
      ].filter((option) => option.src !== null),
      'Back View': [
        {
          value: 'back-default',
          label: 'Default',
          src: sprites.back_default,
        },
        {
          value: 'back-shiny',
          label: 'Shiny',
          src: sprites.back_shiny,
        },
        {
          value: 'back-female',
          label: 'Female',
          src: sprites.back_female,
        },
        {
          value: 'back-shiny-female',
          label: 'Shiny Female',
          src: sprites.back_shiny_female,
        },
      ].filter((option) => option.src !== null),
    };
  };

  const spriteOptions = createSpriteOptions();

  const availableGroups = Object.entries(spriteOptions).filter(
    ([_, options]) => options.length > 0
  );

  const handleSpriteChange = (value: string) => {
    for (const [_, options] of Object.entries(spriteOptions)) {
      const option = options.find((opt) => opt.value === value);
      if (option?.src) {
        setSelectedSprite(option.src);
        break;
      }
    }
  };

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

          <div className="w-full max-w-xs mx-auto">
            <Select defaultValue="official-default" onValueChange={handleSpriteChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select sprite version" />
              </SelectTrigger>
              <SelectContent>
                {availableGroups.map(([groupName, options]) => (
                  <SelectGroup key={groupName}>
                    <SelectLabel className="font-semibold">{groupName}</SelectLabel>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
