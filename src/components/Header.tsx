// File: Header.jsx

import  { useState } from "react";
import Menu from "./Menu";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative">
      <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />

      <div className="flex items-center justify-center gap-1">
        <h1 className="text-2xl font-bold tracking-wider lg:text-3xl ">
          JUST DO IT
        </h1>
        <svg
          onClick={() => setMenuOpen(!menuOpen)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer lg:text-lg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
          />
        </svg>
      </div>

      <h2 className="text-lg lg:text-xl">Do Stuff</h2>
    </header>
  );
}
