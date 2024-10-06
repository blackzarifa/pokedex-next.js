import { useTranslations } from 'next-intl';
import { ModeToggle } from '@/components/theme-toggle';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div>
      <h1>{t('title')}</h1>
      <ModeToggle />
    </div>
  );
}
