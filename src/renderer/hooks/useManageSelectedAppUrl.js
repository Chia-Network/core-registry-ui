import {useCallback, useEffect, useState} from 'react';
import {CADT_SRC_URL, LOCAL_STORAGE_KEYS} from '../utils/constants';

/**
 * manages the selected child app source URL in local storage
 * @returns {[string,(function(string): (void))]}
 * - [0]: the currently selected child app source URL
 * - [1]: A function that sets the currently selected child app source URL in local storage.
 */
const useManageSelectedAppUrl = () => {
  const [childAppSourceUrl, setHookStatechildAppSourceUrl] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_APP_URL) || CADT_SRC_URL;
  });

  const setSelectedChildAppSourceUrl = useCallback((childAppUrl) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_APP_URL, childAppUrl);
    setHookStatechildAppSourceUrl(childAppUrl);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: LOCAL_STORAGE_KEYS.SELECTED_APP_URL,
        newChildAppUrl: childAppUrl,
      }),
    );
  }, []);

  useEffect(() => {
    const savedChildAppSourceUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_APP_URL);
    if (savedChildAppSourceUrl && savedChildAppSourceUrl !== childAppSourceUrl) {
      setHookStatechildAppSourceUrl(savedChildAppSourceUrl);
    }

    const handleSelectedAppStorageChange = (event) => {
      if (event.key === LOCAL_STORAGE_KEYS.SELECTED_APP_URL && event.newChildAppUrl !== childAppSourceUrl) {
        setHookStatechildAppSourceUrl(event.newChildAppUrl);
      }
    };

    window.addEventListener('storage', handleSelectedAppStorageChange);

    // remove event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleSelectedAppStorageChange);
    };
  }, [childAppSourceUrl]);

  return [childAppSourceUrl, setSelectedChildAppSourceUrl];
};

export { useManageSelectedAppUrl };
