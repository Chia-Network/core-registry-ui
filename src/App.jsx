import "./App.css";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Dropdown, Flowbite, Button, Modal } from "flowbite-react";
import { CadtLogo } from "./components/CadtLogo";
import { ExplorerLogo } from "./components/ExplorerLogo";
import { TokenizationLogo } from "./components/TokenizationLogo";
import flowbiteThemeSettings from "./flowbite.theme";
import { ThemeProvider } from "styled-components";
import getTheme from "./theme";
import Header from "./components/Header";

const appLinks = {
  cadt: {
    link: "/apps/cadt/index.html",
    name: "CAD Trust",
    logo: CadtLogo,
  },
  climateExplorer: {
    link: "/apps/climate_explorer/index.html",
    name: "Climate Explorer",
    logo: ExplorerLogo,
  },
  climateTokenization: {
    link: "/apps/climate_tokenization_engine/index.html",
    name: "Climate Tokenization Engine",
    logo: TokenizationLogo,
  },
};

const App = () => {
  const theme = getTheme();
  const [activeApp, setActiveApp] = useState(appLinks["cadt"]);
  const [showConnect, setShowConnect] = useState(false);
  const cadtRef = useRef(null);
  const climateExplorerRef = useRef(null);
  const climateTokenizationRef = useRef(null);

  const themeSettings = useMemo(() => {
    return flowbiteThemeSettings();
  }, [flowbiteThemeSettings]);

  const ActiveLogo = activeApp.logo;

  const getIframeOrigin = (iframe) => {
    try {
      const url = new URL(iframe.src);
      return url.origin;
    } catch (error) {
      console.error("Invalid iframe URL", error);
      return null;
    }
  };

  const sendMessageToIframe = (iframe, message) => {
    const targetOrigin = getIframeOrigin(iframe);
    if (targetOrigin && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, targetOrigin);
    } else {
      console.error(
        "Failed to determine target origin or iframe is not available"
      );
    }
  };

  const handleIframeLoad = (iframe) => {
    const iframeWindow = iframe.contentWindow;

    const messageListener = (event) => {
      if (event.origin !== new URL(iframe.src).origin) return;
      if (event.data === "appLoaded") {
        window.removeEventListener("message", messageListener);
        sendMessageToIframe(iframe, { customThemeColors: getTheme() });
      }
    };

    iframeWindow.addEventListener("load", () => {
      const leftNav = iframe.contentDocument.getElementById("left-nav");
      if (leftNav) {
        iframeWindow.postMessage("appLoaded", new URL(iframe.src).origin);
      }
    });

    window.addEventListener("message", messageListener);
  };

  useEffect(() => {
    sendColorSettingsToIframes();
  }, [activeApp.link, showConnect]);

  const sendColorSettingsToIframes = () => {
    const message = { customThemeColors: getTheme() };
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
  }, [showConnect]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = document.getElementById("connectForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const isValidHost = (host) => /^https?:\/\/.+(:\d{1,5})?$/.test(host);
    const isValidApiKey = (key) => key.trim() !== "";

    const fields = [
      {
        name: "cadtRegistryHost",
        errorId: "cadtRegistryHostError",
        validation: isValidHost,
      },
      {
        name: "cadtRegistryApiKey",
        errorId: "cadtRegistryApiKeyError",
        validation: isValidApiKey,
      },
      {
        name: "climateTokenizationEngineHost",
        errorId: "climateTokenizationEngineHostError",
        validation: isValidHost,
      },
      {
        name: "climateTokenizationEngineApiKey",
        errorId: "climateTokenizationEngineApiKeyError",
        validation: isValidApiKey,
      },
      {
        name: "climateExplorerHost",
        errorId: "climateExplorerHostError",
        validation: isValidHost,
      },
    ];

    let isValid = true;

    fields.forEach((field) => {
      const value = data[field.name];
      const errorElement = document.getElementById(field.errorId);

      if (!value) {
        errorElement.textContent = "Field is required.";
        isValid = false;
      } else if (!field.validation(value)) {
        errorElement.textContent =
          field.validation === isValidHost
            ? "Enter a valid URL with http:// or https://. Port numbers are allowed."
            : "API key cannot be empty.";
        isValid = false;
      } else {
        errorElement.textContent = ""; // Clear any previous error message
      }
    });

    if (!isValid) return;

    localStorage.setItem("connected", "true");
    localStorage.setItem("cadtRemoteServerAddress", data.cadtRegistryHost);
    localStorage.setItem("cadtRemoteServerApiKey", data.cadtRegistryApiKey);
    localStorage.setItem(
      "climateExplorerRemoteServerAddress",
      data.climateExplorerHost
    );
    localStorage.setItem(
      "climateTokenizationEngineRemoteServerAddress",
      data.climateTokenizationEngineHost
    );
    localStorage.setItem(
      "climateTokenizationEngineRemoteServerApiKey",
      data.climateTokenizationEngineApiKey
    );

    setShowConnect(false);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("connected");
    localStorage.removeItem("cadtRemoteServerAddress");
    localStorage.removeItem("cadtRemoteServerApiKey");
    localStorage.removeItem("climateExplorerRemoteServerAddress");
    localStorage.removeItem("climateTokenizationEngineRemoteServerAddress");
    localStorage.removeItem("climateTokenizationEngineRemoteServerApiKey");
    setShowConnect(true);
  };

  const validateLocalStorage = () => {
    const keys = [
      "cadtRemoteServerAddress",
      "cadtRemoteServerApiKey",
      "climateExplorerRemoteServerAddress",
      "climateTokenizationEngineRemoteServerAddress",
      "climateTokenizationEngineRemoteServerApiKey",
    ];

    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value === null || value === "") {
        // If any key fails the check, remove all keys and return false
        keys.forEach((key) => localStorage.removeItem(key));
        return false;
      }
    }

    return true;
  };

  return (
    <ThemeProvider theme={theme}>
      <Flowbite theme={themeSettings}>
        <div className="App">
          <Header
            activeApp={activeApp}
            appLinks={appLinks}
            setActiveApp={setActiveApp}
            showConnect={showConnect}
            setShowConnect={setShowConnect}
            handleLocaleChange={handleLocaleChange}
            handleDisconnect={handleDisconnect}
            validateLocalStorage={validateLocalStorage}
            handleSubmit={handleSubmit}
          />

          {validateLocalStorage() ? (
            <>
              <div
                className="app-window"
                style={{
                  display:
                    activeApp.name === appLinks["cadt"].name ? "block" : "none",
                }}
              >
                <iframe
                  ref={cadtRef}
                  src={appLinks["cadt"].link}
                  onLoadedData={() => handleIframeLoad(cadtRef.current)}
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
              <div
                className="app-window"
                style={{
                  display:
                    activeApp.name === appLinks["climateTokenization"].name
                      ? "block"
                      : "none",
                }}
              >
                <iframe
                  ref={climateTokenizationRef}
                  src={appLinks["climateTokenization"].link}
                  onLoadedData={() =>
                    handleIframeLoad(climateTokenizationRef.current)
                  }
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
              <div
                className="app-window"
                style={{
                  display:
                    activeApp.name === appLinks["climateExplorer"].name
                      ? "block"
                      : "none",
                }}
              >
                <iframe
                  ref={climateExplorerRef}
                  src={appLinks["climateExplorer"].link}
                  onLoadedData={() =>
                    handleIframeLoad(climateExplorerRef.current)
                  }
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-semibold text-gray-700">
                  Welcome to Core Registry
                </h1>
                <p className="text-gray-600">Connect to get started</p>
              </div>
            </div>
          )}
        </div>
      </Flowbite>
    </ThemeProvider>
  );
};

export default App;
