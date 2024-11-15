import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/img/Tokenization.svg';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

const LogoContainer = styled.div`
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

const TokenizationLogo = ({ width = 50, height = 50 }) => {
  const customTokenizationLogoUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES.TOKENIZATION_CUSTOM_SVG_URL);

  return (
    <LogoContainer>
      {customTokenizationLogoUrl ? (
        <img src={customTokenizationLogoUrl} width={width} height={height} alt="Tokenization Logo" />
      ) : (
        <img src={logo} width={width} height={height} alt="Tokenization Logo" />
      )}
      Tokenization
    </LogoContainer>
  );
};

export { TokenizationLogo };
