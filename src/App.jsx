import "./App.css";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Dropdown, Flowbite, Button, Modal } from "flowbite-react";
import { CadtLogo } from "./components/CadtLogo";
import { ExplorerLogo } from "./components/ExplorerLogo";
import { LocaleSwitcher } from "./components/LocalSwitcher";
import { TokenizationLogo } from "./components/TokenizationLogo";
import flowbiteThemeSettings from "./flowbite.theme";
import styled, { ThemeProvider } from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${(props) => props.theme.topBarBgColor};
`;

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
  const [theme, setTheme] = useState({});
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
      if (event.data === "appLoaded" && theme) {
        window.removeEventListener("message", messageListener);
        sendMessageToIframe(iframe, { customThemeColors: theme });
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
    theme && sendColorSettingsToIframes();
  }, [activeApp.link, showConnect, theme]);

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
  }, [showConnect, theme]);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const themeResponse = await fetch("/theme.json");
        if (themeResponse.ok) {
          const customTheme = await themeResponse.json();
          setTheme(customTheme);
        }
      } catch (_) {}
    };

    fetchTheme();
  }, []);

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
          <Header className="App-header px-4">
            {validateLocalStorage() ? (
              <Dropdown label={<ActiveLogo />} size="lg">
                <Dropdown.Item onClick={() => setActiveApp(appLinks["cadt"])}>
                  <CadtLogo />
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setActiveApp(appLinks["climateTokenization"])}
                >
                  <TokenizationLogo />
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setActiveApp(appLinks["climateExplorer"])}
                >
                  <ExplorerLogo />
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <div></div>
            )}
            <div className="flex gap-8 items-center">
              <LocaleSwitcher handleLocaleChange={handleLocaleChange} />
              {validateLocalStorage() ? (
                <Button color="gray" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              ) : (
                <Button color="gray" onClick={() => setShowConnect(true)}>
                  Connect
                </Button>
              )}
            </div>
            {showConnect && (
              <Modal show={true} onClose={() => setShowConnect(false)}>
                <Modal.Header>Connect to Core Registry</Modal.Header>
                <Modal.Body>
                  <form id="connectForm" onSubmit={handleSubmit}>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="block text-lg font-semibold text-gray-700">
                          CADT Registry
                        </label>
                        <div className="space-y-2">
                          <label className="block text-gray-600">
                            Host <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cadtRegistryHost"
                            required
                            pattern="https?://.+(:\d{1,5})?"
                            className="w-full p-2 border rounded shadow-sm"
                            placeholder="Enter CADT Registry Host URL"
                          />
                          <span
                            id="cadtRegistryHostError"
                            className="text-red-500"
                          ></span>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-gray-600">
                            API Key <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cadtRegistryApiKey"
                            required
                            className="w-full p-2 border rounded shadow-sm"
                            placeholder="Enter CADT Registry API Key"
                          />
                          <span
                            id="cadtRegistryApiKeyError"
                            className="text-red-500"
                          ></span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-lg font-semibold text-gray-700">
                          Climate Tokenization Engine
                        </label>
                        <div className="space-y-2">
                          <label className="block text-gray-600">
                            Host <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="climateTokenizationEngineHost"
                            required
                            pattern="https?://.+(:\d{1,5})?"
                            className="w-full p-2 border rounded shadow-sm"
                            placeholder="Enter Climate Tokenization Engine Host URL"
                          />
                          <span
                            id="climateTokenizationEngineHostError"
                            className="text-red-500"
                          ></span>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-gray-600">
                            API Key <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="climateTokenizationEngineApiKey"
                            required
                            className="w-full p-2 border rounded shadow-sm"
                            placeholder="Enter Climate Tokenization Engine API Key"
                          />
                          <span
                            id="climateTokenizationEngineApiKeyError"
                            className="text-red-500"
                          ></span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-lg font-semibold text-gray-700">
                          Climate Explorer
                        </label>
                        <div className="space-y-2">
                          <label className="block text-gray-600">
                            Host <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="climateExplorerHost"
                            required
                            pattern="https?://.+(:\d{1,5})?"
                            className="w-full p-2 border rounded shadow-sm"
                            placeholder="Enter Climate Explorer Host URL"
                          />
                          <span
                            id="climateExplorerHostError"
                            className="text-red-500"
                          ></span>
                        </div>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="gray" onClick={() => setShowConnect(false)}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleSubmit}>
                    Connect
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Header>

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
