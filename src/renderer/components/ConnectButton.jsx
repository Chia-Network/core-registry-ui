import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { useManageConnectionSettings } from '../hooks/useManageConnectionSettings';
import { ConnectModal } from './ConnectModal';

const ConnectButton = () => {
  const [connectionSettingsSaved, , clearConnectionSettings] = useManageConnectionSettings();
  const [showConnectModal, setShowConnectModal] = useState(false);

  return (
    <>
      {connectionSettingsSaved ? (
        <Button color="gray" onClick={clearConnectionSettings}>
          Disconnect
        </Button>
      ) : (
        <Button onClick={() => setShowConnectModal(true)}>Connect</Button>
      )}
      {showConnectModal && <ConnectModal onClose={() => setShowConnectModal(false)} />}
    </>
  );
};

export { ConnectButton };
