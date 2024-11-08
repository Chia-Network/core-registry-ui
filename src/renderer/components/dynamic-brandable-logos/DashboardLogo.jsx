import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import defaultLogo from '../../assets/img/Dashboard.svg';

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
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await fetch('/DashboardCustom.svg');
        if (response.ok) {
          const svgText = await response.text();
          setSvgContent(svgText);
        }
      } catch (_) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchSVG();
  }, []);

  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  return (
    <LogoContainer>
      {isLoading ? (
        <></>
      ) : (
        <>
          {svgContent ? (
            <img src={svgDataUrl} width={width} height={height} alt="Dashboard Logo" />
          ) : (
            <img src={defaultLogo} width={width} height={height} alt="Dashboard Logo" />
          )}
          Dashboard
        </>
      )}
    </LogoContainer>
  );
};

export { DashboardLogo };
