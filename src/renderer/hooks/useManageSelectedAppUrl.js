import {useCallback, useEffect, useState} from 'react';
import {CADT_SRC_LINK, LOCAL_STORAGE_KEYS} from '../utils/constants';

/**
 * manages the selected child app source URL in local storage
 * @returns {[string,(function(string): (void))]}
 * - [0]: the currently selected child app source URL
 * - [1]: A function that sets the currently selected child app source URL in local storage.
 */
const useManageSelectedAppUrl = () => {
  const [childAppSourceUrl, setHookStatechildAppSourceUrl] = useState(CADT_SRC_LINK);

  const setSelectedChileAppSourceUrl = useCallback((childAppUrl) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_APP_URL, childAppUrl);
    setHookStatechildAppSourceUrl(childAppUrl);
  });

  useEffect(() => {
    const savedChildAppSourceUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE_CODE);
    if (savedChildAppSourceUrl !== childAppSourceUrl) {
      setHookStatechildAppSourceUrl(savedChildAppSourceUrl);
    }
  }, []);

  return [childAppSourceUrl, setSelectedChileAppSourceUrl];
};

export { useManageSelectedAppUrl };
