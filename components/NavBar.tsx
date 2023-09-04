import { JSX } from "react";
import "./NavBar.css";
import Link from "next/link";

export const NavBar = (): JSX.Element => {
  return (
    <header className="principal-nav-bar">
      <nav>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/note">Notes</Link>
          </li>
          <li>
            <Link href="/task">Tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
