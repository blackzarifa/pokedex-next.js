'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query/queryClient';
import PokedexSearch from '@/components/pokemon/pokedex-search';
import PokemonList from '@/components/pokemon/pokemon-list';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      <QueryClientProvider client={queryClient}>
        <PokedexSearch />

        <PokemonList />
      </QueryClientProvider>
    </div>
  );
}
