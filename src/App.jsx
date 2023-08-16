import "./App.css";
import { useState, useRef, useEffect, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { CadtLogo } from "./components/CadtLogo";
import { ExplorerLogo } from "./components/ExplorerLogo";
import { TokenizationLogo } from "./components/TokenizationLogo";
import { Flowbite } from "flowbite-react";
import flowbiteThemeSettings from "./flowbite.theme";

const appLinks = {
  cadt: {
    link: "/apps/cadt/index.html",
    name: "CADT",
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
  const [activeApp, setActiveApp] = useState(appLinks["cadt"]);
  const cadtRef = useRef(null);
  const climateExplorerRef = useRef(null);
  const climateTokenizationRef = useRef(null);

  useEffect(() => {
    if (cadtRef.current) {
      window.cadt = cadtRef.current.contentWindow;
    }
  }, [cadtRef.current]);

  const themeSettings = useMemo(() => {
    return flowbiteThemeSettings();
  }, [flowbiteThemeSettings]);

  const ActiveLogo = activeApp.logo;
  const TokenizationLogo = appLinks["climateTokenization"].logo;
  const ExplorerLogo = appLinks["climateExplorer"].logo;
  const CadtLogo = appLinks["cadt"].logo;

  return (
    <Flowbite theme={themeSettings}>
      <div className="App">
        <header className="App-header">
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
        </header>
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
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </Flowbite>
  );
};

export default App;
