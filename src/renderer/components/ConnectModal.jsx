import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { ConnectForm } from './ConnectForm';
import { useManageConnectionSettings } from '../hooks/useManageConnectionSettings';

const ConnectModal = ({ onClose }) => {
  const [connectionValuesSet] = useManageConnectionSettings();
  const [isProcessing, setIsProcessing] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (connectionValuesSet) {
      onClose();
    }
  }, []);

  const onClickConnect = (event) => {
    setIsProcessing(true);
    if (formRef?.current?.onSubmit) {
      formRef.current.onSubmit(event);
    }
    setIsProcessing(false);
  };

  if (connectionValuesSet) {
    onClose();
    return <></>;
  }

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>Connect to Core Registry</Modal.Header>
      <Modal.Body>
        <ConnectForm ref={formRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={() => onClose()} disabled={isProcessing}>
          Cancel
        </Button>
        <Button onClick={onClickConnect} isProcessing={isProcessing} disabled={isProcessing}>
          Connect
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConnectModal };
