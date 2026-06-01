import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🌾 CeresScan AI
      </div>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/scanner"
          className={({ isActive }) =>
            isActive
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          Scanner
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          History
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "nav-link active-link"
              : "nav-link"
          }
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
}