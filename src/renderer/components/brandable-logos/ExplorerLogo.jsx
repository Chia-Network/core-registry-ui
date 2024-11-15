import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/img/Explorer.svg';
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

const ExplorerLogo = ({ width = 50, height = 50 }) => {
  const customExplorerLogoUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES.EXPLORER_CUSTOM_SVG_URL);

  return (
    <LogoContainer>
      {customExplorerLogoUrl ? (
        <img src={customExplorerLogoUrl} width={width} height={height} alt="Explorer Logo" />
      ) : (
        <img src={logo} width={width} height={height} alt="Explorer Logo" />
      )}
      Explorer
    </LogoContainer>
  );
};

export { ExplorerLogo };
