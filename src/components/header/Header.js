import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav-header bg-light">
      <ul className="header nav p-2 fs-4 border-bottom border-5">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "a nav-link active text-secondary fw-bold"
                : "a nav-link text-secondary"
            }
            to="/"
          >
            Restaurants
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "a nav-link active text-secondary fw-bold"
                : "a nav-link text-secondary"
            }
            to="/search"
          >
            Search Restaurant
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "a nav-link active text-secondary fw-bold"
                : "a nav-link text-secondary"
            }
            to="/menus"
          >
            Menus
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "a nav-link active text-secondary fw-bold"
                : "a nav-link text-secondary"
            }
            to="/dishes"
          >
            Dishes
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
