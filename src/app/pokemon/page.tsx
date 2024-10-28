'use client';

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/react-query/queryClient';
import PokedexSearch from '@/components/pokemon-home/pokedex-search';
import PokemonList from '@/components/pokemon-home/pokemon-list';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col items-center gap-8">
      <QueryClientProvider client={queryClient}>
        <PokedexSearch onSearch={setSearchQuery} />
        <PokemonList searchQuery={searchQuery} />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
