import { Dropdown } from 'flowbite-react';
import { CadtLogo } from './dynamic-brandable-logos/CadtLogo';
import { TokenizationLogo } from './dynamic-brandable-logos/TokenizationLogo';
import { ExplorerLogo } from './dynamic-brandable-logos/ExplorerLogo';
import React from 'react';
import { CADT_SRC_LINK, CLIMATE_EXPLOER_SRC_LINK, TOKENIZATION_ENGINE_SRC_LINK } from '../utils/constants';
import { useManageSelectedAppUrl } from '../hooks/useManageSelectedAppUrl';

const childAppInfo = Object.freeze({
  cadt: {
    link: CADT_SRC_LINK,
    name: 'CAD Trust',
    logo: CadtLogo,
  },
  climateExplorer: {
    link: CLIMATE_EXPLOER_SRC_LINK,
    name: 'Climate Explorer',
    logo: ExplorerLogo,
  },
  climateTokenization: {
    link: TOKENIZATION_ENGINE_SRC_LINK,
    name: 'Climate Tokenization Engine',
    logo: TokenizationLogo,
  },
});

const AppSelectorDropDown = () => {
  const [activeAppUrl, setActiveAppUrl] = useManageSelectedAppUrl();
  const activeApp = childAppInfo.filter((childApp) => childApp.link === activeAppUrl) || childAppInfo.cadt;

  return (
    <Dropdown label={<activeApp.logo />} size="lg">
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
