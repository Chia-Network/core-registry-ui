import React from "react";
import { Dropdown, Button, Modal } from "flowbite-react";
import { CadtLogo } from "./CadtLogo";
import { ExplorerLogo } from "./ExplorerLogo";
import { TokenizationLogo } from "./TokenizationLogo";
import { LocaleSwitcher } from "./LocalSwitcher";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${(props) => props.theme.topBarBgColor};
`;

const CustomHeader = ({
  activeApp,
  appLinks,
  setActiveApp,
  showConnect,
  setShowConnect,
  handleLocaleChange,
  handleDisconnect,
  validateLocalStorage,
  handleSubmit,
}) => {
  const ActiveLogo = activeApp.logo;

  return (
    <Header
      className="App-header px-4"
    >
      {validateLocalStorage() ? (
        <Dropdown label={<ActiveLogo />} size="lg">
          <Dropdown.Item onClick={() => setActiveApp(appLinks["cadt"])}>
            <CadtLogo />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setActiveApp(appLinks["climateTokenization"])}>
            <TokenizationLogo />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setActiveApp(appLinks["climateExplorer"])}>
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
  );
};

export default CustomHeader;
