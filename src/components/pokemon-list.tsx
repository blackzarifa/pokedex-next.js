import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockPokemon = [
  { id: 1, name: 'Bulbasaur', type: 'Grass' },
  { id: 4, name: 'Charmander', type: 'Fire' },
  { id: 7, name: 'Squirtle', type: 'Water' },
  { id: 25, name: 'Pikachu', type: 'Electric' },
];

export default function PokemonList() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockPokemon.map((pokemon) => (
          <Card key={pokemon.id}>
            <CardHeader>
              <CardTitle>{pokemon.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {pokemon.type}</p>
              <p>ID: {pokemon.id}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
