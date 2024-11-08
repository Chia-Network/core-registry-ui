import './App.css';
import { useManageConnectionSettings } from './hooks/useManageConnectionSettings';
import React, { useEffect } from 'react';
import { CoreRegistryHeader } from './components/CoreRegistryHeader';
import { LOCAL_STORAGE_KEYS } from './utils/constants';
import { useFetchHostFile } from './hooks/useFetchHostFile';
import { ComponentCenteredSpinner } from './components/ComponentCenteredSpinner';
import { ChildAppManager } from './components/ChildAppManager';

const App = () => {
  console.log('!!!! parent app.jsx render');
  const [connectionSettings] = useManageConnectionSettings();
  // TODO: USE THE FETCHED CONFIG FILE TO AUTO-SET CONNECTION SETTINGS IN LOCAL STORAGE
  // TODO: ADJUST CONNECT MODAL BEHAVIOR TO APPEAR WITH PRE-FILLED CONNECTION SETTINGS IF API KEY NOT SET OR UNABLE TO CONNECT
  const [configLoading] = useFetchHostFile({ hostFilePath: '/config.json' });
  const [customColorsLoading, customColors] = useFetchHostFile({ hostFilePath: '/colors.json' });

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

  if (!connectionSettings) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-700">Welcome to Core Registry</h1>
          <p className="text-gray-600">Connect to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <CoreRegistryHeader />
      {configLoading || customColorsLoading ? <ComponentCenteredSpinner /> : <ChildAppManager />}
    </div>
  );
};

export default App;
