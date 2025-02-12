import {useCallback, useEffect, useState} from 'react';
import {DASHBOARD_SRC_LOCATION, LOCAL_STORAGE_KEYS} from '../utils/constants';

/**
 * manages the selected child app source URL in local storage
 * @returns {[string,(function(string): (void))]}
 * - [0]: the currently selected child app source URL
 * - [1]: A function that sets the currently selected child app source URL in local storage.
 */
const useManageSelectedAppUrl = () => {
  const [childAppSourceUrl, setHookStatechildAppSourceUrl] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_APP_URL) || DASHBOARD_SRC_LOCATION;
  });

  const setSelectedChildAppSourceUrl = useCallback((childAppUrl) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_APP_URL, childAppUrl);
    setHookStatechildAppSourceUrl(childAppUrl);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: LOCAL_STORAGE_KEYS.SELECTED_APP_URL,
        newValue: childAppUrl,
      }),
    );
  }, []);

  useEffect(() => {
    const savedChildAppSourceUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_APP_URL);
    if (savedChildAppSourceUrl && savedChildAppSourceUrl !== childAppSourceUrl) {
      setHookStatechildAppSourceUrl(savedChildAppSourceUrl);
    }

    const handleSelectedAppStorageChange = (event) => {
      if (event.key === LOCAL_STORAGE_KEYS.SELECTED_APP_URL && event.newValue !== childAppSourceUrl) {
        setHookStatechildAppSourceUrl(event.newValue);
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
