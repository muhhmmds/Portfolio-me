import React from "react";
import { useLanguage } from "../context/language-context";
import { buttonLabels } from "../assets/lib/data";
// import { useDirection } from "../context/direction-context";

const LanguageSwitch: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  // const { direction, toggleDirection } = useDirection();

  return (
    <React.Fragment>
      <div className="language-switch-container">
        <input
          className="tgl tgl-style"
          id="toggle-language"
          type="checkbox"
          onChange={toggleLanguage}
          checked={language === "EN"}
          // onClick={toggleDirection}
        />
        <label
          className="tgl-btn"
          htmlFor="toggle-language"
          data-tg-off={buttonLabels.language.ar}
          data-tg-on={buttonLabels.language.en}
        ></label>
      </div>
    </React.Fragment>
  );
};

export default LanguageSwitch;
