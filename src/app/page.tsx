import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  const arr = Array(100).fill(0);

  return (
    <>
      <div>
        {arr.map((x) => (
          <h1>{x}</h1>
        ))}
      </div>

      <h1>{t('title')}</h1>
    </>
  );
}
