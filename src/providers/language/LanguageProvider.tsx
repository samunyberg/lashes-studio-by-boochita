import LanguageContext from '@/contexts/languageContext';
import { ReactNode, useState } from 'react';

import en from './data/en.json';
import fi from './data/fi.json';

export type Language = 'en' | 'fi';

interface Props {
  language: Language;
  children: ReactNode;
}

const LanguageProvider = ({ language, children }: Props) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(language);

  const changeLanguage = (language: Language) => setCurrentLanguage(language);

  const labelsDictionary: { [key: string]: { [key: string]: string } } = {
    en,
    fi,
  };

  const getLabel = (labelId: string) => {
    const label = labelsDictionary[currentLanguage][labelId];
    if (!label)
      throw new Error(
        `LabelID ${labelId} not found in ${currentLanguage}.json`
      );
    return label;
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage, getLabel }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
