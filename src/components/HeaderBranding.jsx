import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components";
import styled from "styled-components";

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

const HeaderBranding = withTheme(({ width = 50, height = 50 }) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await fetch("/HeaderBrandingCustom.svg");
        if (response.ok) {
          const svgText = await response.text();
          setSvgContent(svgText);
        }
      } catch (_) {}
    };

    fetchSVG();
  }, []);

  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  return svgContent ? (
    <LogoContainer>
      <img src={svgDataUrl} width={width} height={height} alt="Header Branding" />
      Registry
    </LogoContainer>
  ) : (
    <></>
  );
});

export { HeaderBranding };
