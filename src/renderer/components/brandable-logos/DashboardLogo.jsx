import React from 'react';
import styled from 'styled-components';

import defaultLogo from '../../assets/img/Dashboard.svg';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

const LogoContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75%;
  color: black;
  font-family: Ariel, Helvetica, sans-serif;
  gap: 10px;
  font-size: 1rem;
  text-transform: uppercase;
`;

const DashboardLogo = ({ width = 50, height = 50 }) => {
  const customDashboardLogoUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES.DASHBOARD_CUSTOM_SVG_URL);

  return (
    <LogoContainer>
      {customDashboardLogoUrl ? (
        <img src={customDashboardLogoUrl} width={width} height={height} alt="Dashboard Logo" />
      ) : (
        <img src={defaultLogo} width={width} height={height} alt="Dashboard Logo" />
      )}
      Dashboard
    </LogoContainer>
  );
};

export { DashboardLogo };
