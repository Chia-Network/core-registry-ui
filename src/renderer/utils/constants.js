const LOCAL_STORAGE_KEYS = Object.freeze({
  CADT: {
    API_URL: 'cadtRemoteServerAddress',
    API_KEY: 'cadtRemoteServerApiKey',
  },
  TOKENIZATION_ENGINE: {
    API_URL: 'climateTokenizationEngineRemoteServerAddress',
    API_KEY: 'climateTokenizationEngineRemoteServerApiKey',
  },
  CLIMATE_EXPLORER: {
    API_URL: 'climateExplorerRemoteServerAddress',
  },
  API_SETTINGS_CONFIGURED: 'apiSettingsConfigured',
  LANGUAGE_CODE: 'selectedLanguageCode',
  SELECTED_APP_URL: 'selectedAppUrl',
});

const CADT_SRC_URL = '/apps/cadt/index.html';
const CLIMATE_EXPLOER_SRC_URL = '/apps/climate_explorer/index.html';
const TOKENIZATION_ENGINE_SRC_URL = '/apps/climate_tokenization_engine/index.html';

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
  CLIMATE_EXPLOER_SRC_URL,
  TOKENIZATION_ENGINE_SRC_URL,
  MESSAGES,
};
