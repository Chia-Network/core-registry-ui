import {useCallback, useEffect, useState} from 'react';
import {LANGUAGE_CODES, LOCAL_STORAGE_KEYS} from '../utils/constants';

/**
 * manages the selected locale in local storage
 * @returns {[string,(function(string): (void))]}
 * - [0]: the current locale (language) code
 * - [1]: A function that sets the locale code in local storage.
 */
const useManageLocale = () => {
  const [languageCode, setHookStateLanguageCode] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE_CODE) || LANGUAGE_CODES.ENGLISH,
  );

  const setLocaleCode = useCallback(
    (languageCode) => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE_CODE, languageCode);
      setHookStateLanguageCode(languageCode);

      window.dispatchEvent(
        new StorageEvent('storage', {
          key: LOCAL_STORAGE_KEYS.LANGUAGE_CODE,
          newValue: languageCode,
        }),
      );
    },
    [languageCode],
  );

  useEffect(() => {
    const savedLanguageCode = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE_CODE);
    if (savedLanguageCode && savedLanguageCode !== languageCode) {
      setHookStateLanguageCode(savedLanguageCode);
    }

    const handleLanguageStorageChange = (event) => {
      if (event.key === LOCAL_STORAGE_KEYS.LANGUAGE_CODE && event.newValue !== languageCode) {
        setHookStateLanguageCode(event.newValue);
      }
    };

    window.addEventListener('storage', handleLanguageStorageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageStorageChange);
    };
  }, [languageCode]);

  return [languageCode, setLocaleCode];
};

export { useManageLocale };
