import React from "react";
import { withTheme } from "styled-components";
import styled from "styled-components";

import appLogo from "../assets/img/Tokenization.svg";

const LogoContainer = styled("div")`
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

const TokenizationLogo = withTheme(({ width = 50, height = 50 }) => {
  return (
    <LogoContainer>
      <img src={appLogo} width={height} height={width} />
      Tokenization
    </LogoContainer>
  );
});

export { TokenizationLogo };
