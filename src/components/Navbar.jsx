import { useState } from "react";
import "./Navbar.css";
import { Moon } from "lucide-react";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  const darkMode = () => {
    setDark(!dark);
    document.body.classList.toggle("dark", !dark);
  };

  return (
    <nav>
      <div className="where">Where in the world?</div>

      <button onClick={darkMode} className="dark-mode" type="button">
        <span className="moon-icon">
          <Moon size={16} />
        </span>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;