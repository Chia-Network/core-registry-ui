import './App.css';
import { useManageConnectionSettings } from '../hooks/useManageConnectionSettings';
import React, { useEffect, useRef, useState } from 'react';
import { CoreRegistryHeader } from './components/CoreRegistryHeader';

const App = () => {
  const [connectionSettingsSet] = useManageConnectionSettings();
  const [activeApp, setActiveApp] = useState(appLinks['cadt']);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const cadtRef = useRef(null);
  const climateExplorerRef = useRef(null);
  const climateTokenizationRef = useRef(null);

  const getIframeOrigin = (iframe) => {
    try {
      const url = new URL(iframe.src);
      return url.origin;
    } catch (error) {
      console.error('Invalid iframe URL', error);
      return null;
    }
  };

  const sendMessageToIframe = (iframe, message) => {
    const targetOrigin = getIframeOrigin(iframe);
    if (targetOrigin && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, targetOrigin);
    } else {
      console.error('Failed to determine target origin or iframe is not available');
    }
  };

  const handleIframeLoad = (iframe) => {
    const iframeWindow = iframe.contentWindow;

    const messageListener = (event) => {
      if (event.origin !== new URL(iframe.src).origin) return;
      if (event.data === 'appLoaded' && theme) {
        window.removeEventListener('message', messageListener);
        theme && sendColorSettingsToIframes();
      }
    };

    iframeWindow.addEventListener('load', () => {
      const leftNav = iframe.contentDocument.getElementById('left-nav');
      if (leftNav) {
        iframeWindow.postMessage('appLoaded', new URL(iframe.src).origin);
      }
    });

    window.addEventListener('message', messageListener);
  };

  useEffect(() => {
    theme && sendColorSettingsToIframes();
  }, [activeApp.link, showConnectModal, theme]);

  const sendColorSettingsToIframes = () => {
    const message = { customThemeColors: theme };
    [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
      if (ref.current) {
        sendMessageToIframe(ref.current, message);
      }
    });
  };

  const handleLocaleChange = (event) => {
    const message = { changeLocale: event };
    [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
      if (ref.current) {
        sendMessageToIframe(ref.current, message);
      }
    });
  };

  useEffect(() => {
    [cadtRef, climateExplorerRef, climateTokenizationRef].forEach((ref) => {
      if (ref.current) {
        handleIframeLoad(ref.current);
      }
    });
  }, [showConnectModal, theme]);

  return (
    <div className="App">
      <CoreRegistryHeader />
      {connectionSettingsSet ? (
        <>
          <div
            className="app-window"
            style={{
              display: activeApp.name === appLinks['cadt'].name ? 'block' : 'none',
            }}
          >
            <iframe
              ref={cadtRef}
              src={appLinks['cadt'].link}
              onLoadedData={() => handleIframeLoad(cadtRef.current)}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div
            className="app-window"
            style={{
              display: activeApp.name === appLinks['climateTokenization'].name ? 'block' : 'none',
            }}
          >
            <iframe
              ref={climateTokenizationRef}
              src={appLinks['climateTokenization'].link}
              onLoadedData={() => handleIframeLoad(climateTokenizationRef.current)}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div
            className="app-window"
            style={{
              display: activeApp.name === appLinks['climateExplorer'].name ? 'block' : 'none',
            }}
          >
            <iframe
              ref={climateExplorerRef}
              src={appLinks['climateExplorer'].link}
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
