import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';

interface PokemonStatsCardProps {
  stats: Array<{ stat: { name: string }; base_stat: number }> | null;
  isLoading: boolean;
}

const getStatColor = (statValue: number) => {
  if (statValue >= 100) return 'bg-green-500';
  if (statValue >= 80) return 'bg-emerald-400';
  if (statValue >= 60) return 'bg-yellow-400';
  if (statValue >= 40) return 'bg-orange-400';
  return 'bg-red-400';
};

const getStatName = (name: string, t: (key: string) => string) => {
  const statNames: Record<string, string> = {
    hp: 'HP',
    attack: t('attack'),
    defense: t('defense'),
    'special-attack': t('sp-atk'),
    'special-defense': t('sp-def'),
    speed: t('speed'),
  };
  return statNames[name] || name;
};

export default function PokemonStats({ stats, isLoading }: PokemonStatsCardProps) {
  const t = useTranslations('Stats');
  const maxBaseStat = 255;

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalStats = stats?.reduce((sum, stat) => sum + stat.base_stat, 0) || 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('base-stats')}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {t('total')}: {totalStats}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats?.map((stat) => (
            <div key={stat.stat.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium w-20">{getStatName(stat.stat.name, t)}</span>
                <span className="font-mono">{String(stat.base_stat).padStart(3, '0')}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatColor(stat.base_stat)} transition-all duration-1000 ease-out`}
                  style={{
                    width: `${(stat.base_stat / maxBaseStat) * 100}%`,
                    transform: 'translateX(-100%)',
                    animation: 'slideRight 1s forwards',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <style jsx global>{`
        @keyframes slideRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </Card>
  );
}
