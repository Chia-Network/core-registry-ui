import { HeaderBrandingLogo } from './dynamic-brandable-logos/HeaderBrandingLogo';
import { LocaleSelectorDropDown } from './LocalSelectorDropDown';
import React from 'react';
import { useManageConnectionSettings } from '../hooks/useManageConnectionSettings';
import { AppSelectorDropDown } from './AppSelectorDropDown';
import { ConnectButton } from './ConnectButton';

const CoreRegistryHeader = () => {
  const [connectionSettingsSaved] = useManageConnectionSettings();

  return (
    <header className="flex justify-between p-4 bg-[#6e7d7f]">
      {connectionSettingsSaved ? <AppSelectorDropDown /> : <div></div>}
      <HeaderBrandingLogo />
      <div className="flex gap-8 items-center">
        <LocaleSelectorDropDown />
        <ConnectButton />
      </div>
    </header>
  );
};

export { CoreRegistryHeader };
