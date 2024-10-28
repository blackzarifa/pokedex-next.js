'use client';

import { useTranslations } from 'next-intl';
import { ModeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Separator } from '@/components/ui/separator';
import VolumeControl from '@/components/volume-control';

export function Header() {
  const t = useTranslations('Home');

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 mb-6">
      <div className="flex h-14 w-full items-center px-4">
        <h1 className="text-xl font-bold">{t('title')}</h1>

        <div className="flex flex-1 justify-end">
          <nav className="space-x-2">
            <VolumeControl />
            <ModeToggle />
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
      <Separator />
    </header>
  );
}
