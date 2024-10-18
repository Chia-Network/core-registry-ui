import React from 'react';
import { Dropdown } from 'flowbite-react';
import { useManageLocale } from '../hooks/useManageLocale';
import { LANGUAGE_CODES } from '../utils/constants';

const LocaleSelectorDropDown = () => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useManageLocale();

  return (
    <Dropdown label={selectedLanguageCode}>
      {Object.keys(LANGUAGE_CODES).map((languageCode) => (
        <Dropdown.Item
          key={LANGUAGE_CODES[languageCode]}
          onClick={() => setSelectedLanguageCode(LANGUAGE_CODES[languageCode])}
          value={LANGUAGE_CODES[languageCode]}
        >
          {languageCode}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export { LocaleSelectorDropDown };
