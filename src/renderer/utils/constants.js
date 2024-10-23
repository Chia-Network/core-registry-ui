const LOCAL_STORAGE_KEYS = Object.freeze({
  CADT: {
    API_URL: 'cadtApiHost',
    API_KEY: 'cadtApiKey',
  },
  TOKENIZATION_ENGINE: {
    API_URL: 'tokenizationApiHost',
    API_KEY: 'tokenizationApiKey',
  },
  CLIMATE_EXPLORER: {
    API_URL: 'explorerApiHost',
  },
  LANGUAGE_CODE: 'selectedLanguageCode',
  SELECTED_APP_URL: 'selectedAppUrl',
});

const CADT_SRC_URL = 'apps/cadt/index.html';
const CLIMATE_EXPLORER_SRC_URL = 'apps/climate_explorer/index.html';
const TOKENIZATION_ENGINE_SRC_URL = 'apps/climate_tokenization_engine/index.html';

const MESSAGES = Object.freeze({
  CHILD_APP_LOADED: 'childAppLoaded',
});

const LANGUAGE_CODES = Object.freeze({
  ENGLISH: 'en-US',
  SPANISH: 'es-ES',
  FRENCH: 'fr-FR',
  GERMAN: 'de-DE',
  CHINESE: 'cn',
});

export {
  LOCAL_STORAGE_KEYS,
  LANGUAGE_CODES,
  CADT_SRC_URL,
  CLIMATE_EXPLORER_SRC_URL,
  TOKENIZATION_ENGINE_SRC_URL,
  MESSAGES,
};
