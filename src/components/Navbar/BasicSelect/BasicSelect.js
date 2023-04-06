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
        MORE TRAVEL
      </a>
      {menuVisible ? (
        <div className="dropdown-menu">
          <h1>ASDFIOHSFUIOASJFOSIF</h1>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
