import React from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function PokedexSearch() {
  const t = useTranslations('Options');

  return (
    <div className="flex w-full max-w-lg space-x-2">
      <Input type="text" placeholder={t('search-placeholder')} className="rounded-md" />
      <Button type="submit" className="rounded-md">
        <Search className="h-4 w-4" />
        <span className="sr-only">{t('search')}</span>
      </Button>
    </div>
  );
}
