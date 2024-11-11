import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useManageConnectionSettings } from '../hooks/useManageConnectionSettings';
import { ConnectModal } from './ConnectModal';
import { getConfigApiHosts } from '../utils/loaded-config-utils';

const ConnectButton = () => {
  const configApiSettings = getConfigApiHosts();
  const [connectionSettingsSaved, , clearConnectionSettings] = useManageConnectionSettings();
  const [showConnectModal, setShowConnectModal] = useState(false);

  useEffect(() => {
    if (!showConnectModal && configApiSettings && !connectionSettingsSaved) {
      setShowConnectModal(true);
    }
  }, [showConnectModal, configApiSettings, !connectionSettingsSaved]);

  return (
    <>
      <div className="text-white">
        <Button
          color="none"
          onClick={() => (connectionSettingsSaved ? clearConnectionSettings() : setShowConnectModal(true))}
        >
          {connectionSettingsSaved ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
      {showConnectModal && <ConnectModal onClose={() => setShowConnectModal(false)} />}
    </>
  );
};

export { ConnectButton };
