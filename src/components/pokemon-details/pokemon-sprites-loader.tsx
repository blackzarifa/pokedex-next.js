import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import PokemonSprites from '@/components/pokemon-details/pokemon-sprites';
import { PokemonDetails } from '@/types/pokemon';

interface PokemonSpritesLoaderProps {
  pokemon: PokemonDetails | undefined;
  isLoading: boolean;
  gradientColor: string;
}

export default function PokemonSpritesLoader({
  pokemon,
  isLoading,
  gradientColor,
}: PokemonSpritesLoaderProps) {
  if (isLoading || !pokemon) {
    return (
      <Card className="w-full h-full">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-grow flex items-center justify-center">
            <Skeleton className="w-full max-w-md aspect-square" />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>

            <Skeleton className="h-10 w-full max-w-xs mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return <PokemonSprites pokemon={pokemon} gradientColor={gradientColor} />;
}
