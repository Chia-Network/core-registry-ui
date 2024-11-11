import './App.css';
import { useManageConnectionSettings } from './hooks/useManageConnectionSettings';
import React, { useEffect, useState } from 'react';
import { CoreRegistryHeader } from './components/CoreRegistryHeader';
import { LOCAL_STORAGE_KEYS } from './utils/constants';
import { useFetchHostFile } from './hooks/useFetchHostFile';
import { ComponentCenteredSpinner } from './components/ComponentCenteredSpinner';
import { ChildAppManager } from './components/ChildAppManager';
import { clearConfigApiHosts, setConfigApiHosts } from './utils/loaded-config-utils';

const App = () => {
  const [connectionSettings] = useManageConnectionSettings();
  const [configLoading, config] = useFetchHostFile({ hostFilePath: '/config.json' });
  const [customColorsLoading, customColors] = useFetchHostFile({ hostFilePath: '/colors.json' });
  const [configResolved, setConfigResolved] = useState(false);

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
      {!configResolved || customColorsLoading ? (
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
