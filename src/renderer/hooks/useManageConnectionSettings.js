import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

const keys = [
  LOCAL_STORAGE_KEYS.CADT.API_URL,
  LOCAL_STORAGE_KEYS.CADT.API_KEY,
  LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_URL,
  LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_KEY,
  LOCAL_STORAGE_KEYS.CLIMATE_EXPLORER.API_URL,
];

/**
 *
 * @returns {{
 *     cadtApiHost: string,
 *     cadtApiKey: string,
 *     tokenizationApiHost: string,
 *     tokenizationApiKey: string,
 *     explorerApiHost: string,
 *   }|null}
 */
const validateAndGetLocalStorageConnectionSettings = () => {
  const connectionSettingsFromLocalStorage = {};
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) {
      connectionSettingsFromLocalStorage[key] = value;
    } else {
      // If any key does not exist in local storage, remove all keys and return false
      keys.forEach((key) => localStorage.removeItem(key));
      return null;
    }
  }

  return connectionSettingsFromLocalStorage;
};

/**
 * manages the connection settings in local storage
 * NOTE: this hook allows validating and clearing the values, {@link ConnectForm} is responsible for setting them
 * @returns
 * {[{
 *     cadtApiHost: string,
 *     cadtApiKey: string,
 *     tokenizationApiHost: string,
 *     tokenizationApiKey: string,
 *     explorerApiHost: string,
 *   },
 *   (function(values: {
 *     cadtApiHost: string,
 *     cadtApiKey: string,
 *     tokenizationApiHost: string,
 *     tokenizationApiKey: string,
 *     explorerApiHost: string,
 *   }): (void)),
 *   (function(): (void)),
 * ]}
 * - [0]: The current connection settings
 * - [1]: A function that sets the connection settings in local storage.
 * - [2]: A function that clears the current connection settings in local storage.
 */
const useManageConnectionSettings = () => {
  const [hookConnectionSettings, setHookConnectionSettings] = useState(() =>
    validateAndGetLocalStorageConnectionSettings(),
  );

  /**
   * @param values {{
   *     cadtApiHost: string,
   *     cadtApiKey: string,
   *     tokenizationApiHost: string,
   *     tokenizationApiKey: string,
   *     explorerApiHost: string,
   *   }}
   */
  const setConnectionSettings = (values) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CADT.API_URL, values.cadtApiHost);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CADT.API_KEY, values.cadtApiKey);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CLIMATE_EXPLORER.API_URL, values.explorerApiHost);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_URL, values.tokenizationApiHost);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_KEY, values.tokenizationApiKey);

    setHookConnectionSettings(validateAndGetLocalStorageConnectionSettings());
  };

  const clearConnectionSettings = () => {
    keys.forEach((localStorageKey) => localStorage.removeItem(localStorageKey));
    setHookConnectionSettings(validateAndGetLocalStorageConnectionSettings());
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('connectionSettingsChanged'));

    const handleConnectionStorageChange = () => {
      const localStorageConnectionSettings = validateAndGetLocalStorageConnectionSettings();
      if (JSON.stringify(localStorageConnectionSettings) !== JSON.stringify(hookConnectionSettings)) {
        setHookConnectionSettings(localStorageConnectionSettings);
      }
    };

    window.addEventListener('connectionSettingsChanged', handleConnectionStorageChange);

    return () => {
      window.removeEventListener('connectionSettingsChanged', handleConnectionStorageChange);
    };
  }, [hookConnectionSettings]);

  return [hookConnectionSettings, setConnectionSettings, clearConnectionSettings];
};

export { useManageConnectionSettings };
