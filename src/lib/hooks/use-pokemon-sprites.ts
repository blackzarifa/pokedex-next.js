import { useState } from 'react';
import { PokemonDetails } from '@/types/pokemon';
import { SpriteGroups } from '@/types/sprites';

export const usePokemonSprites = (pokemon: PokemonDetails) => {
  const [selectedSprite, setSelectedSprite] = useState<string>(
    pokemon.sprites.other['official-artwork'].front_default
  );

  const createSpriteOptions = (): SpriteGroups => {
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

  return {
    selectedSprite,
    availableGroups,
    handleSpriteChange,
  };
};
