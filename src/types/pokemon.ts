export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
  pokemonWithDetails?: PokemonDetails[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  cries: {
    latest: string;
    legacy: string;
  };
  types: {
    slot: number;
    type: PokemonType;
  }[];
  sprites: PokemonSprites;
}

interface PokemonType {
  name: PokemonTypeName;
  url: string;
}

export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
}
