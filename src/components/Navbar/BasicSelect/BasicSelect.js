import React, { useState } from "react";
import "./BasicSelect.css"; // import your CSS styles

export default function BasicSelect() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div>
      <a href="#" onClick={toggleMenu}>
        Select an Option
      </a>
      {menuVisible && (
        <div className="dropdown-menu">
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}
