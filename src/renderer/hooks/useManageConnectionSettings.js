import { useEffect, useState } from 'react';
import { API_SETTINGS_CONFIGURED, LOCAL_STORAGE_KEYS } from '../utils/constants';

const keys = [
  API_SETTINGS_CONFIGURED,
  LOCAL_STORAGE_KEYS.CADT.API_URL,
  LOCAL_STORAGE_KEYS.CADT.API_KEY,
  LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_URL,
  LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_KEY,
  LOCAL_STORAGE_KEYS.CLIMATE_EXPLORER.API_URL,
];

/**
 * manages the connection settings in local storage
 * NOTE: this hook allows validating and clearing the values, {@link ConnectForm} is responsible for setting them
 * @returns {[boolean,(function(): (boolean)),(function(): (void))]}
 * - [0]: A boolean indicating whether the connection settings are saved to local storage or not.
 * - [1]: A function that validates the current connection settings and returns a boolean.
 * - [2]: A function that clears the current connection settings in local storage.
 */
const useManageConnectionSettings = () => {
  const [connectionInfoInLocalStorage, setConnectionInfoInLocalStorage] = useState(false);

  const validateLocalStorageConnectionSettings = () => {
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value === null || value === '') {
        // If any key fails the check, remove all keys and return false
        keys.forEach((key) => localStorage.removeItem(key));
        setConnectionInfoInLocalStorage(false);
        return false;
      }
    }
    setConnectionInfoInLocalStorage(true);
    return true;
  };

  const clearConnectionSettings = () => {
    keys.forEach((localStorageKey) => localStorage.removeItem(localStorageKey));
    validateLocalStorageConnectionSettings();
  };

  useEffect(() => {
    if (validateLocalStorageConnectionSettings()) {
      setConnectionInfoInLocalStorage(true);
      localStorage.setItem(API_SETTINGS_CONFIGURED, 'true');
    } else {
      setConnectionInfoInLocalStorage(false);
    }
  }, []);

  return [connectionInfoInLocalStorage, validateLocalStorageConnectionSettings, clearConnectionSettings];
};

export { useManageConnectionSettings };
