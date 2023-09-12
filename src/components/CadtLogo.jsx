import React from "react";
import { withTheme } from "styled-components";
import styled from "styled-components";

import appLogo from "../assets/img/tokenization-engine-logo.png";

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

const CadtLogo = withTheme(({ width = 50, height = 50 }) => {
  return (
    <LogoContainer>
      <img src={appLogo} width={height} height={width} />
      Climate Action Data Trust
    </LogoContainer>
  );
});

export { CadtLogo };
