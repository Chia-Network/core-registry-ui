import { Dropdown } from 'flowbite-react';
import { DashboardLogo } from './brandable-logos/DashboardLogo';
import { CadtLogo } from './brandable-logos/CadtLogo';
import { TokenizationLogo } from './brandable-logos/TokenizationLogo';
import { ExplorerLogo } from './brandable-logos/ExplorerLogo';
import React from 'react';
import {
  CADT_SRC_LOCATION,
  CLIMATE_EXPLORER_SRC_LOCATION,
  DASHBOARD_SRC_LOCATION,
  TOKENIZATION_ENGINE_SRC_LOCATION,
} from '../utils/constants';
import { useManageSelectedAppUrl } from '../hooks/useManageSelectedAppUrl';

const childAppInfo = Object.freeze({
  dashboard: {
    link: DASHBOARD_SRC_LOCATION,
    name: 'Climate Dashboard',
    logo: <DashboardLogo width={35} />,
  },
  cadt: {
    link: CADT_SRC_LOCATION,
    name: 'CAD Trust',
    logo: <CadtLogo width={35} />,
  },
  climateExplorer: {
    link: CLIMATE_EXPLORER_SRC_LOCATION,
    name: 'Climate Explorer',
    logo: <ExplorerLogo width={35} />,
  },
  climateTokenization: {
    link: TOKENIZATION_ENGINE_SRC_LOCATION,
    name: 'Climate Tokenization Engine',
    logo: <TokenizationLogo width={35} />,
  },
});

const dropDownTheme = {
  floating: {
    item: {
      base: 'flex w-full cursor-pointer items-center justify-start px-4 py-2 bg-gray-700 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
      container: 'bg-gray-700',
    },
  },
};

const AppSelectorDropDown = () => {
  const [activeAppUrl, setActiveAppUrl] = useManageSelectedAppUrl();
  const activeApp =
    Object.values(childAppInfo).find((childAppInfo) => childAppInfo.link === activeAppUrl) || childAppInfo.cadt;

  return (
    <Dropdown color="gray" theme={dropDownTheme} label={activeApp.logo} size="sm">
      <Dropdown.Item onClick={() => setActiveAppUrl(childAppInfo.dashboard.link)}>
        <DashboardLogo />
      </Dropdown.Item>
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
