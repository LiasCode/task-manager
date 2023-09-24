"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const path = usePathname();
  return (
    <header className=" w-full h-10 flex flex-row items-center justify-center text-primaryDetail bg-transparent">
      <nav className="w-max-content h-full flex flex-row justify-center items-center">
        <ul className="list-inside list-none">
          <li
            className={`
          hover:text-primaryDetail w-max-content h-max-content mx-2 inline
            ${
              path === "/login" &&
              "border-b-4 border-offset-4 border-primaryDetail"
            }
          `}
          >
            <Link href="/login">Login</Link>
          </li>
          <li
            className={`
          hover:text-primaryDetail w-max-content h-max-content mx-2 inline
            ${
              path === "/notes" &&
              "border-b-4 border-offset-4 border-primaryDetail"
            }
          `}
          >
            <Link href="/notes">Notes</Link>
          </li>
          <li
            className={`
          hover:text-primaryDetail w-max-content h-max-content mx-2 inline
            ${
              path === "/tasks" &&
              "border-b-4 border-offset-4 border-primaryDetail"
            }
          `}
          >
            <Link href="/tasks">Tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
