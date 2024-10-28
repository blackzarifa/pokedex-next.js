import type { Metadata } from 'next';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { Outfit } from 'next/font/google';
import { Header } from '@/components/layout/header';
import Providers from '@/app/providers';

import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <Providers locale={locale} messages={messages}>
          <Header />
          <div className="mx-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
