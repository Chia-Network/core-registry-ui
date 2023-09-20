import React from "react";
import styled from "styled-components";

import logo from "../assets/img/Explorer.svg";

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

const ExplorerLogo = ({ width = 50, height = 50 }) => {
  return (
    <LogoContainer>
      <img src={logo} width={height} height={width} />
      Explorer
    </LogoContainer>
  );
};

export { ExplorerLogo };
