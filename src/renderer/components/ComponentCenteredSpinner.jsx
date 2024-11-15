import React from 'react';
import { Spinner } from 'flowbite-react';

const ComponentCenteredSpinner = ({ label }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Spinner />
      {label && <div className="ml-4">{label}</div>}
    </div>
  );
};

export { ComponentCenteredSpinner };
