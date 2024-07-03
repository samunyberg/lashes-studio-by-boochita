'use client';

import LanguageProvider from '@/providers/language/LanguageProvider';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <LanguageProvider language='en'>{children}</LanguageProvider>
    </SessionProvider>
  );
};

export default Providers;
