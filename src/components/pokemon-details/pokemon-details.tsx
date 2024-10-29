import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonDetailsCardProps {
  height: number | null;
  weight: number | null;
  abilities: Array<{ ability: { name: string } }> | null;
  isLoading: boolean;
}

export default function PokemonDetails({
  height,
  weight,
  abilities,
  isLoading,
}: PokemonDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLoading ? <Skeleton className="h-6 w-32" /> : 'Details'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            <div>
              <h3 className="font-semibold">Height</h3>
              <p>{(height! / 10).toFixed(1)}m</p>
            </div>
            <div>
              <h3 className="font-semibold">Weight</h3>
              <p>{(weight! / 10).toFixed(1)}kg</p>
            </div>
            <div>
              <h3 className="font-semibold">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {abilities?.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize"
                  >
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
