import React from 'react';
import styled from 'styled-components';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

const LogoContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  font-family: Ariel, Helvetica, sans-serif;
  gap: 10px;
  font-size: 1rem;
  text-transform: uppercase;
`;

const HeaderBrandingLogo = ({ width = 50, height = 50 }) => {
  const headerBrandingUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES.HEADER_BRANDING_CUSTOM_SVG_URL);

  return headerBrandingUrl ? (
    <LogoContainer>
      <img src={headerBrandingUrl} width={width} height={height} alt="Header Branding" />
    </LogoContainer>
  ) : (
    <></>
  );
};

export { HeaderBrandingLogo };
