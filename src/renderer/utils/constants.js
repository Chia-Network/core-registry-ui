const LOCAL_STORAGE_KEYS = Object.freeze({
  CADT: {
    API_URL: 'cadtApiHost',
    API_KEY: 'cadtApiKey',
    BASENAME: 'cadtChildUiBasename',
  },
  TOKENIZATION_ENGINE: {
    API_URL: 'tokenizationApiHost',
    API_KEY: 'tokenizationApiKey',
    BASENAME: 'tokenizationChildUiBasename',
  },
  CLIMATE_EXPLORER: {
    API_URL: 'explorerApiHost',
    BASENAME: 'explorerChildUiBasename',
  },
  LANGUAGE_CODE: 'selectedLanguageCode',
  SELECTED_APP_URL: 'selectedAppUrl',
  THEME_COLORS: 'themeColors',
});

const CADT_SRC_LOCATION = 'apps/cadt/index.html';
const CLIMATE_EXPLORER_SRC_LOCATION = 'apps/climate_explorer/index.html';
const TOKENIZATION_ENGINE_SRC_LOCATION = 'apps/climate_tokenization_engine/index.html';
const DASHBOARD_SRC_LOCATION = 'apps/climate_dashboard/index.html';

const MESSAGES = Object.freeze({
  CHILD_APP_LOADED: 'childAppLoaded',
  RELOAD: 'reload',
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
  CADT_SRC_LOCATION,
  DASHBOARD_SRC_LOCATION,
  CLIMATE_EXPLORER_SRC_LOCATION,
  TOKENIZATION_ENGINE_SRC_LOCATION,
  MESSAGES,
};
