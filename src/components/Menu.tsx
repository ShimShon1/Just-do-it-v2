// File: Menu.jsx

import { useEffect, useState } from "react";
import Slider from "./Slider";
import { useAppContext } from "../AppContext";

type menuProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Menu({ isOpen, setIsOpen }: menuProps) {
  let { hideDone, handleHideDone, handleKeepText, keepText } =
    useAppContext();
  const [isDark, setIsDark] = useState(
    false || JSON.parse(localStorage.getItem("darkMode")!)
  );
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("darkMode")!)) {
      document.body.classList.add("dark");
    }
  }, []);

  //handle function for sliders
  function handleDarkModeChange() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", "" + !isDark);
    setIsDark(!isDark);
  }

  return (
    <div
      className={
        "absolute left-1/2 -translate-x-1/2 transform  rounded-sm border-2 dark:border-slate-800 dark:shadow-slate-900 " +
        (isOpen ? "block" : "hidden")
      }
    >
      <svg
        onClick={() => setIsOpen(!isOpen)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute right-1 top-1 h-5 w-5 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <nav className=" w-full bg-white p-4 pt-10  shadow-md dark:bg-slate-950 md:p-6 md:pt-10  md:text-lg">
        <ul className=" space-y-4">
          <li>
            <Slider
              handleClick={handleHideDone}
              enabled={hideDone}
              text={"Hide Done"}
            />
          </li>
          <li>
            <Slider
              handleClick={handleDarkModeChange}
              text={"Dark Mode"}
              enabled={isDark}
            />
          </li>
          <li>
            <Slider
              enabled={keepText}
              handleClick={handleKeepText}
              text={"Keep Text"}
            />
          </li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
}
