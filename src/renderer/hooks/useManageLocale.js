import {useCallback, useEffect, useState} from 'react';
import {LANGUAGE_CODES, LOCAL_STORAGE_KEYS} from '../utils/constants';

/**
 * manages the selected locale in local storage
 * @returns {[string,(function(string): (void))]}
 * - [0]: the current locale (language) code
 * - [1]: A function that sets the locale code in local storage.
 */
const useManageLocale = () => {
  const [languageCode, setHookStateLanguageCode] = useState(LANGUAGE_CODES.ENGLISH);

  const setLocaleCode = useCallback((languageCode) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE_CODE, languageCode);
    setHookStateLanguageCode(languageCode);
  });

  useEffect(() => {
    const savedLanguageCode = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE_CODE);
    if (savedLanguageCode !== languageCode) {
      setHookStateLanguageCode(savedLanguageCode);
    }
  }, []);

  return [languageCode, setLocaleCode];
};

export { useManageLocale };
