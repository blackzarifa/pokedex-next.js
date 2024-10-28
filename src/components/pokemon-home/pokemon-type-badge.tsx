import { Badge } from '@/components/ui/badge';
import { TYPE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PokemonTypeName } from '@/types/pokemon';

export default function PokemonTypeBadge({ type }: { type: PokemonTypeName }) {
  const backgroundColor = `bg-${TYPE_COLORS[type]}` || 'bg-gray-400';

  return <Badge className={cn('capitalize', backgroundColor)}>{type}</Badge>;
}
