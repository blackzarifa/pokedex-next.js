import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonStatsCardProps {
  stats: Array<{ stat: { name: string }; base_stat: number }> | null;
  isLoading: boolean;
}

export default function PokemonStats({ stats, isLoading }: PokemonStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLoading ? <Skeleton className="h-6 w-32" /> : 'Base Stats'}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : (
          stats?.map((stat) => (
            <div key={stat.stat.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="capitalize">{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
