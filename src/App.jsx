import "./App.css";
import { useState } from "react";
import { Dropdown } from "flowbite-react";

const appLinks = {
  cadt: {
    link: "/apps/cadt/index.html",
    name: "CADT",
  },
  climateExplorer: {
    link: "/apps/climate_explorer/index.html",
    name: "Climate Explorer",
  },
  climateTokenization: {
    link: "/apps/climate_tokenization_engine/index.html",
    name: "Climate Tokenization Engine",
  },
};

const App = () => {
  const [activeApp, setActiveApp] = useState(appLinks["cadt"]);

  return (
    <div className="App">
      <header className="App-header">
        <Dropdown label={activeApp.name}>
          <Dropdown.Item onClick={() => setActiveApp(appLinks["cadt"])}>
            CADT
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setActiveApp(appLinks["climateTokenization"])}
          >
            Climate Tokenization Engine
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setActiveApp(appLinks["climateExplorer"])}
          >
            Climate Explorer
          </Dropdown.Item>
        </Dropdown>
      </header>
      <div
        className="app-window"
        style={{
          display: activeApp.name === appLinks["cadt"].name ? "block" : "none",
        }}
      >
        <iframe src={appLinks["cadt"].link} width="100%" height="100%"></iframe>
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
          src={appLinks["climateExplorer"].link}
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
