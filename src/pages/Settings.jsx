import { useState }
from "react";

import LanguageSelector
from "../components/LanguageSelector";

export default function Settings() {

  const [language,
    setLanguage] =
    useState("en");

  return (
    <div className="settings-page">

      <h1>
        ⚙ Settings
      </h1>

      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
      />

      <div
        style={{
          marginTop: "20px"
        }}
      >
        Selected Language:
        {" "}
        <strong>
          {language}
        </strong>
      </div>

    </div>
  );
}