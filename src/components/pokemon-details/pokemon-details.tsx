import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Ruler, Weight, Zap } from 'lucide-react';
import { PokemonAbility } from '@/types/pokemon';
import { useTranslations } from 'next-intl';

interface PokemonDetailsCardProps {
  height: number | null;
  weight: number | null;
  abilities: PokemonAbility[] | null;
  isLoading: boolean;
}

const getWeightCategory = (weight: number, t: any) => {
  const kg = weight / 10;
  if (kg < 10) return t('weightCategory.featherweight');
  if (kg < 25) return t('weightCategory.lightweight');
  if (kg < 50) return t('weightCategory.middleweight');
  if (kg < 100) return t('weightCategory.heavyweight');
  return t('weightCategory.superHeavyweight');
};

const getHeightCategory = (height: number, t: any) => {
  const meters = height / 10;
  if (meters < 0.5) return t('heightCategory.tiny');
  if (meters < 1.0) return t('heightCategory.small');
  if (meters < 1.5) return t('heightCategory.medium');
  if (meters < 2.0) return t('heightCategory.large');
  return t('heightCategory.gigantic');
};

export default function PokemonDetails({
  height,
  weight,
  abilities,
  isLoading,
}: PokemonDetailsCardProps) {
  const t = useTranslations('Details');

  if (isLoading) {
    return (
      <>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </>
    );
  }

  return (
    <Card className="w-full">
      <div className="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8">
        <div className="w-full h-full rounded-full bg-primary/5" />
      </div>

      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-sm">{t('height')}</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{(height! / 10).toFixed(1)}m</p>
              <span className="text-sm text-gray-500">{getHeightCategory(height!, t)}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Weight className="w-5 h-5 text-rose-500" />
              <h3 className="font-semibold text-sm">{t('weight')}</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{(weight! / 10).toFixed(1)}kg</p>
              <span className="text-sm text-gray-500">{getWeightCategory(weight!, t)}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-sm">{t('abilities')}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {abilities?.map((ability) => (
              <span
                key={ability.ability.name}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium capitalize"
              >
                {ability.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
