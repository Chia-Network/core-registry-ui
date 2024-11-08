import {
  CADT_SRC_LOCATION,
  CLIMATE_EXPLORER_SRC_LOCATION,
  DASHBOARD_SRC_LOCATION,
  MESSAGES,
  TOKENIZATION_ENGINE_SRC_LOCATION,
} from '../utils/constants';
import React, { useEffect, useRef } from 'react';
import { sendMessageToIframe } from '../utils/iframe-utils';
import { useManageSelectedAppUrl } from '../hooks/useManageSelectedAppUrl';
import { useManageLocale } from '../hooks/useManageLocale';

const ChildAppManager = () => {
  const [selectedAppUrl] = useManageSelectedAppUrl();
  const [selectedLocale] = useManageLocale();

  const cadtRef = useRef(null);
  const climateExplorerRef = useRef(null);
  const climateTokenizationRef = useRef(null);
  const climateDashboardRef = useRef(null);

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

  useEffect(() => {
    if (climateDashboardRef.current) {
      manageIframeMessages(climateDashboardRef.current);
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

  return (
    <>
      <div
        className="app-window"
        style={{
          display: selectedAppUrl === DASHBOARD_SRC_LOCATION ? 'block' : 'none',
        }}
      >
        <iframe
          ref={climateDashboardRef}
          src={DASHBOARD_SRC_LOCATION}
          onLoad={() => manageIframeMessages(climateDashboardRef.current)}
          width="100%"
          height="100%"
        ></iframe>
      </div>
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

export { ChildAppManager };
