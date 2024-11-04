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
import { ComponentCenteredSpinner } from './components/ComponentCenteredSpinner';

const App = () => {
  const [connectionSettings] = useManageConnectionSettings();
  const [selectedAppUrl] = useManageSelectedAppUrl();
  const [selectedLocale] = useManageLocale();
  // TODO: USE THE FETCHED CONFIG FILE TO AUTO-SET CONNECTION SETTINGS IN LOCAL STORAGE
  // TODO: ADJUST CONNECT MODAL BEHAVIOR TO APPEAR WITH PRE-FILLED CONNECTION SETTINGS IF API KEY NOT SET OR UNABLE TO CONNECT
  const [configLoading] = useFetchHostFile({ hostFilePath: '/config.json' });
  const [customColorsLoading, customColors] = useFetchHostFile({ hostFilePath: '/colors.json' });
  const cadtRef = useRef(null);
  const climateExplorerRef = useRef(null);
  const climateTokenizationRef = useRef(null);

  // these tell the child apps that they're a core-registry child and their source basename
  localStorage.setItem(LOCAL_STORAGE_KEYS.CADT.BASENAME, CADT_SRC_LOCATION.replace('index.html', ''));
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.BASENAME,
    TOKENIZATION_ENGINE_SRC_LOCATION.replace('index.html', ''),
  );
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.CLIMATE_EXPLORER.BASENAME,
    CLIMATE_EXPLORER_SRC_LOCATION.replace('index.html', ''),
  );

  const manageIframeMessages = (iframe) => {
    if (!iframe) {
      return;
    }

    const childAppMessageListener = (event) => {
      if (event.origin === new URL(iframe.src).origin) {
        const message = event.data;

        switch (message) {
          case MESSAGES.CHILD_APP_LOADED:
            console.log(MESSAGES.CHILD_APP_LOADED);
            break;

          case MESSAGES.RELOAD:
            window.location.reload();
            break;

          default:
            break;
        }
      }
    };

    window.addEventListener('message', childAppMessageListener);

    return () => window.removeEventListener('message', childAppMessageListener);
  };

  useEffect(() => {
    if (cadtRef.current) {
      manageIframeMessages(cadtRef.current);
    }
  }, [cadtRef.current]);

  useEffect(() => {
    if (climateTokenizationRef.current) {
      manageIframeMessages(climateTokenizationRef.current);
    }
  }, [climateTokenizationRef.current]);

  useEffect(() => {
    if (climateExplorerRef.current) {
      manageIframeMessages(climateExplorerRef.current);
    }
  }, [climateExplorerRef.current]);

  // notify child apps of the selected language
  useEffect(() => {
    const message = { selectedLocale };
    [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
      if (ref.current) {
        sendMessageToIframe(ref.current, message);
      }
    });
  }, [selectedLocale]);

  // make custom colors available to child apps
  useEffect(() => {
    if (customColors && !customColorsLoading) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_COLORS, JSON.stringify(customColors));
      } catch {
        console.error('failed to parse colors.json');
      }
    }
  }, [customColors, customColorsLoading]);

  const AppBody = () => {
    if (!connectionSettings) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-semibold text-gray-700">Welcome to Core Registry</h1>
            <p className="text-gray-600">Connect to get started</p>
          </div>
        </div>
      );
    }

    // placing this return below the above if is purposeful. allow settings to load while the user enters connection info
    if (configLoading || customColorsLoading) {
      return <ComponentCenteredSpinner />;
    }

    return (
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
            onLoad={() => manageIframeMessages(cadtRef.current)}
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
            onLoad={() => manageIframeMessages(climateTokenizationRef.current)}
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
            src={CLIMATE_EXPLORER_SRC_LOCATION}
            onLoad={() => manageIframeMessages(climateExplorerRef.current)}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <CoreRegistryHeader />
      {AppBody()}
    </div>
  );
};

export default App;
