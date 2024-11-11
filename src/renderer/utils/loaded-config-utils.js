import { LOCAL_STORAGE_KEYS } from './constants';

export const setConfigApiHosts = (loadedConfig) => {
  const configApiHosts = {
    cadtApiHost: loadedConfig?.cadtApiHost,
    tokenizationApiHost: loadedConfig?.tokenizationApiHost,
    explorerApiHost: loadedConfig?.explorerApiHost,
  };

  localStorage.setItem(LOCAL_STORAGE_KEYS.API_HOSTS_FROM_CONFIG, JSON.stringify(configApiHosts));
};

export const getConfigApiHosts = () => {
  const configApiHostsString = localStorage.getItem(LOCAL_STORAGE_KEYS.API_HOSTS_FROM_CONFIG);
  if (!configApiHostsString) {
    return undefined;
  } else {
    try {
      return JSON.parse(configApiHostsString);
    } catch {
      return undefined;
    }
  }
};

export const clearConfigApiHosts = () => localStorage.removeItem(LOCAL_STORAGE_KEYS.API_HOSTS_FROM_CONFIG);
