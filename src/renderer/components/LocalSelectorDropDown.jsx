import React from 'react';
import { Dropdown } from 'flowbite-react';
import { useManageLocale } from '../hooks/useManageLocale';
import { LANGUAGE_CODES } from '../utils/constants';

const LocaleSelectorDropDown = () => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useManageLocale();

  return (
    <Dropdown color="gray" label={selectedLanguageCode}>
      {Object.keys(LANGUAGE_CODES).map((languageKey) => (
        <Dropdown.Item
          key={LANGUAGE_CODES[languageKey]}
          onClick={() => setSelectedLanguageCode(LANGUAGE_CODES[languageKey])}
          value={LANGUAGE_CODES[languageKey]}
        >
          {languageKey}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export { LocaleSelectorDropDown };
