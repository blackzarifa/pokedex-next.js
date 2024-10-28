import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface PokedexSearchProps {
  onSearch: (query: string) => void;
}

export default function PokedexSearch({ onSearch }: PokedexSearchProps) {
  const t = useTranslations('Options');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg space-x-2">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('search-placeholder')}
        className="rounded-md"
      />
      <Button type="submit" className="rounded-md">
        <Search className="h-4 w-4" />
        <span className="sr-only">{t('search')}</span>
      </Button>
    </form>
  );
}
