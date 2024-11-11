import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useManageConnectionSettings } from '../hooks/useManageConnectionSettings';
import { getConfigApiHosts } from '../utils/loaded-config-utils';

const ConnectForm = forwardRef(({}, ref) => {
  const configApiHosts = getConfigApiHosts();
  const [, setConnectionSettings] = useManageConnectionSettings();

  const [formValues, setFormValues] = useState({
    cadtRegistryHost: configApiHosts?.cadtApiHost ?? undefined,
    cadtRegistryApiKey: undefined,
    climateTokenizationEngineHost: configApiHosts?.tokenizationApiHost ?? undefined,
    climateTokenizationEngineApiKey: undefined,
    climateExplorerHost: configApiHosts?.explorerApiHost ?? undefined,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    if (event) event.preventDefault();

    const form = document.getElementById('connectForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const isValidHost = (host) => /^https?:\/\/.+(:\d{1,5})?$/.test(host);
    const isValidApiKey = (key) => key.trim() !== '';

    const fields = [
      {
        name: 'cadtRegistryHost',
        errorId: 'cadtRegistryHostError',
        validation: isValidHost,
      },
      {
        name: 'cadtRegistryApiKey',
        errorId: 'cadtRegistryApiKeyError',
        validation: isValidApiKey,
      },
      {
        name: 'climateTokenizationEngineHost',
        errorId: 'climateTokenizationEngineHostError',
        validation: isValidHost,
      },
      {
        name: 'climateTokenizationEngineApiKey',
        errorId: 'climateTokenizationEngineApiKeyError',
        validation: isValidApiKey,
      },
      {
        name: 'climateExplorerHost',
        errorId: 'climateExplorerHostError',
        validation: isValidHost,
      },
    ];

    let formValid = true;

    fields.forEach((field) => {
      const value = data[field.name];
      const errorElement = document.getElementById(field.errorId);

      if (!value) {
        errorElement.textContent = 'Field is required.';
        formValid = false;
      } else if (!field.validation(value)) {
        errorElement.textContent =
          field.validation === isValidHost
            ? 'Enter a valid URL with http:// or https://. Port numbers are allowed.'
            : 'API key cannot be empty.';
        formValid = false;
      } else {
        errorElement.textContent = '';
      }
    });

    if (!formValid) {
      return false;
    }

    setConnectionSettings({
      cadtApiHost: data.cadtRegistryHost,
      cadtApiKey: data.cadtRegistryApiKey,
      explorerApiHost: data.climateExplorerHost,
      tokenizationApiHost: data.climateTokenizationEngineHost,
      tokenizationApiKey: data.climateTokenizationEngineApiKey,
    });

    return true;
  };

  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  return (
    <form id="connectForm">
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">CADT Registry</label>
          <div className="space-y-2">
            <label className="block text-gray-600">
              Host <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cadtRegistryHost"
              value={formValues.cadtRegistryHost}
              onChange={handleInputChange}
              required
              pattern="https?://.+(:\d{1,5})?"
              className="w-full p-2 border rounded shadow-sm"
              placeholder="Enter CADT Registry Host URL"
            />
            <span id="cadtRegistryHostError" className="text-red-500"></span>
          </div>
          <div className="space-y-2">
            <label className="block text-gray-600">
              API Key <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cadtRegistryApiKey"
              value={formValues.cadtRegistryApiKey}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded shadow-sm"
              placeholder="Enter CADT Registry API Key"
            />
            <span id="cadtRegistryApiKeyError" className="text-red-500"></span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">Climate Tokenization Engine</label>
          <div className="space-y-2">
            <label className="block text-gray-600">
              Host <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="climateTokenizationEngineHost"
              value={formValues.climateTokenizationEngineHost}
              onChange={handleInputChange}
              required
              pattern="https?://.+(:\d{1,5})?"
              className="w-full p-2 border rounded shadow-sm"
              placeholder="Enter Climate Tokenization Engine Host URL"
            />
            <span id="climateTokenizationEngineHostError" className="text-red-500"></span>
          </div>
          <div className="space-y-2">
            <label className="block text-gray-600">
              API Key <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="climateTokenizationEngineApiKey"
              value={formValues.climateTokenizationEngineApiKey}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded shadow-sm"
              placeholder="Enter Climate Tokenization Engine API Key"
            />
            <span id="climateTokenizationEngineApiKeyError" className="text-red-500"></span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">Climate Explorer</label>
          <div className="space-y-2">
            <label className="block text-gray-600">
              Host <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="climateExplorerHost"
              value={formValues.climateExplorerHost}
              onChange={handleInputChange}
              required
              pattern="https?://.+(:\d{1,5})?"
              className="w-full p-2 border rounded shadow-sm"
              placeholder="Enter Climate Explorer Host URL"
            />
            <span id="climateExplorerHostError" className="text-red-500"></span>
          </div>
        </div>
      </div>
    </form>
  );
});

export { ConnectForm };
