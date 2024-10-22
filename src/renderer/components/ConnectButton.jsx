import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { useManageConnectionSettings } from '../hooks/useManageConnectionSettings';
import { ConnectModal } from './ConnectModal';

const ConnectButton = () => {
  const [connectionSettingsSaved, , clearConnectionSettings] = useManageConnectionSettings();
  const [showConnectModal, setShowConnectModal] = useState(false);

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
