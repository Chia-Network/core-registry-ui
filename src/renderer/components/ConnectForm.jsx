import React, { forwardRef, useImperativeHandle } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

const ConnectForm = forwardRef((ref) => {
  const onSubmit = (event) => {
    if (event) event.preventDefault(); // Check if 'event' exists in case it's called from parent without an event

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

    fields.forEach((field) => {
      const value = data[field.name];
      const errorElement = document.getElementById(field.errorId);

      if (!value) {
        errorElement.textContent = 'Field is required.';
        return false;
      } else if (!field.validation(value)) {
        errorElement.textContent =
          field.validation === isValidHost
            ? 'Enter a valid URL with http:// or https://. Port numbers are allowed.'
            : 'API key cannot be empty.';
        return false;
      } else {
        errorElement.textContent = ''; // Clear any previous error message
      }
    });

    localStorage.setItem(LOCAL_STORAGE_KEYS.CADT.API_URL, data.cadtRegistryHost);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CADT.API_KEY, data.cadtRegistryApiKey);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CLIMATE_EXPLORER.API_URL, data.climateExplorerHost);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_URL, data.climateTokenizationEngineHost);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKENIZATION_ENGINE.API_KEY, data.climateTokenizationEngineApiKey);

    return true;
  };

  // Expose handleSubmit to the parent through the ref
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
