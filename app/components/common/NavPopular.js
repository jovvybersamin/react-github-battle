import React from "react";
import PropTypes from "prop-types";

function NavPopular({ selected, onUpdateLanguage }) {
  const languages = [
    "All",
    "JavaScript",
    "Ruby",
    "Java",
    "CSS",
    "Python",
    "PHP",
    "CSharp"
  ];

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li
          key={language}
          style={language === selected ? { color: "rgb(187, 46, 31)" } : null}
        >
          <button
            onClick={() => onUpdateLanguage(language)}
            className="btn-clear nav-link"
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

NavPopular.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export default NavPopular;
