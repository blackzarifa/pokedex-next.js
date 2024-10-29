import { useState } from 'react';
import { PokemonDetails } from '@/types/pokemon';
import { SpriteGroups } from '@/types/sprites';
import { useTranslations } from 'next-intl';

export const usePokemonSprites = (pokemon: PokemonDetails) => {
  const t = useTranslations('Sprites');
  const [selectedSprite, setSelectedSprite] = useState<string>(
    pokemon.sprites.other['official-artwork'].front_default
  );

  const createSpriteOptions = (): SpriteGroups => {
    const sprites = pokemon.sprites;

    return {
      [t('official-artwork')]: [
        {
          value: 'official-default',
          label: t('default'),
          src: sprites.other['official-artwork'].front_default,
        },
        {
          value: 'official-shiny',
          label: t('shiny'),
          src: sprites.other['official-artwork'].front_shiny,
        },
      ].filter((option) => option.src !== null),
      [t('front-view')]: [
        {
          value: 'front-default',
          label: t('default'),
          src: sprites.front_default,
        },
        {
          value: 'front-shiny',
          label: t('shiny'),
          src: sprites.front_shiny,
        },
        {
          value: 'front-female',
          label: t('female'),
          src: sprites.front_female,
        },
        {
          value: 'front-shiny-female',
          label: t('shiny-female'),
          src: sprites.front_shiny_female,
        },
      ].filter((option) => option.src !== null),
      [t('back-view')]: [
        {
          value: 'back-default',
          label: t('default'),
          src: sprites.back_default,
        },
        {
          value: 'back-shiny',
          label: t('shiny'),
          src: sprites.back_shiny,
        },
        {
          value: 'back-female',
          label: t('female'),
          src: sprites.back_female,
        },
        {
          value: 'back-shiny-female',
          label: t('shiny-female'),
          src: sprites.back_shiny_female,
        },
      ].filter((option) => option.src !== null),
    };
  };

  const spriteOptions = createSpriteOptions();
  const availableGroups = Object.entries(spriteOptions).filter(([, options]) => options.length > 0);

  const handleSpriteChange = (value: string) => {
    for (const [, options] of Object.entries(spriteOptions)) {
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
