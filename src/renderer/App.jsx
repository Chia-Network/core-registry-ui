import './App.css';
import { useManageConnectionSettings } from './hooks/useManageConnectionSettings';
import React, { useEffect, useRef } from 'react';
import { CoreRegistryHeader } from './components/CoreRegistryHeader';
import { useManageSelectedAppUrl } from './hooks/useManageSelectedAppUrl';
import { useManageLocale } from './hooks/useManageLocale';
import { CADT_SRC_URL, CLIMATE_EXPLOER_SRC_URL, MESSAGES, TOKENIZATION_ENGINE_SRC_URL } from './utils/constants';
import { sendMessageToIframe } from './utils/iframe-utils';
import { useFetchHostFile } from './hooks/useFetchHostFile';

const App = () => {
  const [connectionSettingsSet] = useManageConnectionSettings();
  const [selectedAppUrl] = useManageSelectedAppUrl();
  const [selectedLocale] = useManageLocale();
  const [configLoading, config] = useFetchHostFile({ hostFilePath: '/config.json' });
  const [customColorsLoading, customColors] = useFetchHostFile({ hostFilePath: '/colors.json' });
  const cadtRef = useRef(null);
  const climateExplorerRef = useRef(null);
  const climateTokenizationRef = useRef(null);

  const handleIframeLoad = (iframe) => {
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
      {connectionSettingsSet ? (
        <>
          <div
            className="app-window"
            style={{
              display: selectedAppUrl === CADT_SRC_URL ? 'block' : 'none',
            }}
          >
            <iframe
              ref={cadtRef}
              src={CADT_SRC_URL}
              onLoadedData={() => handleIframeLoad(cadtRef.current)}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div
            className="app-window"
            style={{
              display: selectedAppUrl === TOKENIZATION_ENGINE_SRC_URL ? 'block' : 'none',
            }}
          >
            <iframe
              ref={climateTokenizationRef}
              src={TOKENIZATION_ENGINE_SRC_URL}
              onLoadedData={() => handleIframeLoad(climateTokenizationRef.current)}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div
            className="app-window"
            style={{
              display: selectedAppUrl === CLIMATE_EXPLOER_SRC_URL ? 'block' : 'none',
            }}
          >
            <iframe
              ref={climateExplorerRef}
              src={CLIMATE_EXPLOER_SRC_URL}
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
