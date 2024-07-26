import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import { Dropdown } from "flowbite-react";

const LANGUAGE_CODES = Object.freeze({
  ENGLISH: "en-US",
  SPANISH: "es-ES",
  FRENCH: "fr-FR",
  GERMAN: "de-DE",
  CHINESE: "cn",
});

const LocaleSwitcher = ({ handleLocaleChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    LANGUAGE_CODES["ENGLISH"]
  );

  const handleChange = (value) => {
    setCurrentLanguage(value);
    handleLocaleChange(value);
  };
  return (
    <Dropdown
      label={currentLanguage}
    >
      {Object.keys(LANGUAGE_CODES).map((key) => (
        <Dropdown.Item
          key={LANGUAGE_CODES[key]}
          onClick={() => handleChange(LANGUAGE_CODES[key])}
          value={LANGUAGE_CODES[key]}
        >
          {key}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export { LocaleSwitcher };
