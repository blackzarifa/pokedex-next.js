'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query/queryClient';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';
import { VolumeProvider } from '@/context/volume-context';

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
};

const Providers = ({ children, locale, messages }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <VolumeProvider>{children}</VolumeProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
};

export default Providers;
