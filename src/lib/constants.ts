import { PokemonTypeName } from '@/types/pokemon';

export const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: 'gray-400',
  fire: 'red-500',
  water: 'blue-500',
  electric: 'yellow-400',
  grass: 'green-500',
  ice: 'blue-200',
  fighting: 'red-700',
  poison: 'purple-500',
  ground: 'yellow-600',
  flying: 'indigo-300',
  psychic: 'pink-500',
  bug: 'lime-500',
  rock: 'yellow-800',
  ghost: 'purple-700',
  dragon: 'indigo-600',
  dark: 'gray-700',
  steel: 'gray-500',
  fairy: 'pink-300',
} as const;
