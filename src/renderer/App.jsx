import './App.css';
import { useManageConnectionSettings } from './hooks/useManageConnectionSettings';
import React, { useEffect, useRef } from 'react';
import { CoreRegistryHeader } from './components/CoreRegistryHeader';
import { useManageSelectedAppUrl } from './hooks/useManageSelectedAppUrl';
import { useManageLocale } from './hooks/useManageLocale';
import {
  CADT_SRC_LOCATION,
  CLIMATE_EXPLORER_SRC_LOCATION,
  LOCAL_STORAGE_KEYS,
  MESSAGES,
  TOKENIZATION_ENGINE_SRC_LOCATION,
} from './utils/constants';
import { sendMessageToIframe } from './utils/iframe-utils';
import { useFetchHostFile } from './hooks/useFetchHostFile';

const App = () => {
  const [connectionSettings] = useManageConnectionSettings();
  const [selectedAppUrl] = useManageSelectedAppUrl();
  const [selectedLocale] = useManageLocale();
  const [configLoading, config] = useFetchHostFile({ hostFilePath: '/config.json' });
  const [customColorsLoading, customColors] = useFetchHostFile({ hostFilePath: '/colors.json' });
  const cadtRef = useRef(null);
  const climateExplorerRef = useRef(null);
  const climateTokenizationRef = useRef(null);

  // these tell the child apps that they're a core-registry child and their source basename
  localStorage.setItem(LOCAL_STORAGE_KEYS.CADT.BASENAME, CADT_SRC_LOCATION.replace('/index.html', ''));
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.BASENAME,
    TOKENIZATION_ENGINE_SRC_LOCATION.replace('/index.html', ''),
  );
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.CLIMATE_EXPLORER.BASENAME,
    CLIMATE_EXPLORER_SRC_LOCATION.replace('/index.html', ''),
  );

  console.log('app.jsx connection settings set', connectionSettings);
  console.log('app.jsx selected language', selectedLocale);
  console.log('app.jsx selected appUrl', selectedAppUrl);

  const handleIframeLoad = (iframe) => {
    console.log('######## iframe loaded');

    if (!iframe) {
      return;
    }

    const childAppMessageListener = (event) => {
      if (event.origin === new URL(iframe.src).origin && event.data === MESSAGES.CHILD_APP_LOADED) {
        sendCustomColorsToIframes();
        sendConfigToIframes();
        sendSelectedLanguageToIframes();
      }
    };

    // TODO: address eventListener removal, if needed
    window.addEventListener('message', childAppMessageListener);
  };

  const sendCustomColorsToIframes = () => {
    if (customColors && !customColorsLoading) {
      const message = { customColors };
      [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
        if (ref.current) {
          sendMessageToIframe(ref.current, message);
        }
      });
    }
  };

  const sendConfigToIframes = () => {
    if (config && !configLoading) {
      const message = { config };
      [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
        if (ref.current) {
          sendMessageToIframe(ref.current, message);
        }
      });
    }
  };

  const sendSelectedLanguageToIframes = () => {
    const message = { selectedLocale };
    [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
      if (ref.current) {
        sendMessageToIframe(ref.current, message);
      }
    });
  };

  // send color settings to child apps
  useEffect(() => {
    sendCustomColorsToIframes();
  }, [customColors, customColorsLoading]);

  // send color settings to child apps
  useEffect(() => {
    sendConfigToIframes();
  }, [config, configLoading]);

  // notify child apps of the selected language
  useEffect(() => {
    sendSelectedLanguageToIframes();
  }, [selectedLocale]);

  /* todo: remove
   useEffect(() => {
      [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
        if (ref.current) {
          handleIframeLoad(ref.current);
        }
      });
    }, [cadtRef.current, climateExplorerRef.current, climateTokenizationRef.current]);
   */

  return (
    <div className="App">
      <CoreRegistryHeader />
      {connectionSettings ? (
        <>
          <div
            className="app-window"
            style={{
              display: selectedAppUrl === CADT_SRC_LOCATION ? 'block' : 'none',
            }}
          >
            <iframe
              ref={cadtRef}
              src={CADT_SRC_LOCATION}
              onLoadedData={() => handleIframeLoad(cadtRef.current)}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div
            className="app-window"
            style={{
              display: selectedAppUrl === TOKENIZATION_ENGINE_SRC_LOCATION ? 'block' : 'none',
            }}
          >
            <iframe
              ref={climateTokenizationRef}
              src={TOKENIZATION_ENGINE_SRC_LOCATION}
              onLoadedData={() => handleIframeLoad(climateTokenizationRef.current)}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div
            className="app-window"
            style={{
              display: selectedAppUrl === CLIMATE_EXPLORER_SRC_LOCATION ? 'block' : 'none',
            }}
          >
            <iframe
              ref={climateExplorerRef}
              src={'apps/climate_explorer/index.html'}
              onLoadedData={() => handleIframeLoad(climateExplorerRef.current)}
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-semibold text-gray-700">Welcome to Core Registry</h1>
            <p className="text-gray-600">Connect to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
