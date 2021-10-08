import React from "react";
import { FaPizzaSlice } from "react-icons/fa";
const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="header__logo">
          <img src="./" alt="Logo-Planner" />
        </div>
        <div className="header__setting">
          <ul>
            <li>+</li>
            <li>
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
