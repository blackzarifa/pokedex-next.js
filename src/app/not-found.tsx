import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center mt-12 gap-8">
      <h1 className="text-4xl font-bold">{t('heading')}</h1>
      <p>{t('text')}</p>

      <Button>
        <Link href="/pokemon">{t('returnBtn')}</Link>
      </Button>
    </div>
  );
}
