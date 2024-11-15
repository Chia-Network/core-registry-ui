import React from 'react';
import styled from 'styled-components';

import defaultLogo from '../../assets/img/Registry.svg';
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

const CadtLogo = ({ width = 50, height = 50 }) => {
  const customRegistryLogoUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES.REGISTRY_CUSTOM_SVG_URL);

  return (
    <LogoContainer>
      {customRegistryLogoUrl ? (
        <img src={customRegistryLogoUrl} width={width} height={height} alt="Cadt Logo" />
      ) : (
        <img src={defaultLogo} width={width} height={height} alt="Cadt Logo" />
      )}
      Registry
    </LogoContainer>
  );
};

export { CadtLogo };
