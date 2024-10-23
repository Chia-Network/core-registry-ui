import { Dropdown } from 'flowbite-react';
import { CadtLogo } from './dynamic-brandable-logos/CadtLogo';
import { TokenizationLogo } from './dynamic-brandable-logos/TokenizationLogo';
import { ExplorerLogo } from './dynamic-brandable-logos/ExplorerLogo';
import React from 'react';
import { CADT_SRC_URL, CLIMATE_EXPLORER_SRC_URL, TOKENIZATION_ENGINE_SRC_URL } from '../utils/constants';
import { useManageSelectedAppUrl } from '../hooks/useManageSelectedAppUrl';

const childAppInfo = Object.freeze({
  cadt: {
    link: CADT_SRC_URL,
    name: 'CAD Trust',
    logo: CadtLogo,
  },
  climateExplorer: {
    link: CLIMATE_EXPLORER_SRC_URL,
    name: 'Climate Explorer',
    logo: ExplorerLogo,
  },
  climateTokenization: {
    link: TOKENIZATION_ENGINE_SRC_URL,
    name: 'Climate Tokenization Engine',
    logo: TokenizationLogo,
  },
});

const AppSelectorDropDown = () => {
  const [activeAppUrl, setActiveAppUrl] = useManageSelectedAppUrl();
  const activeApp =
    Object.keys(childAppInfo).filter((childAppKey) => childAppKey[childAppKey]?.link === activeAppUrl) ||
    childAppInfo.cadt;

  return (
    <Dropdown label={activeApp.logo} size="lg">
      <Dropdown.Item onClick={() => setActiveAppUrl(childAppInfo.cadt.link)}>
        <CadtLogo />
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setActiveAppUrl(childAppInfo.climateTokenization.link)}>
        <TokenizationLogo />
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setActiveAppUrl(childAppInfo.climateExplorer.link)}>
        <ExplorerLogo />
      </Dropdown.Item>
    </Dropdown>
  );
};

export { AppSelectorDropDown };
