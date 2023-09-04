import { JSX } from "react";
import "./NavBar.css";

export const NavBar = (): JSX.Element => {
  return (
    <header className="principal-nav-bar">
      <nav>
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/note">Notes</a>
          </li>
          <li>
            <a href="/task">Tasks</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
