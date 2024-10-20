import PokedexSearch from '@/components/pokedex-search';
import PokemonList from '@/components/pokemon-list';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      <PokedexSearch />

      <PokemonList />
    </div>
  );
}
