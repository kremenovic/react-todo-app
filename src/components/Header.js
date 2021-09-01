import React from "react";
import { useState, useEffect } from "react";

function Header() {
  const [themeState, setThemeState] = useState(false);

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }
  }, [themeState]);

  return (
    <header>
      <div className="header-container">
        <h1>TODO</h1>
        <img
          src={themeState ? "/images/icon-sun.svg" : "/images/icon-moon.svg"}
          alt="icon-moon"
          onClick={() => setThemeState(!themeState)}
        />
      </div>
    </header>
  );
}

export default Header;
