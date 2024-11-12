import './App.css';
import { useManageConnectionSettings } from './hooks/useManageConnectionSettings';
import React, { useEffect, useState } from 'react';
import { CoreRegistryHeader } from './components/CoreRegistryHeader';
import { LOCAL_STORAGE_KEYS } from './utils/constants';
import { useFetchHostFile } from './hooks/useFetchHostFile';
import { ComponentCenteredSpinner } from './components/ComponentCenteredSpinner';
import { ChildAppManager } from './components/ChildAppManager';
import { clearConfigApiHosts, setConfigApiHosts } from './utils/loaded-config-utils';
import { useFetchSvgContent } from './hooks/useFetchSvgImage';

const App = () => {
  const [connectionSettings] = useManageConnectionSettings();
  const [configLoading, config] = useFetchHostFile({ hostFilePath: '/config.json' });
  const [customColorsLoading, customColors] = useFetchHostFile({ hostFilePath: '/colors.json' });
  const [dashboardCustomSvgLoading, dashboardCustomSvg] = useFetchSvgContent({ hostFilePath: '/DashboardCustom.svg' });
  const [registryCustomSvgLoading, registryCustomSvg] = useFetchSvgContent({ hostFilePath: '/RegistryCustom.svg' });
  const [tokenizationCustomSvgLoading, tokenizationCustomSvg] = useFetchSvgContent({
    hostFilePath: '/TokenizationCustom.svg',
  });
  const [explorerCustomSvgLoading, explorerCustomSvg] = useFetchSvgContent({ hostFilePath: '/ExplorerCustom.svg' });
  const [headerBrandingCustomSvgLoading, headerBrandingCustomSvg] = useFetchSvgContent({
    hostFilePath: '/HeaderBrandingCustom.svg',
  });
  const [resourcesResolved, setResourcesResolved] = useState(false);
  const [configResolved, setConfigResolved] = useState(false);

  // save custom svg urls to local storage app-wide access
  useEffect(() => {
    const fetchingResources =
      dashboardCustomSvgLoading ||
      registryCustomSvgLoading ||
      tokenizationCustomSvgLoading ||
      explorerCustomSvgLoading ||
      headerBrandingCustomSvgLoading;

    if (!fetchingResources) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES.REGISTRY_CUSTOM_SVG_URL, registryCustomSvg);
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES.TOKENIZATION_CUSTOM_SVG_URL, tokenizationCustomSvg);
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES.EXPLORER_CUSTOM_SVG_URL, explorerCustomSvg);
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES.DASHBOARD_CUSTOM_SVG_URL, dashboardCustomSvg);
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES.HEADER_BRANDING_CUSTOM_SVG_URL, headerBrandingCustomSvg);

      setResourcesResolved(true);
    }
  }, [
    dashboardCustomSvgLoading,
    registryCustomSvgLoading,
    tokenizationCustomSvgLoading,
    explorerCustomSvgLoading,
    headerBrandingCustomSvgLoading,
  ]);

  // handle loading and setting the config if it exists
  useEffect(() => {
    if (!configLoading && !config) {
      clearConfigApiHosts();
      setConfigResolved(true);
    } else if (!configLoading && config) {
      setConfigApiHosts(config);
      setConfigResolved(true);
    }
  }, [configLoading, config]);

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

  return (
    <div className="App">
      {!configResolved || !resourcesResolved ? (
        <ComponentCenteredSpinner />
      ) : (
        <>
          <CoreRegistryHeader />
          {!connectionSettings ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-semibold text-gray-700">Welcome to Core Registry</h1>
                <p className="text-gray-600">Connect to get started</p>
              </div>
            </div>
          ) : (
            <ChildAppManager />
          )}
        </>
      )}
    </div>
  );
};

export default App;
