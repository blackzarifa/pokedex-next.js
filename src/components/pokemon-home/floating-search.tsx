import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function FloatingSearch({ onClick }: { onClick: () => void }) {
  const t = useTranslations('Options');

  return (
    <Button
      className="md:hidden fixed bottom-4 right-4 rounded-2xl h-14 w-14 shadow-lg"
      onClick={onClick}
    >
      <Search />
      <span className="sr-only">{t('search')}</span>
    </Button>
  );
}
