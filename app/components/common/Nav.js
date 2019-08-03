import React from "react";
import { ThemeConsumer } from "../../contexts/theme";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row nav">
          <ul style={{ flex: 1 }} className="row ">
            <li>
              <NavLink exact to="/" className="nav-link">
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink to="/battle" className="nav-link">
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: "30px" }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🕶" : "💡"}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
