import { useTranslations } from 'next-intl';
import { ModeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <>
      <h1>{t('title')}</h1>
      <ModeToggle />
      <LanguageSwitcher />
    </>
  );
}
