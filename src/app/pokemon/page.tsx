'use client';

import { useState } from 'react';
import PokedexSearch from '@/components/pokemon-home/pokedex-search';
import FloatingSearch from '@/components/pokemon-home/floating-search';
import PokemonList from '@/components/pokemon-home/pokemon-list';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col items-center gap-8">
      <PokedexSearch onSearch={setSearchQuery} />
      <FloatingSearch onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      <PokemonList searchQuery={searchQuery} />
    </div>
  );
}
